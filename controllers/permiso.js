const Permiso = require("../models/permiso");

async function obtenerPermisos(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const permisos = await Permiso.find().sort({createdAt: -1}).populate("usuario").limit(cantidad)
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
        const permiso = await Permiso.findById(id).populate("puesto").populate("usuario").populate("departamento");
        if(permiso) return permiso;
    }
    catch(err){
        console.log(err);
    }
}


async function obtenerPermisoUsuario(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const permiso = await Permiso.findOne().where("usuario", id).populate("usuario").populate("departamento").populate("puesto");
        if(permiso) return permiso;
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

async function actualizarPermiso(id, input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const permiso = await Permiso.findByIdAndUpdate(id, {
            ...input,
            updatedAt: Date.now()
        });
        if(permiso) return true;
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }

}

async function borrarPermiso(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const borrar = await Permiso.findByIdAndDelete(id);
    if(!borrar) throw new Error("El permiso no se ha borrado");
    return true;
}


module.exports = {
    obtenerPermisos,
    obtenerPermiso,
    obtenerPermisoUsuario,
    crearPermiso,
    actualizarPermiso,
    borrarPermiso
}
