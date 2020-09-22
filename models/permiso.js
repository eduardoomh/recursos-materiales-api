const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PermisoSchema = Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Usuario",
    },
    departamento: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Departamento",
    },
    puesto: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Puesto",
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

module.exports = mongoose.model("Permiso", PermisoSchema);