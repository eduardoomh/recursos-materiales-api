const { gql } = require("apollo-server");

const typeDefs = gql`

#tipo usuario
type Usuario{
  id: ID!
  nombre: String!
  apellidos: String!
  correo: String!
  avatar: String
  descripcion: String
  telefono: String
  numero_control: String!
  estatus: String!
  createdAt: String!
}

#tipo evento
type Evento{
  id: ID!
  nombre: String!
  actividades: String!
  departamento: Departamento!
  lugar: Lugar!
  usuario: Usuario!
  fecha: String!
  fecha_final: String
  hora_inicio: String!
  hora_final: String!
  acomodo_sillas: Acomodosilla!
  createdAt: String!
  updatedAt: String
}

#tipo departamento
type Departamento{
  id: ID!
  nombre: String!
  jefe: String!
  telefono: String
  correo: String
  subdireccion: Subdireccion!
  createdAt: String!
  updatedAt: String
}

#tipo subdireccion
type Subdireccion{
  id: ID!
  nombre: String!
  jefe: String
  createdAt: String!
  updatedAt: String
}

#tipo lugar
type Lugar{
  id: ID!
  nombre: String!
  edificio: Edificio!
  disponibidad: Boolean!
  createdAt: String!
  updatedAt: String
}

#tipo edificio
type Edificio{
  id: ID!
  nombre: String!
  createdAt: String!
  updatedAt: String!
}

#tipo acomodosilla
type Acomodosilla{
  id: ID!
  tipo: String!
  imagen: String!
  createdAt: String!
  updatedAt: String
}

#tipo evidencia
type Evidencia{
  id: ID!
  solicitud: String!
  tipo: String!
  imagen: String!
  createdAt: String!
  updatedAt: String
}

#tipo token
type Token{
  token: String
}

#inputs de usuario
input usuarioInput{
  nombre: String!
  apellidos: String!
  correo: String!
  contrasena: String!
  numero_control: String!
}

input loginInput{
  correo: String!
  contrasena: String!
}

input actualizarUsuarioInput{
  nombre: String
  apellidos: String
  correo: String
  contrasena: String
  numero_control: String
  updatedAt: String
}

#input de evidencias
input pedirEvidenciaInput{
  id: ID!
  tipo: String!
}


type Query {
    obtenerUsuarios: [Usuario]!,
    obtenerUsuario(id: ID!): Usuario!
    obtenerEvidencias(input: pedirEvidenciaInput!): [Evidencia]
  }

type Mutation {
    crearUsuario(input: usuarioInput!): Usuario
    login(input: loginInput): Token
    aprobarUsuario(id: ID!): Boolean
  }
`;

module.exports = typeDefs;