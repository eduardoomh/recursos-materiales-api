const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartamentoSchema = Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    jefe: {
        type: String,
        require: true,
        trim: true
    },
    telefono: {
        type: String,
        require: true,
        trim: true
    },
    correo: {
        type: String,
        trim: true,
    },
    subdireccion: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Subdireccion",
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

module.exports = mongoose.model("Departamento", DepartamentoSchema);