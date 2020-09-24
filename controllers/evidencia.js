const Evidencia = require("../models/evidencia");

async function obtenerEvidencias(input, ctx){
    const { id, tipo } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const evidencias = await Evidencia.find();

    return evidencias;
}

async function obtenerEvidencia(){

}

async function crearEvidencia(){

}

async function actualizarEvidencia(){

}

async function borrarEvidencia(){

}


module.exports = {
    obtenerEvidencias,
    obtenerEvidencia,
    crearEvidencia,
    actualizarEvidencia,
    borrarEvidencia
}
