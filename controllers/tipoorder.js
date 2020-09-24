const Tipoorder = require("../models/tipoorder");

async function obtenerTipoOrders(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const tipoorders = await Tipoorder.find().limit(cantidad)
    .skip((pagina - 1) * cantidad);

    return tipoorders;
}

async function obtenerTipoOrder(){

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

async function actualizarTipoOrder(){

}

async function borrarTipoOrder(){

}


module.exports = {
    obtenerTipoOrders,
    obtenerTipoOrder,
    crearTipoOrder,
    actualizarTipoOrder,
    borrarTipoOrder
}
