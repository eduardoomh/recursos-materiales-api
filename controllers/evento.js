const Evento = require("../models/evento");
const Usuario = require("../models/usuario");
const Evidencia = require("../models/evidencia");
const EvidenciaController = require("../controllers/evidencia");
const numeros = require("../utils/numeros");
const bcrypt = require("bcryptjs");

async function obtenerEventos(input, ctx, orden, filtro) {
    const { cantidad, pagina } = input;
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const inicio = numeros.fechaInicio();
    const final = numeros.fechaFinal();
    let eventos;

    switch (filtro) {
        case "aprobados": 
            eventos = await Evento.find().where("aprobado", true).sort(orden).limit(cantidad).skip((pagina - 1) * cantidad);

            break;
        case "pendientes":
            eventos = await Evento.find().where("verificado", false).sort(orden).limit(cantidad).skip((pagina - 1) * cantidad);

            break;
        case "verificados":
            eventos = await Evento.find().where("aprobado", false).where("verificado", true).sort(orden).limit(cantidad).skip((pagina - 1) * cantidad);

            break;
        case "mes actual":
            eventos = await Evento.find({ fecha: { $gte: inicio, $lte: final } }).sort(orden).limit(cantidad).skip((pagina - 1) * cantidad);

            break; 
        default:
            eventos = await Evento.find().sort(orden).limit(cantidad).skip((pagina - 1) * cantidad);
            break;
    }

    return eventos;
}

async function obtenerEventosFiltro(input, filtro, ctx) {
    const { cantidad, pagina } = input;
    const { propiedad, atributo } = filtro;
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try {
        const eventos = await Evento.find().where(propiedad, atributo).sort({ fecha: -1 }).limit(cantidad)
            .skip((pagina - 1) * cantidad);

        return eventos;

    }
    catch (err) {
        console.log(err);
    }
}

async function obtenerEvento(id, ctx) {
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try {
        const evento = await Evento.findById(id).populate("departamento").populate("usuario").populate("acomodo_sillas").populate("sitio");

        return evento;

    }
    catch (err) {
        console.log(err);
    }
}

async function crearEvento(input, ctx) {
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try {
        const evento = await new Evento({
            ...input,
            usuario: ctx.usuario.id
        });
        evento.save();
        return true;
    }
    catch (error) {
        console.log(error);
        return false
    }
}

async function actualizarEvento(id, input, ctx) {
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try {
        const evento = await Evento.findByIdAndUpdate(id, {
            ...input,
            updatedAt: Date.now()
        });
        if (evento) return true;

    }
    catch (error) {
        console.log(error);
        return false
    }

}

async function borrarEvento(id, ctx) {
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try {
        const evidencias = await Evidencia.find().where("tipo", "eventos").where("solicitud", id);
        if (evidencias.length > 0) {
            for await (const data of evidencias) {
                await EvidenciaController.borrarEvidencia(data._id, ctx);
            }
        }
        const evento = await Evento.findByIdAndDelete(id);
        if (evento) return true;

    }
    catch (error) {
        console.log(error);
        return false
    }

}

async function buscarEvento(search) {
    const eventos = await Evento.find({
        nombre: { $regex: search, $options: "i" }
    });
    return eventos;
}

async function aprobarEvento(id, input, contrasena, ctx) {
    const { id: idUser } = ctx.usuario;
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const usuarioEncontrado = await Usuario.findById(idUser);
    if (!usuarioEncontrado) throw new Error("El usuario no existe");

    const contrasenaCorrecta = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
    if (!contrasenaCorrecta) throw new Error("La contrasena introducida no es correcta");

    try {
        console.log(input);
        const evento = await Evento.findByIdAndUpdate(id, {
            ...input,
            updatedAt: Date.now()
        });

        if (evento) return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

async function eventoFechas(input, ctx) {
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    const { inicio, final } = input;

    try {
        const eventos = await Evento.find({ fecha: { $gte: inicio, $lte: final } });

        if (eventos) return eventos;
    }
    catch (error) {
        console.log(error);
        return [];
    }

}


module.exports = {
    obtenerEventos,
    obtenerEventosFiltro,
    obtenerEvento,
    crearEvento,
    actualizarEvento,
    borrarEvento,
    buscarEvento,
    aprobarEvento,
    eventoFechas

}
