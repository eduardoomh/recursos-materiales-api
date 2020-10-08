const Mantenimiento = require("../models/mantenimiento");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

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

async function aprobarMantenimiento(id, input, contrasena, ctx){
    const { id: idUser } = ctx.usuario;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const usuarioEncontrado = await Usuario.findById(idUser);
    if(!usuarioEncontrado) throw new Error("El usuario no existe");

    const contrasenaCorrecta = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
    if(!contrasenaCorrecta) throw new Error("La contrasena introducida no es correcta");

    try{
        const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, {
            ...input,
            updatedAt: Date.now()
        });

        if(mantenimiento) return true;
    }
    catch(error){
        console.log(error);
        return false;
    }
}

async function mantenimientoFechas(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    const {inicio, final} = input;

    try{
        const mantenimientos = await Mantenimiento.find({ fecha: { $gte: inicio, $lte: final } });

        if(mantenimientos) return mantenimientos;
    }
    catch(error){
        console.log(error);
        return [];
    }

}


module.exports = {
    obtenerReparaciones,
    obtenerServicios,
    obtenerTransportes,
    obtenerMantenimiento,
    crearMantenimiento,
    actualizarMantenimiento,
    borrarMantenimiento,
    buscarMantenimiento,
    aprobarMantenimiento,
    mantenimientoFechas
}
