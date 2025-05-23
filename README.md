# PuntoVenta

Este es un proyecto fullstack que incluye un backend 
en **Symfony** y un frontend en **React**. 
La finalidad es ofrecer un sistema de punto de venta express.

---

## Estructura del proyecto

El repositorio contiene dos carpetas principales:

- `backpunto/` → Contiene el proyecto Symfony (API REST)
- `frontpunto/` → Contiene el proyecto React (frontend)

---

## Requisitos

- PHP >= 8.1
- Composer
- Symfony CLI (opcional, recomendado)
- Node.js >= 18
- Yarn o NPM
- MySQL o PostgreSQL (según tu configuración en `.env`)

---

## Pasos para correr el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/danielnava901/puntoventa.git
cd puntoventa
```

---

### 2. Levantar el backend (Symfony)

```bash
cd backpunto

# Instalar dependencias PHP
composer install

# Copiar archivo de entorno
cp .env .env.local

# Configurar la conexión a la base de datos en .env.local

# Crear base de datos y correr migraciones
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate

# Crea llaves para usar jwt
php bin/console lexik:jwt:generate-keypair
# Despues de esto configurar su archvio .en
#JWT_SECRET_KEY=%kernel.project_dir%/config/jwt/private.pem
#JWT_PUBLIC_KEY=%kernel.project_dir%/config/jwt/public.pem
#JWT_PASSPHRASE=__secretpassphrase__


# Levantar servidor de desarrollo
symfony server:start
# o alternativamente
php -S localhost:8000 -t public
```

---

### 3. Levantar el frontend (React) modo dev

```bash
cd ../frontpunto

# Instalar dependencias JavaScript
npm install
# o
yarn install

# Levantar el servidor de desarrollo
npm run dev
# o
yarn dev
```



---

## Sitio Web

Por defecto, la interfáz gráfica está disponible en:
```
http://localhost:5173/
```

---

## 🛠 Funcionalidades

- Registro/Login (sólo con Email) automático con JWT (Symfony backend)
- Creación de órdenes de compra
- Agregado de productos a una orden
- Cierre de órdenes
- Visualización de órdenes por usuario
- Reporte de ventas (Productos vendidos por rango de fechas)

---

## Autor

Daniel Nava  
danielnava@hotmail.com \
[https://github.com/danielnava901](https://github.com/danielnava901)