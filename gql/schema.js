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
  sitio: Sitio!
  usuario: Usuario!
  fecha: String!
  fecha_final: String
  hora_inicio: String!
  hora_final: String!
  acomodo_sillas: Acomodosilla!
  verificado: Boolean!
  aprobado: Boolean!
  createdAt: String!
  updatedAt: String
}

#tipo departamento
type Departamento{
  id: ID!
  nombre: String!
  jefe: String!
  telefono: String!
  correo: String!
  subdireccion: Subdirection!
  createdAt: String!
  updatedAt: String!
}

#tipo subdireccion
type Subdirection{
  id: ID!
  nombre: String!
  jefe: String!
  createdAt: String!
  updatedAt: String!
}

#tipo lugar
type Sitio{
  id: ID!
  nombre: String!
  edificio: Edificio!
  disponibidad: Boolean!
  createdAt: String!
  updatedAt: String!
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
  updatedAt: String!
}

#tipo evidencia
type Evidencia{
  id: ID!
  solicitud: String!
  tipo: String!
  imagen: String!
  createdAt: String!
  updatedAt: String!
}

#tipo puesto
type Puesto{
  nombre: String!
  createdAt: String!
  updatedAt: String!
}

#tipo permiso
type Permiso{
  usuario: Usuario!
  departamento: Departamento!
  puesto: Puesto!
  createdAt: String!
  updatedAt: String!
}

#tipo vehiculo
type Vehiculo{
  nombre: String!
  modelo: String!
  placas: String!
  disponibidad: Boolean!
  createdAt: String!
  updatedAt: String!
}

type Salida{
  destino: String!
  actividades: String!
  departamento: Departamento!
  usuario: Usuario!
  hora_salida: String!
  hora_llegada: String!
  vehiculo: Vehiculo!
  chofer: String!
  createdAt: String!
  updatedAt: String!
}

type Order{
  nombre: String!
  mantenimiento: String!
  servicio: TipoOrder!
  asignado_a: String!
  departamento: Departamento!
  usuario: Usuario!
  fecha: String!
  hora_inicio: String!
  hora_final: String!
  trabajo_realizado: String!
  equipo_proteccion: String
  verificado: Boolean!
  aprobado: Boolean!
  createdAt: String!
  updatedAt: String!
}

type TipoOrder{
  nombre: String!
  createdAt: String!
  updatedAt: String!
}


#tipo token
type Token{
  token: String!
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
  contrasenaActual: String
  contrasenaNueva: String
  numero_control: String
  descripcion: String
  telefono: String
  updatedAt: String
}

#input de evidencias
input pedirEvidenciaInput{
  id: ID!
  tipo: String!
}

#queries
type Query {
    obtenerUsuarios: [Usuario]!,
    obtenerUsuario(id: ID!): Usuario!
    obtenerEvidencias(input: pedirEvidenciaInput!): [Evidencia]
  }

#mutationes
type Mutation {
    crearUsuario(input: usuarioInput!): Usuario
    login(input: loginInput!): Token
    aprobarUsuario(id: ID!): Boolean
    actualizarUsuario(input: actualizarUsuarioInput!): Boolean!
  }
`;

module.exports = typeDefs;