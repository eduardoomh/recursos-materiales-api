const Acomodosilla = require("../models/acomodosilla");
const Evento = require("../models/evento");
const awsUploadImage = require("../utils/aws-upload-image");
const awsDeleteImage = require("../utils/aws-delete-image");
const { v4: uuidv4 } = require("uuid");

async function obtenerAcomodosillas(input, ctx){
    const { cantidad, pagina } = input;
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const acomodosillas = await Acomodosilla.find().sort({createdAt: -1}).limit(cantidad)
        .skip((pagina - 1) * cantidad);
    
        return acomodosillas;

    }
    catch(err){
        console.log(err);
    }

}

async function obtenerAcomodosilla(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    try{
        const acomodosilla = await Acomodosilla.findById(id);
    
        return acomodosilla;

    }
    catch(err){
        console.log(err);
    }
}

async function crearAcomodosilla(file, input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    const { createReadStream, mimetype } = await file;
    const extension = mimetype.split("/")[1];
    const fileData = createReadStream();

    try{
        const acomodosilla = await new Acomodosilla({
            ...input,
            imagen: ""
        });
        await acomodosilla.save();

        if(acomodosilla){
            const imageName = `organizaciones/${acomodosilla._id}.${extension}`;
            const result = await awsUploadImage(fileData, imageName);
            const organizacionCreada = await Acomodosilla.findByIdAndUpdate(acomodosilla._id, {imagen: result});
            if(!organizacionCreada) return false;
        }

        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function actualizarAcomodosilla(id, input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    try{
        const acomodosilla = await Acomodosilla.findByIdAndUpdate(id, input);
        if(!acomodosilla) return false;

        return true;
    }
    catch(error){
        console.log(error);
        return false
    }
}

async function actualizarAcomodosillaImagen(id, file, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    const { createReadStream, mimetype } = await file;
    const extension = mimetype.split("/")[1];
    const dataImage = `organizaciones/${id}.${extension}`;
    const fileData = createReadStream();

    const result = await awsUploadImage(fileData, dataImage);
    if(!result) throw new Error("La imagen no ha sido actualizada");

    const actualizarAcomodosilla = await Acomodosilla.findByIdAndUpdate(id, {imagen: result});
    if(!actualizarAcomodosilla) return false;

    return true;
}

async function borrarAcomodosilla(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

        const eventos = await Evento.find().where("acomodo_sillas", id);
        if(eventos.length > 0) throw new Error(`La organizacion no puede ser eliminada porque esta relacionada con ${eventos.length} evento(s), elimine las relaciones y vuelva a intentarlo`);

        
        const acomodosilla = await Acomodosilla.findById(id);
        if (acomodosilla.length === 0) {
            throw new Error("La organizacion no ha sido encontrada");
        }

        const { imagen } = acomodosilla;
        const link = imagen.substring(0, 40);
        let imageName;

        if (link === "https://tec-materiales.s3.amazonaws.com/") {
            imageName = imagen.substring(40);
        }else{
            imageName = imagen.substring(50);
        }

        const borrado = await awsDeleteImage(imageName);
        if (!borrado) throw new Error("Lo sentimos, la organizacion no ha sido eliminada porque la imagen no ha sido encontrada");

        
        const borrar = await Acomodosilla.findByIdAndDelete(id);
        if(!borrar) throw new Error("La organizacion no se ha borrado");
        
        return true;

}


module.exports = {
    obtenerAcomodosillas,
    obtenerAcomodosilla,
    crearAcomodosilla,
    actualizarAcomodosilla,
    actualizarAcomodosillaImagen,
    borrarAcomodosilla
}
