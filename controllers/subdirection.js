const Subdirection = require("../models/subdirection");

async function obtenerSubdirecciones(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const subdirecciones = await Subdirection.find().limit(cantidad)
    .skip((pagina - 1) * cantidad);

    return subdirecciones;
}

async function obtenerSubdireccion(){

}

async function crearSubdireccion(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const subdireccion = await new Subdirection(input);
        subdireccion.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }

}

async function actualizarSubdireccion(){

}

async function borrarSubdireccion(){

}


module.exports = {
    obtenerSubdirecciones,
    obtenerSubdireccion,
    crearSubdireccion,
    actualizarSubdireccion,
    borrarSubdireccion
}
