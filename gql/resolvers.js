const usuarioController = require("../controllers/usuario");
  
const resolvers = {
    Query: {
        getUsers: (_, {}) => usuarioController.getUsers(),
        
    },

    Mutation:{
        createUsers: (_, {input}) => usuarioController.createUser(input)
    },
  };

  module.exports = {
      resolvers
  }