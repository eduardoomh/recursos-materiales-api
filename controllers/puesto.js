const Puesto = require("../models/puesto");

async function obtenerPuestos(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const puestos = await Puesto.find().limit(cantidad)
        .skip((pagina - 1) * cantidad);
    
        return puestos;

    }
    catch(err){
        console.log(err);
    }
}

async function obtenerPuesto(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const puesto = await Puesto.findById(id);
        return puesto;
    }
    catch(err){
        console.log(err);
    }
}

async function crearPuesto(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const puesto = await new Puesto(input);
        puesto.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function actualizarPuesto(){

}

async function borrarPuesto(){

}


module.exports = {
    obtenerPuestos,
    obtenerPuesto,
    crearPuesto,
    actualizarPuesto,
    borrarPuesto
}
