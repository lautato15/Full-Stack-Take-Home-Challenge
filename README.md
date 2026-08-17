# 🔔 Notifications App

Aplicación Full Stack para la gestión de notificaciones.

Permite a los usuarios registrarse, iniciar sesión y administrar sus propias notificaciones a través de diferentes canales: **Email, SMS y Push**.

## 🚀 Demo

🌐 **Aplicación en vivo:** [Ver Notifications App](https://notifications-appfrontend.vercel.app/)

📚 **Documentación de la API:** [Ver Swagger](TU_URL_BACKEND/api)

### 🧪 Credenciales de prueba

Para probar rápidamente la aplicación, puedes utilizar una cuenta con notificaciones precargadas:

```text
Email: admin@mail.com
Password: 1234
```

También puedes crear una nueva cuenta y gestionar tus propias notificaciones.

---

## ✨ Funcionalidades

### 🔐 Autenticación

- Registro de usuarios.
- Inicio de sesión.
- Autenticación mediante JWT.
- Persistencia de sesión utilizando `localStorage`.
- Protección de rutas privadas.
- Cierre de sesión.
- Redirección al login cuando el token no es válido.

### 🔔 Gestión de notificaciones

Los usuarios pueden:

- Consultar sus notificaciones.
- Crear nuevas notificaciones.
- Editar notificaciones existentes.
- Eliminar notificaciones.
- Reintentar el envío de una notificación.
- Gestionar diferentes canales de notificación:
  - 📧 Email
  - 📱 SMS
  - 🔔 Push

Cada usuario únicamente puede acceder y administrar sus propias notificaciones.

---

## 🛠️ Tecnologías utilizadas

### Frontend

- React
- TypeScript
- Vite
- React Router DOM
- React Toastify
- Tailwind CSS

### Backend

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT
- Passport
- Class Validator
- Swagger

### Deployment e infraestructura

- Vercel
- Neon PostgreSQL

---

## 🗄️ Base de datos

La aplicación utiliza **PostgreSQL** como base de datos y **Prisma** como ORM.

Los principales modelos son:

- `Users`
- `Notifications`
- `Email`
- `Sms`
- `Push`

Cada notificación pertenece a un usuario y puede estar asociada a uno de los diferentes canales disponibles.

---

## 🔑 Variables de entorno

### Frontend

Crear un archivo `.env` dentro de `frontend`:

```env
VITE_API_URL=http://localhost:3000
```

### Backend

Crear un archivo `.env` dentro de `backend` y configurar las variables necesarias:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your_secret"
```

---

## 🎯 Objetivo del proyecto

Este proyecto fue desarrollado para poner en práctica y consolidar conocimientos relacionados con:

- Desarrollo de APIs REST.
- Arquitectura modular con NestJS.
- Autenticación y autorización mediante JWT.
- Protección de rutas en frontend y backend.
- Comunicación entre aplicaciones frontend y backend.
- Operaciones CRUD.
- Manejo de diferentes canales de notificación.
- Modelado de bases de datos relacionales.
- Uso de Prisma como ORM.
- PostgreSQL.
- Manejo de variables de entorno.
- Configuración de CORS.
- Deployment de aplicaciones Full Stack.
- Integración de una base de datos en la nube.

---

## 👨‍💻 Autor

**Lautaro López**

Full Stack Developer

Tecnologías principales:

- React
- TypeScript
- Node.js
- NestJS
- PostgreSQL

---

⭐ Si quieres probar la aplicación, puedes utilizar la **demo en vivo** o explorar la **documentación de la API con Swagger**.
