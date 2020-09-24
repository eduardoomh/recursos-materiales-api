const Evento = require("../models/evento");

async function obtenerEventos(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const eventos = await Evento.find().limit(cantidad)
    .skip((pagina - 1) * cantidad);

    return eventos;
}

async function obtenerEvento(){

}

async function crearEvento(){

}

async function actualizarEvento(){

}

async function borrarEvento(){

}


module.exports = {
    obtenerEventos,
    obtenerEvento,
    crearEvento,
    actualizarEvento,
    borrarEvento
}
