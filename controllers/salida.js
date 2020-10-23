const Salida = require("../models/salida");
const Evidencia = require("../models/evidencia");
const numeros = require("../utils/numeros");
const EvidenciaController = require("../controllers/evidencia");

async function obtenerSalidas(input, ctx, orden, filtro){
    const { cantidad, pagina } = input;
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const inicio = numeros.fechaInicio();
    const final = numeros.fechaFinal();
    let salidas;

    switch (filtro) {
        case "mes actual":
            salidas = await Salida.find({ fecha: { $gte: inicio, $lte: final } }).sort(orden).limit(cantidad).skip((pagina - 1) * cantidad);
            break;
        default:
            salidas = await Salida.find().sort(orden).limit(cantidad).skip((pagina - 1) * cantidad);
            break;
    }

    return salidas;
}

async function obtenerSalidasFiltro(input, filtro, ctx){
    const { cantidad, pagina } = input;
    const { propiedad, atributo } = filtro;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const salidas = await Salida.find().where(propiedad, atributo).sort({fecha: -1}).limit(cantidad)
        .skip((pagina - 1) * cantidad);
    
        return salidas;

    }
    catch(err){
        console.log(err);
    }
}


async function obtenerSalida(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const salida = await Salida.findById(id).populate("vehiculo").populate("departamento").populate("usuario");
    
        return salida;

    }
    catch(err){
        console.log(err);
    }
}

async function crearSalida(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const salida = await new Salida({
            ...input,
            usuario: ctx.usuario.id
        });
        salida.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function actualizarSalida(id, input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const salida = await Salida.findByIdAndUpdate(id, {
            ...input,
            updatedAt: Date.now()
        });
        if(salida) return true;

    }
    catch(error){
        console.log(error);
        return false
    }
}

async function borrarSalida(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const evidencias = await Evidencia.find().where("tipo", "salidas").where("solicitud", id);
        if(evidencias.length > 0){
            for await (const data of evidencias){
                await EvidenciaController.borrarEvidencia(data._id,ctx);
            }
        }
        const salida = await Salida.findByIdAndDelete(id);
        if(salida) return true;

    }
    catch(error){
        console.log(error);
        return false
    }
}

async function buscarSalida(search){
    const salidas = await Salida.find({
        destino: { $regex: search, $options: "i"}
    });
    return salidas;
}


module.exports = {
    obtenerSalidas,
    obtenerSalidasFiltro,
    obtenerSalida,
    crearSalida,
    actualizarSalida,
    borrarSalida,
    buscarSalida
}
