const Acomodosilla = require("../models/acomodosilla");
const Evento = require("../models/evento");

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
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

        const eventos = await Evento.find().where("acomodo_sillas", id);
        if(eventos.length > 0) throw new Error(`La organizacion no puede ser eliminada porque esta relacionada con ${eventos.length} evento(s), elimine las relaciones y vuelva a intentarlo`);

        return true;
}


module.exports = {
    obtenerAcomodosillas,
    obtenerAcomodosilla,
    crearAcomodosilla,
    actualizarAcomodosilla,
    borrarAcomodosilla
}
