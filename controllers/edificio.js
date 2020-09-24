const Edificio = require("../models/edificio");

async function obtenerEdificios(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const edificios = await Edificio.find().limit(cantidad)
        .skip((pagina - 1) * cantidad);
    
        return edificios;

    }
    catch(err){
        console.log(err);
    }
}

async function obtenerEdificio(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const edificio = await Edificio.findById(id);
    
        return edificio;

    }
    catch(err){
        console.log(err);
    }
}

async function crearEdificio(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const edificio = await new Edificio(input);
        edificio.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function actualizarEdificio(){

}

async function borrarEdificio(){

}


module.exports = {
    obtenerEdificios,
    obtenerEdificio,
    crearEdificio,
    actualizarEdificio,
    borrarEdificio
}
