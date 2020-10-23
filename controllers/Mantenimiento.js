const Mantenimiento = require("../models/mantenimiento");
const Usuario = require("../models/usuario");
const Evidencia = require("../models/evidencia");
const EvidenciaController = require("../controllers/evidencia");
const numeros = require("../utils/numeros");
const bcrypt = require("bcryptjs");

async function obtenerReparaciones(input, ctx, orden, filtro){
    const { cantidad, pagina } = input;
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const inicio = numeros.fechaInicio();
    const final = numeros.fechaFinal();
    let mantenimientos;

    switch (filtro) {
        case "aprobados":
             mantenimientos = await Mantenimiento.find().where("aprobado", true).sort(orden).limit(cantidad).skip((pagina - 1) * cantidad);

            break;
        case "pendientes":
            mantenimientos = await Mantenimiento.find().where("verificado", false).sort(orden).limit(cantidad).skip((pagina - 1) * cantidad);

            break;
        case "verificados":
            mantenimientos = await Mantenimiento.find().where("aprobado", false).where("verificado", true).sort(orden).limit(cantidad).skip((pagina - 1) * cantidad);

            break;
        case "mes actual":
            mantenimientos = await Mantenimiento.find({ fecha: { $gte: inicio, $lte: final } }).sort(orden).limit(cantidad).skip((pagina - 1) * cantidad);

            break;
        default:
            mantenimientos = await Mantenimiento.find().sort(orden).limit(cantidad).skip((pagina - 1) * cantidad);
            break;
    }

    return mantenimientos;

}

async function obtenerMantenimientosFiltro(input, filtro, ctx){
    const { cantidad, pagina } = input;
    const { propiedad, atributo } = filtro;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const mantenimientos = await Mantenimiento.find().where(propiedad, atributo).sort({fecha: -1}).limit(cantidad)
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

async function borrarMantenimiento(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const evidencias = await Evidencia.find().where("tipo", "mantenimientos").where("solicitud", id);
        if(evidencias.length > 0){
            for await (const data of evidencias){
                await EvidenciaController.borrarEvidencia(data._id,ctx);
            }
        }
        const mantenimiento = await Mantenimiento.findByIdAndDelete(id);
        if(mantenimiento) return true;

    }
    catch(error){
        console.log(error);
        return false
    }
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
    obtenerMantenimientosFiltro,
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
