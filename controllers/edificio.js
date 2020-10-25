const Edificio = require("../models/edificio");
const Sitio = require("../models/sitio");

async function obtenerEdificios(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const edificios = await Edificio.find().sort({createdAt: -1}).limit(cantidad)
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

async function actualizarEdificio(id, input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const edificio = await Edificio.findByIdAndUpdate(id, {
            ...input,
            updatedAt: Date.now()
        });
        if(edificio) return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function borrarEdificio(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

        const sitios = await Sitio.find().where("edificio", id);
        if(sitios.length > 0) throw new Error(`El edificio no puede ser eliminado porque esta relacionado con ${sitios.length} sitio(s), elimine las relaciones y vuelva a intentarlo`);

        const borrar = await Edificio.findByIdAndDelete(id);
        if(!borrar) throw new Error("El sitio no se ha borrado");
        return true;
}


module.exports = {
    obtenerEdificios,
    obtenerEdificio,
    crearEdificio,
    actualizarEdificio,
    borrarEdificio
}
