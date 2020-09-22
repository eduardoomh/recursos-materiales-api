const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubdirectionSchema = Schema({
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
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Subdirection", SubdirectionSchema);