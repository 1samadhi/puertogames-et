# 🚀 PuertoGames - Plataforma de Gestión de Juegos

## 🌐 En Vivo
🔗 **Link del proyecto:** [https://beamish-pixie-eefb71.netlify.app/](https://beamish-pixie-eefb71.netlify.app/)

## 👥 Integrantes del Equipo
1. [Ismael Oyarzún] 
2. [Angel Bustamante] 
3. [Matias Loyola] 
4. [Miguel Muñoz] 

## 📖 Descripción del Proyecto
PuertoGames es una plataforma web moderna para la gestión y visualización de videojuegos, desarrollada como parte del examen final de la asignatura de Desarrollo Java para Web. La aplicación permite a los usuarios registrarse, iniciar sesión, gestionar su perfil y acceder a contenido dinámico a través de APIs externas.

### ✨ Características Principales
- **Autenticación de Usuarios**: Registro e inicio de sesión seguro
- **Perfil de Usuario**: Gestión de información personal
- **APIs Externas**: Integración con servicios de clima y citas inspiracionales
- **Diseño Responsive**: Adaptable a diferentes dispositivos
- **Interfaz Moderna**: Desarrollada con Tailwind CSS

### 🛠️ Tecnologías Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript, Tailwind CSS
- **Backend**: Java Spring Boot 3.5.3
- **Base de Datos**: PostgreSQL (alojada en Railway)
- **Despliegue**: 
  - Frontend: Netlify
  - Backend: Railway
- **APIs Externas**: Quotable.io, wttr.in

## 🚀 Cómo Usar

### Configuración del Entorno Local

1. **Backend (Spring Boot)**
   - Asegúrate de tener Java 17+ y Maven instalados
   - Configura las variables de entorno en `application.properties`
   - Ejecuta: `mvn spring-boot:run`
   - El servidor estará disponible en `http://localhost:8080`

2. **Frontend**
   - Abre el archivo `index.html` en tu navegador
   - O usa un servidor local como Live Server de VSCode

### Uso Básico
1. **Registro**: Crea una cuenta nueva
2. **Inicio de Sesión**: Accede con tus credenciales
3. **Perfil**: Actualiza tu información personal
4. **Explorar**: Navega por las diferentes secciones de la aplicación



## 📋 Información del Proyecto

**Asignatura:** Desarrollo Java para Web  
**Tipo:** Examen Final Transversal  
**Duración:** 3 horas  
**Fecha:** 17 de Julio, 2025  

---

## 🎯 Requisitos Cumplidos

### ✅ Backend Funcional (Spring Boot)
- **Framework:** Spring Boot 3.5.3
- **Base de Datos:** PostgreSQL (Railway - Remota)
- **Puerto:** 8080
- **Arquitectura:** MVC con capas: Model, Repository, Service, Controller

### ✅ Endpoints REST (4+ requeridos)
1. `POST /api/auth/register` - Registro de usuario
2. `POST /api/auth/login` - Login de usuario  
3. `GET /api/users/profile/{id}` - Obtener perfil de usuario
4. `PUT /api/users/profile/{id}` - Actualizar perfil de usuario
5. `DELETE /api/users/{id}` - Eliminar cuenta (soft delete)
6. `GET /api/external/quote` - **API Externa:** Cita inspiracional
7. `GET /api/external/weather/{city}` - **API Externa:** Información del clima
8. `GET /api/external/status` - Estado de API externa

### ✅ Base de Datos Remota
- **Proveedor:** Railway (PostgreSQL)
- **Host:** yamanote.proxy.rlwy.net:52693
- **Base de Datos:** railway
- **Conexión:** Verificada y funcionando

### ✅ Integración con API Externa
- **API 1:** Quotable.io (Citas inspiracionales)
- **API 2:** wttr.in (Información del clima)
- **Implementación:** RestTemplate con manejo de errores

### ✅ Frontend Consumiendo Backend
- **Tecnología:** HTML5, CSS3 (Tailwind), JavaScript (Vanilla)
- **Estructura Organizada:**
  ```
  src/
  ├── css/              # Hojas de estilo
  │   ├── input.css     # CSS base de Tailwind
  │   ├── output.css    # CSS compilado de Tailwind
  │   └── styles.css    # Estilos personalizados
  ├── js/               # Scripts JavaScript
  │   ├── login.js      # Lógica de login
  │   ├── register.js   # Lógica de registro
  │   └── api-demo.js   # Demo de APIs externas
  ├── pages/            # Páginas HTML específicas
  ├── assets/           # Recursos (imágenes, fuentes)
  ├── index.html        # Página principal
  ├── login.html        # Página de login
  ├── register.html     # Página de registro
  └── api-demo.html     # Demo de APIs externas
  ```
- **Funcionalidades:** 
  - Registro e inicio de sesión de usuarios
  - Consumo de APIs externas con UX mejorada
  - Interfaz responsive y moderna
  - JavaScript modular y organizado
- **Consumo JSON:** Fetch API para todos los endpoints

---

## 🏗️ Arquitectura del Proyecto

```
backend/examen-final-web-backend/
├── src/main/java/com/example/examen_final_web_backend/
│   ├── model/
│   │   └── Usuario.java                 # Entidad JPA
│   ├── repository/
│   │   └── UsuarioRepository.java       # Repositorio JPA
│   ├── service/
│   │   └── UsuarioService.java          # Lógica de negocio
│   ├── controller/
│   │   ├── AuthController.java          # Autenticación
│   │   ├── UsuarioController.java       # CRUD usuarios
│   │   └── ApiExternaController.java    # APIs externas
│   ├── config/
│   │   └── RestTemplateConfig.java      # Configuración HTTP
│   └── ExamenFinalWebBackendApplication.java
├── src/main/resources/
│   └── application.properties           # Configuración BD
└── pom.xml                             # Dependencias Maven

frontend/
└── index.html                          # Frontend completo
```

---

## 🚀 Instrucciones de Ejecución

### Backend
1. **Clonar/Descargar el proyecto**
2. **Ejecutar backend:**
   ```bash
   cd backend/examen-final-web-backend
   ./mvnw spring-boot:run
   ```
3. **Verificar:** Backend funcionando en `http://localhost:8080`

### Frontend
1. **Abrir frontend:**
   - Abrir `frontend/index.html` en cualquier navegador
   - O usar Live Server en VS Code

### Base de Datos
- **Configuración automática:** Railway PostgreSQL
- **Tablas:** Se crean automáticamente con Hibernate DDL
- **Datos:** Persistentes en la nube

---

## 🧪 Pruebas y Validación

### Endpoints de Usuario
```bash
# Registro
POST http://localhost:8080/api/auth/register
Content-Type: application/json
{
  "username": "testuser",
  "email": "test@email.com", 
  "password": "123456",
  "nombre": "Test",
  "apellido": "User"
}

# Login
POST http://localhost:8080/api/auth/login
Content-Type: application/json
{
  "username": "testuser",
  "password": "123456"
}
```

### Endpoints de API Externa
```bash
# Cita inspiracional
GET http://localhost:8080/api/external/quote

# Clima
GET http://localhost:8080/api/external/weather/Santiago

# Estado
GET http://localhost:8080/api/external/status
```

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Java 17**
- **Spring Boot 3.5.3**
- **Spring Data JPA**
- **PostgreSQL Driver**
- **Lombok**
- **Maven**

### Frontend  
- **HTML5**
- **CSS3** (Grid, Flexbox, Animations)
- **JavaScript ES6+** (Fetch API, Async/Await)

### Base de Datos
- **PostgreSQL 15** (Railway Cloud)

### APIs Externas
- **Quotable.io** - Citas inspiracionales
- **wttr.in** - Información meteorológica

---

## 📊 Funcionalidades Implementadas

### Sistema de Usuarios
- ✅ Registro con validación de unicidad
- ✅ Login con verificación de credenciales  
- ✅ Gestión de perfiles (CRUD completo)
- ✅ Soft delete para eliminación segura
- ✅ Timestamps automáticos

### Integración Externa
- ✅ Consumo de 2 APIs públicas diferentes
- ✅ Manejo de errores y timeouts
- ✅ Respuestas estructuradas en JSON
- ✅ Documentación de endpoints

### Frontend Interactivo
- ✅ Interfaz moderna y responsive
- ✅ Formularios funcionales
- ✅ Consumo de todos los endpoints
- ✅ Visualización de respuestas JSON
- ✅ Indicadores de estado

---

## 🔗 URLs de Acceso

### Desarrollo Local
- **Backend API:** http://localhost:8080
- **Frontend:** file:///[ruta]/frontend/index.html
- **Base de Datos:** Railway PostgreSQL (Remota)

### Endpoints Principales
- **Registro:** http://localhost:8080/api/auth/register
- **Login:** http://localhost:8080/api/auth/login  
- **API Externa:** http://localhost:8080/api/external/quote

---

## 📝 Notas del Desarrollo

### Decisiones Técnicas
1. **PostgreSQL en Railway:** Elegido por facilidad de configuración y requisito de BD remota
2. **H2 como fallback:** Configurado para desarrollo local si hay problemas de conectividad
3. **APIs sin autenticación:** Seleccionadas para evitar complejidad de API keys
4. **Frontend vanilla:** Sin frameworks para simplicidad y rapidez

### Cumplimiento de Rúbrica
- ✅ **Backend funcional:** Spring Boot con 8 endpoints
- ✅ **Base de datos remota:** PostgreSQL en Railway
- ✅ **API externa:** 2 APIs públicas integradas
- ✅ **Frontend JSON:** Consume todos los endpoints
- ✅ **Despliegue:** Preparado para Railway/Netlify

---

## 🏆 Resultado Final

**Estado:** ✅ COMPLETADO  
**Tiempo utilizado:** ~2.5 horas  
**Funcionalidad:** 100% operativa  
**Requisitos cumplidos:** Todos los obligatorios + extras  

### Extras Implementados
- Interfaz de usuario moderna y profesional
- Manejo robusto de errores
- Documentación completa
- Arquitectura escalable
- Múltiples APIs externas
