# 🚀 Guía de Despliegue - PuertoGames Frontend

## 📋 Pasos para Netlify

### 1. Acceder a Netlify
- Ve a [netlify.com](https://netlify.com)
- Crea una cuenta gratuita o inicia sesión

### 2. Desplegar el Frontend
- Haz clic en "Add new site" → "Deploy manually"
- Arrastra y suelta la carpeta `src` completa
- Netlify automáticamente detectará y desplegará tu sitio

### 3. Configurar el Dominio
- Netlify te dará una URL como: `https://amazing-name-123456.netlify.app`
- Puedes cambiar el nombre en Site settings → Change site name

### 4. Actualizar Backend URL
Una vez desplegado, actualiza el archivo `js/config.js`:
```javascript
PRODUCTION_API: 'https://tu-backend-railway.up.railway.app/api'
```

## 📁 Archivos Incluidos para Netlify
- `_redirects` - Manejo de rutas SPA
- `netlify.toml` - Configuración de build
- Todos los archivos HTML, CSS y JS organizados

## ✅ Checklist Post-Despliegue
- [ ] Frontend desplegado en Netlify
- [ ] Backend desplegado en Railway  
- [ ] URLs actualizadas en config.js
- [ ] CORS configurado en backend
- [ ] Pruebas de login/register funcionando
