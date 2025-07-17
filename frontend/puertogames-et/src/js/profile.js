// Configuración
const API_URL = window.location.hostname.includes('netlify.app') 
    ? CONFIG.PRODUCTION_API 
    : CONFIG.DEVELOPMENT_API;

// Elementos del DOM
const profileForm = document.getElementById('profileForm');
const deleteAccountBtn = document.getElementById('deleteAccountBtn');
const logoutBtn = document.getElementById('logoutBtn');
const deleteModal = document.getElementById('deleteModal');
const cancelDeleteBtn = document.getElementById('cancelDelete');
const confirmDeleteBtn = document.getElementById('confirmDelete');

// Obtener el ID del usuario del localStorage
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('userToken');  // Cambiado de 'token' a 'userToken'

// Verificar si el usuario está autenticado
if (!token || !userId || token === 'null' || token === 'undefined') {
    window.location.href = 'login.html';
}

// Cargar datos del perfil
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadUserProfile();
        setupEventListeners();
    } catch (error) {
        console.error('Error al cargar el perfil:', error);
        showNotification('Error al cargar el perfil', 'error');
    }
});

// Cargar datos del usuario
async function loadUserProfile() {
    try {
        const response = await fetch(`${API_URL}/users/profile/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error al cargar el perfil');
        }

        const userData = await response.json();
        displayUserData(userData);
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al cargar los datos del perfil', 'error');
    }
}

// Mostrar datos del usuario en el formulario
function displayUserData(user) {
    document.getElementById('nombre').value = user.nombre || '';
    document.getElementById('apellido').value = user.apellido || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('username').value = user.username || '';
    
    // Mostrar inicial del nombre de usuario
    const userInitial = document.getElementById('userInitial');
    if (user.username && user.username.length > 0) {
        userInitial.textContent = user.username.charAt(0).toUpperCase();
    }
    
    // Mostrar nombre de usuario y correo
    document.getElementById('usernameDisplay').textContent = user.username || 'Usuario';
    document.getElementById('userEmail').textContent = user.email || '';
    
    // Mostrar fecha de registro
    if (user.fechaRegistro) {
        const date = new Date(user.fechaRegistro);
        const options = { year: 'numeric', month: 'long' };
        document.getElementById('memberSince').textContent = date.toLocaleDateString('es-ES', options);
    }
}

// Configurar event listeners
function setupEventListeners() {
    // Enviar formulario de actualización
    profileForm.addEventListener('submit', handleProfileUpdate);
    
    // Mostrar modal de confirmación para eliminar cuenta
    deleteAccountBtn.addEventListener('click', () => {
        deleteModal.classList.remove('hidden');
    });
    
    // Cerrar modal
    cancelDeleteBtn.addEventListener('click', () => {
        deleteModal.classList.add('hidden');
    });
    
    // Confirmar eliminación
    confirmDeleteBtn.addEventListener('click', handleDeleteAccount);
    
    // Cerrar sesión
    logoutBtn.addEventListener('click', handleLogout);
}

// Manejar actualización del perfil
async function handleProfileUpdate(e) {
    e.preventDefault();
    
    const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        username: document.getElementById('username').value,
        currentPassword: document.getElementById('currentPassword').value,
        newPassword: document.getElementById('newPassword').value
    };
    
    try {
        const response = await fetch(`${API_URL}/users/profile/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Error al actualizar el perfil');
        }
        
        showNotification('Perfil actualizado correctamente', 'success');
        
        // Actualizar datos mostrados
        if (data.username) {
            document.getElementById('usernameDisplay').textContent = data.username;
            const userInitial = document.getElementById('userInitial');
            userInitial.textContent = data.username.charAt(0).toUpperCase();
        }
        
        // Limpiar campos de contraseña
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        
    } catch (error) {
        console.error('Error:', error);
        showNotification(error.message || 'Error al actualizar el perfil', 'error');
    }
}

// Manejar eliminación de cuenta
async function handleDeleteAccount() {
    try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Error al eliminar la cuenta');
        }
        
        // Cerrar sesión y redirigir
        handleLogout();
        showNotification('Cuenta eliminada correctamente', 'success');
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('Error al eliminar la cuenta', 'error');
    } finally {
        deleteModal.classList.add('hidden');
    }
}

// Manejar cierre de sesión
function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = 'login.html';
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear notificación si no existe
    let notification = document.querySelector('.notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
        document.body.appendChild(notification);
    }
    
    // Configurar estilos según el tipo
    const typeStyles = {
        success: 'bg-green-600',
        error: 'bg-red-600',
        info: 'bg-blue-600'
    };
    
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transition-all duration-300 transform ${typeStyles[type] || 'bg-gray-800'} text-white`;
    notification.textContent = message;
    
    // Mostrar notificación
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('translate-x-0');
    }, 100);
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        notification.classList.remove('translate-x-0');
        notification.classList.add('translate-x-full');
    }, 5000);
}

// Alternar visibilidad de contraseña
function togglePasswordVisibility(fieldId) {
    const field = document.getElementById(fieldId);
    const icon = field.nextElementSibling.querySelector('i');
    
    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Agregar botón de perfil a la barra de navegación en otras páginas
function addProfileLinkToNav() {
    const navs = document.querySelectorAll('nav .container');
    if (navs.length > 0) {
        navs.forEach(nav => {
            // Verificar si ya existe el enlace de perfil
            if (!nav.querySelector('a[href="profile.html"]')) {
                const profileLink = document.createElement('a');
                profileLink.href = 'profile.html';
                profileLink.className = 'hover:text-blue-400 transition';
                profileLink.innerHTML = '<i class="fas fa-user-circle mr-1"></i> Mi Perfil';
                
                // Insertar antes del botón de cerrar sesión
                const logoutBtn = nav.querySelector('button');
                if (logoutBtn) {
                    nav.insertBefore(profileLink, logoutBtn);
                    nav.insertBefore(document.createTextNode(' '), logoutBtn);
                }
            }
        });
    }
}

// Agregar enlace de perfil a la navegación cuando se cargue la página
document.addEventListener('DOMContentLoaded', addProfileLinkToNav);
