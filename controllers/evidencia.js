const Evidencia = require("../models/evidencia");
const awsUploadImage = require("../utils/aws-upload-image");
const {v4: uuidv4} = require("uuid");


async function obtenerEvidencias(input, ctx){
    const { id, tipo } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    const evidencias = await Evidencia.find();

    return evidencias;
}


async function obtenerEvidencia(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const evidencia = await Evidencia.findById(id);
        return evidencia;
    }
    catch(err){
        console.log(err);
    }

}

async function crearEvidencia(file, input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    const { solicitud, tipo } = input;
    const { createReadStream, mimetype } = await file;
    const extension = mimetype.split("/")[1];
    const imageName = `evidencias/${uuidv4()}.${extension}`;
    const fileData = createReadStream();

    try{
        const result = await awsUploadImage(fileData, imageName);

        const evidencia = await new Evidencia({
            solicitud: solicitud,
            tipo: tipo,
            imagen: result
        });
        evidencia.save();

        if(evidencia) return true; 
  
    }
    catch(error){
        console.log(error);
        return false;
        }
}

async function borrarEvidencia(){

}


module.exports = {
    obtenerEvidencias,
    obtenerEvidencia,
    crearEvidencia,
    borrarEvidencia
}
