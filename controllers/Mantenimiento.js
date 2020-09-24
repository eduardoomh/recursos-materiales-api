const Mantenimiento = require("../models/mantenimiento");

async function obtenerReparaciones(args, ctx){
    const { cantidad, pagina } = args;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const mantenimientos = await Mantenimiento.find().limit(cantidad)
    .skip((pagina - 1) * cantidad);

    return mantenimientos;
}

async function obtenerServicios(args, ctx){
    const { cantidad, pagina } = args;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const mantenimientos = await Mantenimiento.find().limit(cantidad)
    .skip((pagina - 1) * cantidad);

    return mantenimientos;
}

async function obtenerTransportes(args, ctx){
    const { cantidad, pagina } = args;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const mantenimientos = await Mantenimiento.find().limit(cantidad)
    .skip((pagina - 1) * cantidad);

    return mantenimientos;
}



async function obtenerMantenimiento(){

}

async function crearMantenimiento(){

}

async function actualizarMantenimiento(){

}

async function borrarMantenimiento(){

}


module.exports = {
    obtenerReparaciones,
    obtenerServicios,
    obtenerTransportes,
    obtenerMantenimiento,
    crearMantenimiento,
    actualizarMantenimiento,
    borrarMantenimiento
}
