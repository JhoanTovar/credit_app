# Credit App - Prueba Técnica

## Descripción
Aplicación backend desarrollada en Laravel para la gestión de créditos de libranza.  
Permite crear créditos, consultar información, actualizar estados y gestionar observaciones asociadas a cada crédito.

---

## Tecnologías utilizadas

- Laravel 12
- PHP 8.2+
- PostgreSQL
- Eloquent ORM
- API REST

---

## Instalación del proyecto

### 1. Clonar repositorio
git clone <URL_DEL_REPO>
cd credit-app

### 2. Instalar dependencias
composer install

### 3. Configurar entorno
cp .env.example .env
php artisan key:generate

### 4. Configurar base de datos (PostgreSQL)

Editar el archivo .env:

DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=credit_app
DB_USERNAME=postgres
DB_PASSWORD=****

### 5. Ejecutar migraciones
php artisan migrate

### 6. Levantar servidor
php artisan serve