const Vehiculo = require("../models/vehiculo");

async function obtenerVehiculos(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const vehiculos = await Vehiculo.find().limit(cantidad)
    .skip((pagina - 1) * cantidad);

    return vehiculos;
}

async function obtenerVehiculo(){

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

async function actualizarVehiculo(){

}

async function borrarVehiculo(){

}


module.exports = {
    obtenerVehiculos,
    obtenerVehiculo,
    crearVehiculo,
    actualizarVehiculo,
    borrarVehiculo
}
