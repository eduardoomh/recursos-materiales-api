const Permiso = require("../models/permiso");

async function obtenerPermisos(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const permisos = await Permiso.find().limit(cantidad)
        .skip((pagina - 1) * cantidad);
    
        return permisos;

    }
    catch(err){
        console.log(err);
    }
}

async function obtenerPermiso(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const permiso = await Permiso.findById(id).populate("puesto");
        return permiso;
    }
    catch(err){
        console.log(err);
    }
}

async function crearPermiso(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const permiso = await new Permiso(input);
        permiso.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
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
