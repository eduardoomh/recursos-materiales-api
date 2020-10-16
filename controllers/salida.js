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
        const salida = await new Salida({
            ...input,
            usuario: ctx.usuario.id
        });
        salida.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function actualizarSalida(id, input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const salida = await Salida.findByIdAndUpdate(id, {
            ...input,
            updatedAt: Date.now()
        });
        if(salida) return true;

    }
    catch(error){
        console.log(error);
        return false
    }
}

async function borrarSalida(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const salida = await Salida.findByIdAndDelete(id);
        if(salida) return true;

    }
    catch(error){
        console.log(error);
        return false
    }
}

async function buscarSalida(search){
    const salidas = await Salida.find({
        destino: { $regex: search, $options: "i"}
    });
    return salidas;
}


module.exports = {
    obtenerSalidas,
    obtenerSalida,
    crearSalida,
    actualizarSalida,
    borrarSalida,
    buscarSalida
}
