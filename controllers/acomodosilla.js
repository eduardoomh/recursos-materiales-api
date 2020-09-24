const Acomodosilla = require("../models/acomodosilla");

async function obtenerAcomodosillas(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const acomodosillas = await Acomodosilla.find().limit(cantidad)
        .skip((pagina - 1) * cantidad);
    
        return acomodosillas;

    }
    catch(err){
        console.log(err);
    }

}

async function obtenerAcomodosilla(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const acomodosilla = await Acomodosilla.findById(id);
    
        return acomodosilla;

    }
    catch(err){
        console.log(err);
    }
}

async function crearAcomodosilla(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const acomodosilla = await new Acomodosilla(input);
        acomodosilla.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function actualizarAcomodosilla(){

}

async function borrarAcomodosilla(){

}


module.exports = {
    obtenerAcomodosillas,
    obtenerAcomodosilla,
    crearAcomodosilla,
    actualizarAcomodosilla,
    borrarAcomodosilla
}
