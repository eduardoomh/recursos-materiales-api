const Salida = require("../models/salida");

async function obtenerSalidas(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const salidas = await Salida.find().limit(cantidad)
    .skip((pagina - 1) * cantidad);

    return salidas;
}

async function obtenerSalida(){

}

async function crearSalida(){

}

async function actualizarSalida(){

}

async function borrarSalida(){

}


module.exports = {
    obtenerSalidas,
    obtenerSalida,
    crearSalida,
    actualizarSalida,
    borrarSalida
}
