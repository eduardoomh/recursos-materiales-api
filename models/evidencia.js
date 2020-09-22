const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EvidenciaSchema = Schema({
    solicitud: {
        type: String,
        require: true,
        trim: true
    },
    tipo: {
        type: String,
        require: true,
        trim: true
    },
    imagen: {
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

module.exports = mongoose.model("Evidencia", EvidenciaSchema);