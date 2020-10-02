const Sitio = require("../models/sitio");

async function obtenerSitios(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const sitios = await Sitio.find().populate("edificio").limit(cantidad)
        .skip((pagina - 1) * cantidad);
    
        return sitios;

    }
    catch(err){
        console.log(Err);
    }
}

async function obtenerSitio(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const sitio = await Sitio.findById(id).populate("edificio");
        return sitio;
    }
    catch(err){
        console.log(err);
    }
    
}

async function crearSitio(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const sitio = await new Sitio(input);
        sitio.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function actualizarSitio(id, input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const sitio = await Sitio.findByIdAndUpdate(id, {
            ...input,
            updatedAt: Date.now()
        });
        if(sitio) return true;

        
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function borrarSitio(){

}


module.exports = {
    obtenerSitios,
    obtenerSitio,
    crearSitio,
    actualizarSitio,
    borrarSitio
}
