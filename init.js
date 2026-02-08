require("dotenv").config();
const mongoose = require("mongoose");
const adminModel = require("./src/model/AdminModel"); // tu modelo
async function initDB() {
  try {
    await mongoose.connect(process.env.URL_MONGO); // opciones antiguas eliminadas
    console.log("Conectado a Mongo");

    // Borrar todos los admins
    await adminModel.deleteMany({});
    console.log("Admins eliminados");

    // Borrar todos los índices excepto _id_
    await adminModel.collection.dropIndexes();
    console.log("Índices borrados");

    // Crear índice único en email
    await adminModel.collection.createIndex({ email: 1 }, { unique: true });
    console.log("Índice único de email creado");

    mongoose.disconnect();
    console.log("Inicialización completa");
  } catch (e) {
    console.error("Error inicializando DB:", e);
  }
}

initDB();