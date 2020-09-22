const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LugarSchema = Schema({
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

module.exports = mongoose.model("Lugar", LugarSchema);