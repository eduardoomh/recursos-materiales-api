const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function crearToken(usuario, SECRET_KEY, expiresIn){
    const { id, nombre, apellidos, correo, numero_control, descripcion, avatar, telefono, estatus } = usuario;

    const payload = {
        id,
        nombre,
        apellidos,
        correo,
        numero_control,
        descripcion,
        avatar,
        estatus,
        telefono,
    };
 
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

async function obtenerUsuarios(input, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");
    const {cantidad, pagina} = input;
    try{
        const users = await Usuario.find().limit(cantidad).skip((pagina - 1) * cantidad);
        return users;

    }
    catch(err){
        console.log(err);
    }

}

async function obtenerUsuario(id, ctx){
    if(!ctx.usuario) throw new Error("No cuenta con las credenciales para hacer esto, inicie sesion");

    let user = null;
    if(id) user = await Usuario.findById(id);

    if(!user) throw new Error("lo sentimos, El usuario no existe");

    return user;
}


async function crearUsuario(input){
        const nuevoUsuario = input;
        nuevoUsuario.correo = nuevoUsuario.correo.toLowerCase();
        nuevoUsuario.contrasena = nuevoUsuario.contrasena;
    
        const {correo, numero_control, contrasena} = nuevoUsuario;
    
        //revisamos sin el email esta en uso
        const correoExistente = await Usuario.findOne({correo});
        if(correoExistente) throw new Error("El correo ya esta en uso");
    
        //revisamos si el username esta en uso
        const numeroExistente = await Usuario.findOne({numero_control});
        if(numeroExistente) throw new Error("El número de control ya está en uso");
    
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

async function login(input){
    const { correo, contrasena } = input;
    const usuarioEncontrado = await Usuario.findOne({correo: correo.toLowerCase()});
    
    if(!usuarioEncontrado) throw new Error("error en el correo y contraseña");
    if(usuarioEncontrado.estatus === "pendiente") throw new Error("Su cuenta aún no ha sido aprobada");

    const contrasenaExitosa = await bcrypt.compare(contrasena, usuarioEncontrado.contrasena);
    if(!contrasenaExitosa) throw new Error("error en el correo y contraseña");


    return {
        token: crearToken(usuarioEncontrado, process.env.SECRET_KEY, "24h")
    };
}

async function actualizarUsuario(input, ctx){
    const { id } = ctx.usuario;

    if(input.correo){
        const correoExistente = await Usuario.findOne({correo: input.correo});
        if(correoExistente) throw new Error("El correo ya esta en uso");
    }

    try{
        if(input.contrasenaActual && input.contrasenaNueva){
            const usuarioEncontrado = await User.findById(id);
            const contrasenaCorrecta = await bcrypt.compare(input.contrasenaActual, usuarioEncontrado.contrasena);

            if(!contrasenaCorrecta) throw new Error("contraseña incorrecta");
            const salt = await bcrypt.genSaltSync(10);
            const nuevaContrasenaEncriptada = await bcrypt.hash(input.contrasenaNueva, salt);
            const ActualizacionTerminada = await Usuario.findByIdAndUpdate(id, {password: contrasenaNueva});
            if(ActualizacionTerminada) return true;

        }else{
            const ActualizacionTerminada = await Usuario.findByIdAndUpdate(id, input);
            if(ActualizacionTerminada) return true;
        }

    }
    catch(error){
        console.log(error);
        return false;
    }
}

async function actualizarAvatar(file, ctx){
    const { id } = ctx.user;
    const { createReadStream, mimetype } = await file;
    const extension = mimetype.split("/")[1];
    const imageName = `avatar/${id}.${extension}`;
    const fileData = createReadStream();

    try{
        const result = await awsUploadImage(fileData, imageName);
        console.log(result);
        await Usuario.findByIdAndUpdate(id, { avatar: result});
        return {
            status: true,
            urlAvatar: result
        }
    }
    catch(error){
        return{
            status: false,
            urlAvatar: null
        }
    }

}

async function borrarAvatar(ctx){
    const { id } = ctx.user;

    try{
        await Usuario.findByIdAndUpdate(id, { avatar: "" });
        return true;

    }
    catch(error){
        console.log(error);
        return false;
    }
}

async function busqueda(search){
    const users = await User.find({
        name: { $regex: search, $options: "i"}
    });
    return users;
}

async function aprobarUsuario(id){
    try{
        const usuarioEncontrado = await Usuario.findById(id);
        if(!usuarioEncontrado) throw new Error("El usuario no existe");

        await Usuario.findByIdAndUpdate(id, {estatus: "aprobado"});
        return true
    }
    catch(error){
        console.log(error);
        return false;
    }

}

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    login,
    actualizarUsuario,
    aprobarUsuario,
    actualizarAvatar,
    borrarAvatar,
    busqueda
}