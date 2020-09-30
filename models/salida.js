const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SalidaSchema = Schema({
    destino: {
        type: String,
        require: true,
        trim: true
    },
    actividades: {
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
    vehiculo: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Vehiculo",
    },
    chofer: {
        type: String,
        require: true,
        trim: true
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

module.exports = mongoose.model("Salida", SalidaSchema);