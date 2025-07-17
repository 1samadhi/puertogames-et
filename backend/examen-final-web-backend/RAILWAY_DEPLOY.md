# 🚀 Despliegue Backend en Railway

## 📋 Pasos para Railway

### 1. Acceder a Railway
- Ve a [railway.app](https://railway.app)
- Crea una cuenta gratuita con GitHub

### 2. Crear Nuevo Proyecto
- Haz clic en "New Project"
- Selecciona "Deploy from GitHub repo" 
- O usa "Deploy from local directory"

### 3. Configurar Variables de Entorno
En Railway, ve a Variables y agrega:
```
DATABASE_URL=postgresql://postgres:password@host:port/database
PORT=8080
```

### 4. Configuración Automática
- Railway detectará automáticamente que es Spring Boot
- Usará Maven para compilar
- El puerto se configurará automáticamente

### 5. Obtener URL del Backend
- Railway te dará una URL como: `https://tu-proyecto.up.railway.app`
- Esta URL la necesitas para actualizar el frontend

## ✅ Configuración Actual del Backend

- ✅ Puerto dinámico configurado: `${PORT:8080}`
- ✅ CORS configurado para Netlify: `https://cosmic-nasturtium-416a3c.netlify.app`
- ✅ Base de datos PostgreSQL remota configurada
- ✅ APIs externas integradas (Quotable, wttr.in)

## 🔄 Después del Despliegue

1. Copia la URL de Railway
2. Actualiza `frontend/src/js/config.js`:
   ```javascript
   PRODUCTION_API: 'https://tu-proyecto.up.railway.app/api'
   ```
3. Vuelve a subir el frontend a Netlify

## 📝 Archivos Preparados
- `railway.json` - Configuración de Railway
- `application.properties` - CORS y puerto configurados
- Base de datos remota ya configurada
