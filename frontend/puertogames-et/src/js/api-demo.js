// api-demo.js - Funcionalidad para la página de demo de APIs externas
// Usar configuración dinámica de API
const API_BASE = window.CONFIG ? window.CONFIG.getApiBase() : 'http://localhost:9999/api';

// Función para mostrar/ocultar spinner
function toggleSpinner(btnId, spinnerId, show) {
    const btnText = document.getElementById(btnId);
    const spinner = document.getElementById(spinnerId);
    
    if (show) {
        btnText.classList.add('hidden');
        spinner.classList.remove('hidden');
    } else {
        btnText.classList.remove('hidden');
        spinner.classList.add('hidden');
    }
}

// Obtener cita inspiracional
document.getElementById('quoteBtn').addEventListener('click', async function() {
    toggleSpinner('quoteBtnText', 'quoteSpinner', true);
    
    try {
        const response = await fetch(`${API_BASE}/external/quote`);
        const data = await response.json();
        
        if (response.ok && data.success) {
            const quote = data.data;
            document.getElementById('quoteText').textContent = `"${quote.content}"`;
            document.getElementById('quoteAuthor').textContent = `— ${quote.author}`;
            document.getElementById('quoteResult').classList.remove('hidden');
        } else {
            alert('Error al obtener la cita: ' + (data.message || 'Error desconocido'));
        }
    } catch (error) {
        alert('Error de conexión: ' + error.message);
    } finally {
        toggleSpinner('quoteBtnText', 'quoteSpinner', false);
    }
});

// Obtener información del clima
document.getElementById('weatherBtn').addEventListener('click', async function() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert('Por favor, ingresa una ciudad');
        return;
    }
    
    toggleSpinner('weatherBtnText', 'weatherSpinner', true);
    
    try {
        const response = await fetch(`${API_BASE}/external/weather/${encodeURIComponent(city)}`);
        const data = await response.json();
        
        if (response.ok && data.success) {
            const weather = data.data;
            let weatherHtml = `<h4 class="font-bold text-lg mb-2">🌍 ${data.city}</h4>`;
            
            if (weather.current_condition && weather.current_condition[0]) {
                const current = weather.current_condition[0];
                weatherHtml += `
                    <p><strong>Temperatura:</strong> ${current.temp_C}°C (${current.temp_F}°F)</p>
                    <p><strong>Condición:</strong> ${current.weatherDesc[0].value}</p>
                    <p><strong>Humedad:</strong> ${current.humidity}%</p>
                    <p><strong>Viento:</strong> ${current.windspeedKmph} km/h</p>
                `;
            } else {
                weatherHtml += '<p>Información del clima no disponible para esta ciudad.</p>';
            }
            
            document.getElementById('weatherInfo').innerHTML = weatherHtml;
            document.getElementById('weatherResult').classList.remove('hidden');
        } else {
            alert('Error al obtener el clima: ' + (data.message || 'Error desconocido'));
        }
    } catch (error) {
        alert('Error de conexión: ' + error.message);
    } finally {
        toggleSpinner('weatherBtnText', 'weatherSpinner', false);
    }
});

// Verificar estado del sistema
document.getElementById('statusBtn').addEventListener('click', async function() {
    try {
        const response = await fetch(`${API_BASE}/external/status`);
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('statusInfo').textContent = JSON.stringify(data, null, 2);
            document.getElementById('statusResult').classList.remove('hidden');
        } else {
            alert('Error al verificar estado: ' + response.status);
        }
    } catch (error) {
        alert('Error de conexión: ' + error.message);
    }
});

// Verificar conexión al cargar la página
window.addEventListener('load', async function() {
    try {
        const response = await fetch(`${API_BASE}/external/status`);
        const statusElement = document.getElementById('connectionStatus');
        
        if (response.ok) {
            statusElement.textContent = 'Backend conectado correctamente';
            statusElement.parentElement.className = 'mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg';
        } else {
            statusElement.textContent = 'Backend no responde correctamente';
            statusElement.parentElement.className = 'mt-4 inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg';
        }
    } catch (error) {
        const statusElement = document.getElementById('connectionStatus');
        statusElement.textContent = 'Error de conexión con el backend';
        statusElement.parentElement.className = 'mt-4 inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-lg';
    }
});

// Permitir Enter en el input de ciudad
document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('weatherBtn').click();
    }
});
