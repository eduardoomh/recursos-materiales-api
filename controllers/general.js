const Evento = require("../models/evento");
const Mantenimiento = require("../models/mantenimiento");

async function solicitudesHoy(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const eventos = await Evento.find().where("fecha", input);
        const mantenimientos = await Mantenimiento.find().where("fecha", input);

        const solicitudes = [
            ...eventos,
            ...mantenimientos
        ]
    
        return solicitudes.length;

    }
    catch(err){
        console.log(err);
        return 0;
    }
}

module.exports = {
    solicitudesHoy

}
