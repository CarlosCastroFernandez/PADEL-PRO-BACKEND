# 🏓 PadelPro – Gestión de Clases y Reservas

PadelPro es una aplicación web desarrollada para la **gestión de clases de pádel**, donde **alumnos**, **entrenadores** y **administradores** disponen de diferentes permisos y funcionalidades según su rol.

El sistema permite visualizar clases filtradas por **fecha y hora actual**, gestionar reservas y administrar usuarios de forma segura mediante autenticación con **JWT**.

---

## 📌 Estado del Proyecto

> ⚠️ Proyecto actualmente **sin diseño responsive**.

---

## 🚀 Funcionalidades Principales

### 👤 Usuarios (Alumnos)

- Visualizar sus **clases reservadas**.
- Solo se muestran clases **posteriores a la fecha y hora actual**.
- Consultar información detallada:
  - 🕒 Hora
  - 🧑‍🏫 Entrenador asignado
  - 💰 Precio
- Autenticación segura mediante **JWT**.

---

### 🧑‍🏫 Entrenadores

- Visualizar las **clases que imparten**, organizadas por día y hora.
- Ver los **alumnos inscritos** en cada clase.
- Acceso únicamente a clases futuras.

---

### 🛠️ Administrador

El administrador tiene control total del sistema:

#### 📅 Gestión de clases
- Cancelar clases.
- Añadir alumnos a una clase existente.

#### 👥 Gestión de usuarios
- Crear nuevos alumnos.
- Crear nuevos entrenadores.
- Modificar nombre y apellidos de alumnos.

🔐 Acceso protegido por rol (`admin`).

---

## 🔐 Creación Manual de Administrador

Existe un endpoint para crear un administrador manualmente desde **Postman**.

### 📌 Endpoint

**POST**
http://localhost:3000/admin/createAdmin

### 📌 Body (JSON)


{
  "email": "admin@gmail.com",
  "name": "carlos",
  "lastName": "castro fernandez",
  "password": "123456"
}


### 🌐 Backend
- **Node.js** — Entorno de ejecución para JavaScript en el servidor.
- **Express 5** — Framework para la creación de APIs REST.
- **MongoDB** — Base de datos NoSQL.
- **Mongoose** — Modelado y gestión de datos en MongoDB.

---

## 🔐 Seguridad y Autenticación

- **bcrypt** — Encriptación de contraseñas.
- **jsonwebtoken (JWT)** — Autenticación basada en tokens.
- **crypto** — Funciones criptográficas adicionales.
- **dotenv** — Gestión segura de variables de entorno.
- **cors** — Permite peticiones entre distintos dominios.

---

## 📧 Servicios Integrados

- **nodemailer** — Envío automático de correos electrónicos (confirmaciones y notificaciones).

---

## 📦 Dependencias


{
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cors": "^2.8.6",
    "crypto": "^1.0.1",
    "dotenv": "^17.2.3",
    "express": "^5.2.1",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.1.5",
    "nodemailer": "^7.0.12"
  },
  "devDependencies": {
    "nodemon": "^3.1.11"
  }
}
## Ejecución del proyecto
Se clona este repo y en la ubicación del proyecto en la consola se pone **npm i** para instalar dependias y luego **npm run start** para levantar el servidor backend
