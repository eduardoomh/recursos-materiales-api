const Permiso = require("../models/permiso");

async function obtenerPermisos(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const permisos = await Permiso.find().limit(cantidad)
    .skip((pagina - 1) * cantidad);

    return permisos;
}

async function obtenerPermiso(){

}

async function crearPermiso(){

}

async function actualizarPermiso(){

}

async function borrarPermiso(){

}


module.exports = {
    obtenerPermisos,
    obtenerPermiso,
    crearPermiso,
    actualizarPermiso,
    borrarPermiso
}
