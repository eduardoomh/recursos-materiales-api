const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    apellidos: {
        type: String,
        require: true,
        trim: true
    },
    correo: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    avatar: {
        type: String,
        trim: true,
    },
    telefono: {
        type: String,
        trim: true
    },
    descripcion: {
        type: String,
        trim: true
    },
    contrasena: {
        type: String,
        require: true,
        trim: true
    },
    numero_control: {
        type: String,
        require: true,
        trim: true
    },
    estatus: {
        type: String,
        trim: true,
        require: true,
        default: "pendiente"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Usuario", UserSchema);