const Departamento = require("../models/departamento");
const Evento = require("../models/evento");
const Salida = require("../models/salida");

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

async function actualizarDepartamento(id, input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const departamento = await Departamento.findByIdAndUpdate(id, {
            ...input,
            updatedAt: Date.now()
        });
        if(departamento) return true;
        
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function borrarDepartamento(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

        const eventos = await Evento.find().where("departamento", id);
        const mantenimientos = await Mantenimiento.find().where("departamento", id);
        const salidas = await Salida.find().where("departamento", id);

        const solicitudes = [
            ...eventos,
            ...mantenimientos,
            ...salidas
        ]
        if(solicitudes.length > 0) throw new Error(`El departamento no puede ser eliminado porque esta relacionado con ${solicitudes.length} solicitud(es), elimine las relaciones y vuelva a intentarlo`);

        return true;
}


module.exports = {
    obtenerDepartamentos,
    obtenerDepartamento,
    crearDepartamento,
    actualizarDepartamento,
    borrarDepartamento
}
