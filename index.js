const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolvers");
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