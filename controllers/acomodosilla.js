const Acomodosilla = require("../models/acomodosilla");

async function obtenerAcomodosillas(input, ctx){
    
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const acomodosillas = await Acomodosilla.find().limit(cantidad)
    .skip((pagina - 1) * cantidad);

    return acomodosillas;
}

async function obtenerAcomodosilla(){

}

async function crearAcomodosilla(){

}

async function actualizarAcomodosilla(){

}

async function borrarAcomodosilla(){

}


module.exports = {
    obtenerAcomodosillas,
    obtenerAcomodosilla,
    crearAcomodosilla,
    actualizarAcomodosilla,
    borrarAcomodosilla
}
