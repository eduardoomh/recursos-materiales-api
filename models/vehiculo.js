const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehiculoSchema = Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    modelo: {
        type: String,
        require: true,
        trim: true
    },
    placas: {
        type: String,
        require: true,
        trim: true
    },
    disponibilidad: {
        type: Boolean,
        require: true,
        default: true
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

module.exports = mongoose.model("Vehiculo", VehiculoSchema);