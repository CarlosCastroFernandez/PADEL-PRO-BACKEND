const mongo = require("mongoose");
const Schema = mongo.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minlength: [3, "Al menos tres caracteres"],
        maxlength: 30
    },
    lastName: {
        type: String,
        required: [true, "El apellido es obligatorio"],
        minlength: [3, "Al menos tres caracteres"],
        maxlength: 30

    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique:true,
        trim: true

    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatorio"],
        minlength: [6, "Al menos seis caracteres"]

    }
});

const adminModel = mongo.model("Admin", userSchema, "Admin")

module.exports=adminModel;