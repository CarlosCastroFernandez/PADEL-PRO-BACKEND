const mongo = require("mongoose");
const Schema = mongo.Schema;

const trainerSchema = new Schema({
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
        unique: [true, "El email ya existe"],
        trim: true

    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatorio"],
        minlength: [6, "Al menos seis caracteres"]

    },
    priceByClass:{
        type:Number,
        min:1
    },
    experienceYears:{
        type:Number,
        min:0

    }
});

const trainerModel = mongo.model("Trainer", trainerSchema, "Trainer")

module.exports=trainerModel;