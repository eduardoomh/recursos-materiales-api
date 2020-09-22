const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrdenSchema = Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    mantenimiento: {
        type: String,
        require: true,
        trim: true
    },
    servicio: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Tipoorden",
    },
    asignado_a: {
        type: String,
        require: true,
        trim: true
    },
    departamento: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Departamento",
    },
    usuario: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Usuario",
    },
    fecha: {
        type: String,
        require: true,
        trim: true
    },
    hora_salida: {
        type: String,
        require: true,
        trim: true
    },
    hora_llegada: {
        type: String,
        require: true,
        trim: true
    },
    trabajo_realizado: {
        type: String,
        require: true,
        trim: true
    },
    equipo_proteccion: {
        type: String,
        require: true,
        trim: true
    },
    verificado: {
        type: Boolean,
        require: true,
        trim: true,
        default: false
    },
    aprobado: {
        type: Boolean,
        require: true,
        trim: true,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Orden", OrdenSchema);