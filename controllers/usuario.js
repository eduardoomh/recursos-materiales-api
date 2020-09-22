const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function obtenerUsuarios(){
    const users = await Usuario.find();
    return users;
}

async function obtenerUsuario(id){
    let user = null;
    if(id) user = await Usuario.findById(id);

    if(!user) throw new Error("lo sentimos, El usuario no existe");

    return user;
}


async function crearUsuario(input){
        const nuevoUsuario = input;
        nuevoUsuario.correo = nuevoUsuario.correo.toLowerCase();
        nuevoUsuario.contrasena = nuevoUsuario.contrasena.toLowerCase();
    
        const {correo, numero_control, contrasena} = nuevoUsuario;
    
        //revisamos sin el email esta en uso
        const correoExistente = await Usuario.findOne({correo});
        if(correoExistente) throw new Error("El correo ya esta en uso");
    
        //revisamos si el username esta en uso
        const numeroExistente = await Usuario.findOne({numero_control});
        if(numeroExistente) throw new Error("El numero de control ya esta en uso");
    
        //encriptar password
        const salt = await bcrypt.genSaltSync(10);
        nuevoUsuario.contrasena = await bcrypt.hash(contrasena, salt);
    
        try{
            const user = await new Usuario(nuevoUsuario);
            user.save();
            return user;
        }
        catch(error){
            console.log(error);
        }

}

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario
}