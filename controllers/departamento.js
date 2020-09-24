const Departamento = require("../models/departamento");

async function obtenerDepartamentos(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const departamentos = await Departamento.find().populate("subdireccion").limit(cantidad)
        .skip((pagina - 1) * cantidad);
    
        return departamentos;
        
    }
    catch(err){
        console.log(err);
    }
}

async function obtenerDepartamento(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const departamento = await Departamento.findById(id).populate("subdireccion");

        return departamento;
    }
    catch(err){
        console.log(err);
    }
}

async function crearDepartamento(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const departamento = await new Departamento(input);
        departamento.save();
        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function actualizarDepartamento(){

}

async function borrarDepartamento(){

}


module.exports = {
    obtenerDepartamentos,
    obtenerDepartamento,
    crearDepartamento,
    actualizarDepartamento,
    borrarDepartamento
}
