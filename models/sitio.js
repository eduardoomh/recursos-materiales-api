const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SitioSchema = Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    edificio: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Edificio",
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

module.exports = mongoose.model("Sitio", SitioSchema);