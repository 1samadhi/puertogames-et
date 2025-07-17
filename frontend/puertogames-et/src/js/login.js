// login.js - Funcionalidad para la página de login
// Usar configuración dinámica de API
const API_BASE = window.CONFIG ? window.CONFIG.getApiBase() : 'http://localhost:9999/api';

// Función para mostrar mensajes
function showMessage(message, isError = false) {
    const messageDiv = document.getElementById('responseMessage');
    messageDiv.className = `mt-4 p-4 rounded-md ${
        isError 
            ? 'bg-red-50 border border-red-200 text-red-700' 
            : 'bg-green-50 border border-green-200 text-green-700'
    }`;
    messageDiv.textContent = message;
    messageDiv.classList.remove('hidden');
}

// Función para mostrar/ocultar spinner
function toggleSpinner(show) {
    const btnText = document.getElementById('loginBtnText');
    const spinner = document.getElementById('loginSpinner');
    const btn = document.getElementById('loginBtn');
    
    if (show) {
        btnText.classList.add('hidden');
        spinner.classList.remove('hidden');
        btn.disabled = true;
        btn.classList.add('opacity-70', 'cursor-not-allowed');
    } else {
        btnText.classList.remove('hidden');
        spinner.classList.add('hidden');
        btn.disabled = false;
        btn.classList.remove('opacity-70', 'cursor-not-allowed');
    }
}

// Manejar envío del formulario
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value;
    
    // Validaciones básicas
    if (!username || !password) {
        showMessage('Por favor, completa todos los campos.', true);
        return;
    }
    
    // Mostrar spinner
    toggleSpinner(true);
    
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showMessage(`¡Bienvenido, ${data.usuario.nombre}! Inicio de sesión exitoso.`, false);
            
            // Guardar información del usuario en localStorage
            localStorage.setItem('userToken', data.token || 'logged_in');
            localStorage.setItem('userId', data.usuario.id);
            localStorage.setItem('userName', data.usuario.nombre);
            
            // Redirigir después de 2 segundos
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
            
        } else {
            showMessage(data.message || 'Error al iniciar sesión. Verifica tus credenciales.', true);
        }
        
    } catch (error) {
        console.error('Error:', error);
        showMessage('Error de conexión. Verifica que el servidor esté funcionando.', true);
    } finally {
        toggleSpinner(false);
    }
});

// Verificar estado del backend al cargar la página
window.addEventListener('load', async function() {
    try {
        const response = await fetch(`${API_BASE}/external/status`);
        if (response.ok) {
            console.log('✅ Backend conectado correctamente');
        } else {
            console.warn('⚠️ Backend no responde correctamente');
        }
    } catch (error) {
        console.error('❌ Error conectando con backend:', error.message);
        showMessage('Advertencia: No se puede conectar con el servidor. Verifica que esté funcionando.', true);
    }
});
