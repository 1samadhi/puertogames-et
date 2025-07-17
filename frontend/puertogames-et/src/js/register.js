// register.js - Funcionalidad para la página de registro
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
    const btnText = document.getElementById('registerBtnText');
    const spinner = document.getElementById('registerSpinner');
    const btn = document.getElementById('registerBtn');
    
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

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Manejar envío del formulario
document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        username: document.getElementById('username').value.trim(),
        email: document.getElementById('email').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        apellido: document.getElementById('apellido').value.trim(),
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };
    
    // Validaciones básicas
    if (!formData.username || !formData.email || !formData.nombre || 
        !formData.apellido || !formData.password || !formData.confirmPassword) {
        showMessage('Por favor, completa todos los campos.', true);
        return;
    }
    
    if (!isValidEmail(formData.email)) {
        showMessage('Por favor, ingresa un email válido.', true);
        return;
    }
    
    if (formData.password.length < 6) {
        showMessage('La contraseña debe tener al menos 6 caracteres.', true);
        return;
    }
    
    if (formData.password !== formData.confirmPassword) {
        showMessage('Las contraseñas no coinciden.', true);
        return;
    }
    
    // Mostrar spinner
    toggleSpinner(true);
    
    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                nombre: formData.nombre,
                apellido: formData.apellido,
                password: formData.password
            })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showMessage(`¡Cuenta creada exitosamente! Bienvenido, ${formData.nombre}.`, false);
            
            // Limpiar formulario
            document.getElementById('registerForm').reset();
            
            // Redirigir al login después de 3 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
            
        } else {
            showMessage(data.message || 'Error al crear la cuenta. Intenta con otros datos.', true);
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
