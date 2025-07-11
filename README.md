# 🛒 Autoservice Project

## 📋 Descripción

Aplicación web de autoservicio desarrollada como proyecto universitario. El sistema permite a los usuarios navegar por productos organizados en categorías, gestionar un carrito de compras y realizar compras. Incluye un panel administrativo para la gestión completa de productos.

## ✨ Características Principales

### 👥 Funcionalidades del Cliente
- **Pantalla de Bienvenida**: Registro del nombre del usuario antes de acceder a la tienda
- **Catálogo de Productos**: Visualización de productos organizados en dos categorías con imágenes y datos completos
- **Carrito de Compras**: Gestión de productos seleccionados con persistencia en localStorage
- **Sistema de Tickets**: Generación de comprobantes de compra con almacenamiento en base de datos

### 🔐 Panel Administrativo
- **Autenticación**: Sistema de login con email y contraseña
- **Dashboard**: Listado paginado de productos con operaciones CRUD
- **Gestión de Productos**: Alta, modificación y baja de productos con carga de imágenes

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**
- **CSS3**
- **JavaScript**
- **Bootstrap** - Framework CSS para diseño responsivo
- **EJS** - Motor de plantillas

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **Sequelize** - ORM para base de datos
- **Multer** - Middleware para carga de archivos

## 📁 Estructura del Proyecto

```
proyecto/
├── Back/
│   ├── config/
│   │   ├── db-sequelize.js
│   │   └── envs.js
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   ├── products.controller.js
│   │   └── views.controller.js
│   ├── middlewares/
│   │   ├── authAdmin.js
│   │   ├── config-middle.js
│   │   ├── cors.middleware.js
│   │   ├── index.js
│   │   └── upload.middle.js
│   ├── models/
│   │   ├── admin-model.js
│   │   ├── compras-log-model.js
│   │   └── product-model.js
│   ├── routes/
│   │   ├── admin.routes.js
│   │   ├── products.routes.js
│   │   └── views.routes.js
│   ├── services/
│   │   ├── product.service.js
│   │   └── server.js
│   └── index.js
└── Front/
    └── public/
        ├── css/
        │   └── [archivos de estilos]
        ├── Imagenes/
        │   └── [recursos gráficos]
        ├── js/
        │   ├── carrito.js
        │   ├── crearProducto.js
        │   ├── dashboard.js
        │   ├── editarProducto.js
        │   ├── logAdmin.js
        │   ├── main.js
        │   └── productos.js
        └── views/
            ├── partials/
            │   ├── bienvenida.ejs
            │   ├── carrito.ejs
            │   ├── dashboard.ejs
            │   ├── edit-product.ejs
            │   ├── footer.ejs
            │   ├── loginAdmin.ejs
            │   ├── navbar.ejs
            │   ├── productos.ejs
            │   └── ticket.ejs
            └── index.ejs
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v14 o superior)
- npm 
- Base de datos compatible con Sequelize

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd proyecto-ecommerce
   ```

2. **Instalar dependencias del backend**
   ```bash
   cd Back
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   # Crear archivo .env en la carpeta Back
   cp .env.example .env
   # Editar .env con las configuraciones de tu base de datos
   ```

4. **Iniciar el servidor**
   ```bash
   npm run dev
   ```

5. **Acceder a la aplicación**
   - Cliente: `http://localhost:3000`
   - Panel Admin: `http://localhost:3000/admin`

## 📊 Modelos de Base de Datos

### Productos
- ID, nombre, categoría, plataforma, precio, imagen

### Administradores
- ID, email, contraseña (hasheada)

### Log de Compras
- ID, nombre_cliente, productos, total, fecha_compra

## 🔧 API Endpoints

### Productos
- `GET /api/` - Obtener todos los productos
- `POST /api/add-product` - Crear nuevo producto
- `PUT /api/edit-product/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Administración
- `POST /api/admins/login` - Autenticación de administrador
- `GET /api/admin/dashboard-products` - Panel de control

## 🎯 Funcionalidades Implementadas

- ✅ Sistema de autenticación para administradores
- ✅ CRUD completo de productos
- ✅ Carrito de compras con persistencia local
- ✅ Gestión de imágenes con Multer
- ✅ Paginación en el dashboard administrativo
- ✅ Validaciones de formularios
- ✅ Diseño responsivo con Bootstrap
- ✅ Registro de ventas en base de datos

## 👥 Equipo de Desarrollo

- **Desarrolladores**: [Noelia Storgato & Alan Rojas]
- **Institución**: [UTN (Universidad Tecnologica Nacional)]
- **Materia**: [Programación 3]

## 📝 Notas Adicionales

Este proyecto fue desarrollado como parte de un trabajo universitario, implementando conceptos de desarrollo web full-stack, arquitectura MVC, y gestión de bases de datos relacionales.

---

*Desarrollado con ❤️ para [UTN]*
