const Evidencia = require("../models/evidencia");
const awsUploadImage = require("../utils/aws-upload-image");
const awsDeleteImage = require("../utils/aws-delete-image");
const { v4: uuidv4 } = require("uuid");


async function obtenerEvidencias(input, ctx) {
    const { id, tipo } = input;
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try {
        const evidencias = await Evidencia.find().where("solicitud", id).where("tipo", tipo);
        return evidencias;
    }
    catch (error) {
        console.log(error);
    }

}


async function obtenerEvidencia(id, ctx) {
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try {
        const evidencia = await Evidencia.findById(id);
        return evidencia;
    }
    catch (err) {
        console.log(err);
    }

}

async function crearEvidencia(file, input, ctx) {
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    const { solicitud, tipo } = input;
    const { createReadStream, mimetype } = await file;
    const extension = mimetype.split("/")[1];
    const imageName = `evidencias/${uuidv4()}.${extension}`;
    const fileData = createReadStream();

    try {
        const result = await awsUploadImage(fileData, imageName);

        const evidencia = await new Evidencia({
            solicitud: solicitud,
            tipo: tipo,
            imagen: result
        });
        evidencia.save();

        if (evidencia) return true;

    }
    catch (error) {
        console.log(error);
        return false;
    }
}

async function borrarEvidencia(id, ctx) {
    if (!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try {
        const evidencia = await Evidencia.findById(id);
        if (Evidencia.length === 0) {
            throw new Error("La imagen no ha sido encontrada");
        }

        const { imagen } = evidencia;
        const link = imagen.substring(0, 40);
        console.log(link)
        let imageName;

        if (link === "https://tec-materiales.s3.amazonaws.com/") {
            console.log(imagen);
            imageName = imagen.substring(40);
        }else{
            console.log(imagen);
            imageName = imagen.substring(50);
        }

        console.log(imageName)
        const result = await awsDeleteImage(imageName);
        if (!result) throw new Error("Lo sentimos, la imagen no ha sido eliminada");

        const borrarEvidencia = await Evidencia.findByIdAndDelete(id);
        if (!borrarEvidencia) return false;
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = {
    obtenerEvidencias,
    obtenerEvidencia,
    crearEvidencia,
    borrarEvidencia
}
