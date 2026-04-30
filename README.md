# Sistema de Gestion de Creditos

Aplicacion web para la gestion de solicitudes de credito con observaciones/bitacora por areas.

## Stack Tecnologico

- **Backend:** PHP 8.2+ / Laravel 10+
- **Frontend:** Vue 3 + Pinia + Vue Router 4
- **Base de Datos:** PostgreSQL
- **Build Tool:** Vite

## Requisitos Previos

- PHP >= 8.2
- Composer
- Node.js >= 18
- PostgreSQL
- npm o pnpm

## Instalacion

### 1. Clonar el repositorio

```bash
mkdir credit-app
cd credit-app
git clone https://github.com/JhoanTovar/credit_app.git
```

### 2. Instalar dependencias de PHP

```bash
composer install
```

### 3. Instalar dependencias de Node.js

```bash
npm install
```

### 4. Configurar el archivo de entorno

```bash
cp .env.example .env
php artisan key:generate
```

### 5. Configurar la base de datos PostgreSQL

Editar el archivo `.env` con los datos de conexion:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=credit_app
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_password
```

### 6. Crear la base de datos

En PostgreSQL:

```sql
CREATE DATABASE credit_app;
```

### 7. Ejecutar las migraciones

```bash
php artisan migrate
```

### 8. Iniciar los servidores de desarrollo

En una terminal, iniciar el servidor de Laravel:

```bash
php artisan serve
```

En otra terminal, iniciar Vite para el frontend:

```bash
npm run dev
```

### 9. Acceder a la aplicacion

Abrir en el navegador: `http://localhost:8000`

## Estructura del Proyecto

```
credit-app/
├── app/
│   ├── Http/Controllers/
│   │   ├── CreditController.php      # Controlador de creditos
│   │   └── ObservationController.php # Controlador de observaciones
│   └── Models/
│       ├── Credit.php                # Modelo de credito
│       └── Observation.php           # Modelo de observacion
├── database/migrations/              # Migraciones de la BD
├── resources/
│   └── js/
│       ├── App.vue                   # Componente raiz
│       ├── app.js                    # Punto de entrada Vue
│       ├── router/
│       │   └── index.js              # Configuracion de rutas
│       ├── stores/
│       │   ├── creditStore.js        # Store de creditos (Pinia)
│       │   └── observationStore.js   # Store de observaciones (Pinia)
│       ├── views/
│       │   ├── CreditList.vue        # Vista de listado
│       │   ├── CreditCreate.vue      # Vista de creacion
│       │   └── CreditDetail.vue      # Vista de detalle
│       ├── components/
│       │   ├── ObservationList.vue   # Lista de observaciones
│       │   └── ObservationForm.vue   # Formulario de observacion
│       └── services/
│           └── api.js                # Servicio de llamadas API
└── routes/
    ├── api.php                       # Rutas API REST
    └── web.php                       # Ruta principal (SPA)
```

## Funcionalidades

### Creditos

1. **Crear credito** - Formulario para registrar nuevos creditos
2. **Listar creditos** - Tabla con todos los creditos registrados
3. **Editar estado** - Cambiar entre: PENDIENTE, EN_REVISION, APROBADO, NEGADO
4. **Ver detalle** - Informacion completa del credito con observaciones

### Observaciones / Bitacora

1. **Agregar observacion** - Formulario para registrar comentarios
2. **Listar observaciones** - Historial en orden cronologico
3. **Filtrar por area** - COMERCIAL, ANALISIS, TESORERIA, CARTERA

## API Endpoints

### Creditos

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/credits` | Listar todos los creditos |
| POST | `/api/credits` | Crear nuevo credito |
| GET | `/api/credits/{id}` | Obtener credito especifico |
| PATCH | `/api/credits/{id}/status` | Actualizar estado del credito |

### Observaciones

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/observations/credit/{id}` | Listar observaciones de un credito |
| GET | `/api/observations/credit/{id}/{area}` | Filtrar observaciones por area |
| POST | `/api/observations` | Crear nueva observacion |

## Campos de los Modelos

### Credito

- `numero_credito` - Identificador unico (autogenerado)
- `nombre_cliente` - Nombre completo del cliente
- `cedula` - Numero de identificacion
- `estado` - PENDIENTE | EN_REVISION | APROBADO | NEGADO
- `valor_credito` - Monto del credito
- `created_at` - Fecha de creacion

### Observacion

- `credit_id` - Credito asociado
- `usuario` - Nombre del usuario que comenta
- `area` - COMERCIAL | ANALISIS | TESORERIA | CARTERA
- `comentario` - Texto del comentario
- `created_at` - Fecha y hora del comentario

## Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar Vite en modo desarrollo
php artisan serve    # Iniciar servidor Laravel

# Produccion
npm run build        # Compilar assets para produccion

# Migraciones
php artisan migrate           # Ejecutar migraciones
php artisan migrate:rollback  # Revertir ultima migracion
php artisan migrate:fresh     # Recrear todas las tablas
```

## Autor
Jhoan Tovar - Desarrollado como prueba tecnica - Sistema de Gestion de Creditos con Vue 3 + Laravel + PostgreSQL.
