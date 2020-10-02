const Mantenimiento = require("../models/mantenimiento");

async function obtenerReparaciones(args, ctx){
    const { cantidad, pagina } = args;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const mantenimientos = await Mantenimiento.find().limit(cantidad)
        .skip((pagina - 1) * cantidad);

        return mantenimientos; 
    }
    catch(err){
        console.log(err);
    }

}

async function obtenerServicios(args, ctx){
    const { cantidad, pagina } = args;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const mantenimientos = await Mantenimiento.find().limit(cantidad)
        .skip((pagina - 1) * cantidad);
    
        return mantenimientos;

    }
    catch(err){
        console.log(err);
    }
}

async function obtenerTransportes(args, ctx){
    const { cantidad, pagina } = args;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const mantenimientos = await Mantenimiento.find().limit(cantidad)
        .skip((pagina - 1) * cantidad);
    
        return mantenimientos;

    }
    catch(err){
        console.log(err);
    }

}



async function obtenerMantenimiento(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const mantenimiento = await Mantenimiento.findById(id).populate("departamento").populate("servicio").populate("usuario");
    
        return mantenimiento;

    }
    catch(err){
        console.log(err);
    }
}

async function crearMantenimiento(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const mantenimiento = await new Mantenimiento({
            ...input,
            usuario: ctx.usuario.id
        });
        mantenimiento.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function actualizarMantenimiento(id, input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, {
            ...input,
            updatedAt: Date.now()
        });
        if(mantenimiento) return true;

    }
    catch(error){
        console.log(error);
        return false
    }
}

async function borrarMantenimiento(){

}

async function buscarMantenimiento(search){
    const mantenimientos = await Mantenimiento.find({
        nombre: { $regex: search, $options: "i"}
    });
    return mantenimientos;
}


module.exports = {
    obtenerReparaciones,
    obtenerServicios,
    obtenerTransportes,
    obtenerMantenimiento,
    crearMantenimiento,
    actualizarMantenimiento,
    borrarMantenimiento,
    buscarMantenimiento
}
