const Tipoorder = require("../models/tipoorder");
const mongoose = require("mongoose");

async function obtenerTipoOrders(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const tipoorders = await Tipoorder.find().limit(cantidad)
        .skip((pagina - 1) * cantidad);
    
        return tipoorders;

    }
    catch(err){
        console.log(err);
    }
}

async function obtenerTipoOrder(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const tipoorder = await Tipoorder.findById(id);
    
        return tipoorder;

    }
    catch(err){
        console.log(err);
    }
}

async function crearTipoOrder(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const tipoorder = await new Tipoorder(input);
        tipoorder.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function actualizarTipoOrder(id, input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const tipoorder = await Tipoorder.findByIdAndUpdate(id, {
            ...input,
            updatedAt: Date.now()
        });
        if(tipoorder) return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function borrarTipoOrder(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

        const mantenimientos = await mongoose.model('Mantenimiento').find().where("servicio", id);
        if(mantenimientos.length > 0) throw new Error(`El servicio no puede ser eliminado porque esta relacionado con ${mantenimientos.length} mantenimiento(s), elimine las relaciones y vuelva a intentarlo`);

        const borrar = await Tipoorder.findByIdAndDelete(id);
        if(!borrar) throw new Error("El servicio no se ha borrado");
        return true;
}


module.exports = {
    obtenerTipoOrders,
    obtenerTipoOrder,
    crearTipoOrder,
    actualizarTipoOrder,
    borrarTipoOrder
}
