const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const usuarioController = require("./controllers/usuario");
require("dotenv").config({path: ".env"});


mongoose.connect(process.env.BBDD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true

}, (err, _) => {
    if(err){
        console.log("error de conexion");
    }else{
        console.log("conexion correcta");
        server();
    }
});

const resolvers = {
    Query: {
      obtenerUsuarios: () => usuarioController.obtenerUsuarios(),
      obtenerUsuario: (_, args) => usuarioController.obtenerUsuario(args.id)
      
    },
    Mutation: {
        crearUsuario: (parent, args, context, info) => usuarioController.crearUsuario(args.input),
        login: (parent, args, context, info) => usuarioController.login(args.input),
        aprobarUsuario: (parent, args, context, info) => usuarioController.aprobarUsuario(args.id),
        actualizarUsuario: (parent, args, context, info) => usuarioController.actualizarUsuario(args.input, context)

    }
  }

function server(){
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) => {
            const token = req.headers.authorization;

            if(token){
                try{
                    const usuario = jwt.verify(
                        token.replace("bearer ", ""),
                        process.env.SECRET_KEY
                    );
                    return {
                        usuario,
                    };

                }
                catch(error){
                    console.log("#### ERROR ####");
                    console.log(error);
                    throw new Error(" token invalido");
                }
            }
        }



    });

    serverApollo.listen().then((response) => {
        console.log("#########################################");
        console.log(`el servidor se ha levantado correctamente, puedes verlo en la direccion ${response.url}`);
        console.log("#########################################");
    })
}