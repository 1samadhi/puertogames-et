// Función para actualizar la barra de navegación según el estado de autenticación
function updateNavbar() {
    const token = localStorage.getItem('userToken');  // Cambiado de 'token' a 'userToken'
    const username = localStorage.getItem('userName');  // Cambiado de 'username' a 'userName'
    
    // Obtener los contenedores de botones de autenticación
    const rightNav = document.querySelector('.right-nav');
    const mobileAuthButtons = document.getElementById('mobile-auth-buttons');
    
    if (!rightNav) return;
    
    // Limpiar contenedores
    rightNav.innerHTML = '';
    if (mobileAuthButtons) mobileAuthButtons.innerHTML = '';
    
    if (token && token !== 'null' && token !== 'undefined') {  // Verificación más estricta
        // Usuario autenticado - Versión escritorio
        const desktopAuth = document.createElement('div');
        desktopAuth.className = 'flex items-center space-x-4';
        
        // Botón de perfil
        const profileBtn = document.createElement('a');
        profileBtn.href = 'profile.html';
        profileBtn.className = 'flex items-center text-white hover:text-blue-400 transition';
        profileBtn.innerHTML = `
            <i class="fas fa-user-circle text-xl mr-1"></i>
            <span>${username || 'Mi Perfil'}</span>
        `;
        
        // Botón de cerrar sesión
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition flex items-center';
        logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt mr-2"></i> Cerrar Sesión';
        logoutBtn.addEventListener('click', handleLogout);
        
        // Agregar elementos al contenedor de escritorio
        desktopAuth.appendChild(profileBtn);
        desktopAuth.appendChild(logoutBtn);
        rightNav.appendChild(desktopAuth);
        
        // Versión móvil
        if (mobileAuthButtons) {
            const mobileAuth = document.createElement('div');
            mobileAuth.className = 'space-y-2';
            
            const mobileProfileBtn = document.createElement('a');
            mobileProfileBtn.href = 'profile.html';
            mobileProfileBtn.className = 'block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700';
            mobileProfileBtn.innerHTML = '<i class="fas fa-user-circle mr-2"></i> Mi Perfil';
            
            const mobileLogoutBtn = document.createElement('button');
            mobileLogoutBtn.className = 'w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 text-red-400';
            mobileLogoutBtn.innerHTML = '<i class="fas fa-sign-out-alt mr-2"></i> Cerrar Sesión';
            mobileLogoutBtn.addEventListener('click', handleLogout);
            
            mobileAuth.appendChild(mobileProfileBtn);
            mobileAuth.appendChild(mobileLogoutBtn);
            mobileAuthButtons.appendChild(mobileAuth);
        }
    } else {
        // Usuario no autenticado - Versión escritorio
        const desktopAuth = document.createElement('div');
        desktopAuth.className = 'flex items-center space-x-4';
        
        // Botón de inicio de sesión
        const loginBtn = document.createElement('a');
        loginBtn.href = 'login.html';
        loginBtn.className = 'text-white hover:text-blue-400 transition';
        loginBtn.textContent = 'Iniciar Sesión';
        
        // Botón de registro
        const registerBtn = document.createElement('a');
        registerBtn.href = 'register.html';
        registerBtn.className = 'bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition';
        registerBtn.textContent = 'Registrarse';
        
        desktopAuth.appendChild(loginBtn);
        desktopAuth.appendChild(registerBtn);
        rightNav.appendChild(desktopAuth);
        
        // Versión móvil
        if (mobileAuthButtons) {
            const mobileAuth = document.createElement('div');
            mobileAuth.className = 'space-y-2';
            
            const mobileLoginBtn = document.createElement('a');
            mobileLoginBtn.href = 'login.html';
            mobileLoginBtn.className = 'block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700';
            mobileLoginBtn.textContent = 'Iniciar Sesión';
            
            const mobileRegisterBtn = document.createElement('a');
            mobileRegisterBtn.href = 'register.html';
            mobileRegisterBtn.className = 'block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700';
            mobileRegisterBtn.textContent = 'Registrarse';
            
            mobileAuth.appendChild(mobileLoginBtn);
            mobileAuth.appendChild(mobileRegisterBtn);
            mobileAuthButtons.appendChild(mobileAuth);
        }
    }

    // Si no hay nombre de usuario pero hay token, intentar obtener el perfil
    if (token && !username) {
        fetchUserProfile();
    }
}

// Función para manejar el cierre de sesión
function handleLogout() {
    // Eliminar todos los datos de autenticación
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userData');
    
    // Redirigir a la página de inicio
    window.location.href = 'index.html';
}

// Función para obtener el perfil del usuario y guardar el nombre de usuario
async function fetchUserProfile() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) return;
    
    try {
        const API_URL = window.location.hostname.includes('netlify.app') 
            ? CONFIG.PRODUCTION_API 
            : CONFIG.DEVELOPMENT_API;
            
        const response = await fetch(`${API_URL}/users/profile/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            const userData = await response.json();
            if (userData.username) {
                localStorage.setItem('username', userData.username);
                // Actualizar la barra de navegación con el nuevo nombre de usuario
                updateNavbar();
            }
        }
    } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
    }
}

// Inicializar la barra de navegación cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
    
    // Actualizar la barra de navegación cuando cambie el estado de autenticación
    window.addEventListener('storage', (event) => {
        if (event.key === 'token' || event.key === 'userId' || event.key === 'username') {
            updateNavbar();
        }
    });
});

// Exportar funciones para uso en otros archivos
window.Navbar = {
    updateNavbar,
    handleLogout
};
