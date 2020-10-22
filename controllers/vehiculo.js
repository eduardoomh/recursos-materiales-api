const Vehiculo = require("../models/vehiculo");
const Salida = require("../models/salida");

async function obtenerVehiculos(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const vehiculos = await Vehiculo.find().limit(cantidad)
        .skip((pagina - 1) * cantidad);
    
        return vehiculos;

    }
    catch(err){
        console.log(err);
    }
}

async function obtenerVehiculo(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const vehiculo = await Vehiculo.findById(id);
    
        return vehiculo;

    }
    catch(err){
        console.log(err);
    }
}

async function crearVehiculo(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const vehiculo = await new Vehiculo(input);
        vehiculo.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function actualizarVehiculo(id, input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const vehiculo = Vehiculo.findByIdAndUpdate(id, {
            ...input,
            updatedAt: Date.now()
        });
        if(vehiculo) return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function borrarVehiculo(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

        const salidas = await Salida.find().where("vehiculo", id);
        if(salidas.length > 0) throw new Error(`El vehiculo no puede ser eliminado porque esta relacionado con ${salidas.length} salida(s), elimine las relaciones y vuelva a intentarlo`);

        return true;
}


module.exports = {
    obtenerVehiculos,
    obtenerVehiculo,
    crearVehiculo,
    actualizarVehiculo,
    borrarVehiculo
}
