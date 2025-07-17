// config.js - Configuración de URLs del backend
const CONFIG = {
    // URL del backend en producción (Railway) - Se actualizará cuando esté desplegado
    PRODUCTION_API: 'https://tu-backend-railway.up.railway.app/api',
    
    // URL del backend en desarrollo local
    DEVELOPMENT_API: 'http://localhost:9999/api',
    
    // Detectar si estamos en producción o desarrollo
    getApiBase() {
        // Si el frontend está servido desde file:// es desarrollo local
        if (window.location.protocol === 'file:') {
            return this.DEVELOPMENT_API;
        }
        // Si está servido desde https:// es producción
        return this.PRODUCTION_API;
    }
};

// Exportar la configuración
window.CONFIG = CONFIG;
