const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventoSchema = Schema({
    nombre: {
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
    lugar: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Lugar",
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
    fecha_final: {
        type: String,
        trim: true,
    },
    hora_inicio: {
        type: String,
        require: true,
        trim: true
    },
    hora_final: {
        type: String,
        require: true,
        trim: true
    },
    acomodo_sillas: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Acomodosilla",
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

module.exports = mongoose.model("Evento", EventoSchema);