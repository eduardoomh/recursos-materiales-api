const Salida = require("../models/salida");

async function obtenerSalidas(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const salidas = await Salida.find().limit(cantidad)
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
        const salida = await new Salida(input);
        salida.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function actualizarSalida(){

}

async function borrarSalida(){

}


module.exports = {
    obtenerSalidas,
    obtenerSalida,
    crearSalida,
    actualizarSalida,
    borrarSalida
}
