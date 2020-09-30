const Evento = require("../models/evento");

async function obtenerEventos(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const eventos = await Evento.find().limit(cantidad)
        .skip((pagina - 1) * cantidad);
    
        return eventos;

    }
    catch(err){
        console.log(err);
    }
}

async function obtenerEvento(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const evento = await Evento.findById(id).populate("departamento").populate("usuario").populate("acomodo_sillas").populate("sitio");
    
        return evento;

    }
    catch(err){
        console.log(err);
    }
}

async function crearEvento(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const evento = await new Evento(input);
        evento.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    } 
}

async function actualizarEvento(input, ctx){
    const { id } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const evento = await Evento.findByIdAndUpdate(id, input);
        console.log(evento);
        return true

    }
    catch(error){
        console.log(error);
        return false
    }

}

async function borrarEvento(){

}


module.exports = {
    obtenerEventos,
    obtenerEvento,
    crearEvento,
    actualizarEvento,
    borrarEvento
}
