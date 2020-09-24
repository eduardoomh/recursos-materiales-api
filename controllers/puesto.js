const Puesto = require("../models/puesto");

async function obtenerPuestos(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const puestos = await Puesto.find().limit(cantidad)
    .skip((pagina - 1) * cantidad);

    return puestos;
}

async function obtenerPuesto(){

}

async function crearPuesto(){

}

async function actualizarPuesto(){

}

async function borrarPuesto(){

}


module.exports = {
    obtenerPuestos,
    obtenerPuesto,
    crearPuesto,
    actualizarPuesto,
    borrarPuesto
}
