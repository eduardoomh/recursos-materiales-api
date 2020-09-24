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
  disponibilidad: Boolean!
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
  id: ID!
  nombre: String!
  createdAt: String!
  updatedAt: String!
}

#tipo permiso
type Permiso{
  id: ID!
  usuario: Usuario!
  departamento: Departamento!
  puesto: Puesto!
  createdAt: String!
  updatedAt: String!
}

#tipo vehiculo
type Vehiculo{
  id: ID!
  nombre: String!
  modelo: String!
  placas: String!
  disponibidad: Boolean!
  createdAt: String!
  updatedAt: String!
}

type Salida{
  id: ID!
  destino: String!
  actividades: String!
  departamento: Departamento!
  usuario: Usuario!
  fecha: String!
  hora_salida: String!
  hora_llegada: String!
  vehiculo: Vehiculo!
  chofer: String!
  createdAt: String!
  updatedAt: String!
}

type Mantenimiento{
  id: ID!
  nombre: String!
  mantenimiento: String!
  servicio: Tipoorder!
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

type Tipoorder{
  id: ID
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

input crearEvidencia{
  solicitud: String!
  tipo: String!
  imagen: String!
}

input actualizarEvidencia{
  solicitud: String
  tipo: String
  imagen: String
}

#input de subdirections
input crearSubdireccion{
  jefe: String!
  nombre: String!
}

input actualizarSubdireccion{
  jefe: String
  nombre: String
}

#input de edificios
input crearEdificio{
  nombre: String!
}

input actualizarEdificio{
  nombre: String
}

#input de vehiculo
input crearVehiculo{
  nombre: String!
  modelo: String!
  placas: String!
  disponibilidad: Boolean!
}

input actualizarVehiculo{
  nombre: String
  modelo: String
  placas: String
  disponibilidad: Boolean
}

#input crear departamento
input crearDepartamento{
  nombre: String!
  jefe: String!
  telefono: String!
  correo: String!
  subdireccion: ID!
}

input actualizarDepartamento{
  nombre: String
  jefe: String
  telefono: String
  correo: String
  subdireccion: ID
}

#input de eventos
input crearEvento{
  nombre: String!
  actividades: String!
  departamento: ID!
  sitio: ID!
  fecha: String!
  fecha_final: String
  hora_inicio: String!
  hora_final: String!
  acomodo_sillas: ID!
}

input actualizarEvento{
  nombre: String
  actividades: String
  departamento: ID
  sitio: ID
  fecha: String
  fecha_final: String
  hora_inicio: String
  hora_final: String
  acomodo_sillas: ID
}

#input de mantenimientos
input crearMantenimiento{
  nombre: String!
  mantenimiento: String!
  servicio: ID!
  asignado_a: String!
  departamento: ID!
  fecha: String!
  hora_inicio: String!
  hora_final: String!
  trabajo_realizado: String!
}

input actualizarMantenimiento{
  nombre: String
  mantenimiento: String
  servicio: ID
  asignado_a: String
  departamento: ID
  fecha: String
  hora_inicio: String
  hora_final: String
  trabajo_realizado: String
}

#input de salidas
input crearSalida{
  destino: String!
  actividades: String!
  departamento: ID!
  hora_salida: String!
  hora_llegada: String!
  vehiculo: ID!
  chofer: String!
}

input actualizarSalida{
  destino: String
  actividades: String
  departamento: ID
  hora_salida: String
  hora_llegada: String
  vehiculo: ID
  chofer: String
}

#input de tipoorder
input crearTipoorder{
  nombre: String!
}

input actualizarTipoorder{
  nombre: String
}

#input de puesto
input crearPuesto{
  nombre: String!
}

input actualizarPuesto{
  nombre: String
}

#input permiso
input crearPermiso{
  usuario: ID!
  departamento: ID!
  puesto: ID!
}

input actualizarPermiso{
  usuario: ID
  departamento: ID
  puesto: ID
}

#input de acomodosillas
input crearAcomodosilla{
  tipo: String!
  imagen: String!
}

input actualizarAcomodosilla{
  tipo: String
  imagen: String
}


#input de sitio
input crearSitio{
  nombre: String!
  edificio: ID!
}

input actualizarSitio{
  nombre: String
  edificio: ID
}

#inputs generales
input PaginateInput{
  cantidad: Int!
  pagina: Int!
}


#queries
type Query {
  #usuarios
    obtenerUsuarios(input: PaginateInput!): [Usuario]!,
    obtenerUsuario(id: ID!): Usuario!

    #eventos
    obtenerEventos(input: PaginateInput!): [Evento]!
    obtenerEvento(id: ID!): Evento

    #mantenimientos
    obtenerReparaciones(input: PaginateInput!): [Mantenimiento]!
    obtenerServicios(input: PaginateInput!): [Mantenimiento]!
    obtenerTransportes(input: PaginateInput!): [Mantenimiento]!
    obtenerMantenimiento(id: ID!): Mantenimiento

    #salidas
    obtenerSalidas(input: PaginateInput!): [Salida]!
    obtenerSalida(id: ID!): Salida

    #departamentos
    obtenerDepartamentos(input: PaginateInput!): [Departamento]!
    obtenerDepartamento(id: ID): Departamento

    #vehiculos
    obtenerVehiculos(input: PaginateInput!): [Vehiculo]!
    obtenerVehiculo(id: ID!): Vehiculo

    #puestos
    obtenerPuestos(input: PaginateInput!): [Puesto]!
    obtenerPuesto(id: ID!): Puesto

    #permisos
    obtenerPermisos(input: PaginateInput!): [Permiso]!
    obtenerPermiso(id: ID!): Permiso

    #subdirecciones
    obtenerSubdirecciones(input: PaginateInput!): [Subdirection]!
    obtenerSubdireccion(id: ID!): Subdirection

    #sitios
    obtenerSitios(input: PaginateInput!): [Sitio]!
    obtenerSitio(id: ID!): Sitio

    #edificios
    obtenerEdificios(input: PaginateInput!): [Edificio]!
    obtenerEdificio(id: ID!): Edificio

    #tipoorders
    obtenerTipoorders(input: PaginateInput!): [Tipoorder]!
    obtenerTipoorder(id: ID!): Tipoorder

    #acomodosillas
    obtenerAcomodosillas(input: PaginateInput!): [Acomodosilla]!
    obtenerAcomodosilla(id: ID!): Acomodosilla

    #Evidencias
    obtenerEvidencias(input: pedirEvidenciaInput!): [Evidencia]!
    obtenerEvidencia(id: ID!): Evidencia

  }

#mutationes
type Mutation {
  #usuario
    crearUsuario(input: usuarioInput!): Usuario
    login(input: loginInput!): Token
    aprobarUsuario(id: ID!): Boolean
    actualizarUsuario(input: actualizarUsuarioInput!): Boolean!

    #eventos
    crearEvento(input: crearEvento!): Boolean!
    actualizarEvento(input: actualizarEvento!): Boolean!

    #mantenimientos
    crearMantenimiento(input: crearMantenimiento!): Boolean!
    actualizarMantenimiento(input: actualizarMantenimiento!): Boolean!

    #salidas
    crearSalida(input: crearSalida!): Boolean!
    actualizarSalida(input: actualizarSalida!): Boolean!

    #departamentos
    crearDepartamento(input: crearDepartamento!): Boolean!
    actualizarDepartamento(input: actualizarDepartamento!): Boolean!

    #vehiculos
    crearVehiculo(input: crearVehiculo!): Boolean!
    actualizarVehiculo(input: actualizarVehiculo!): Boolean!

    #sitios
    crearSitio(input: crearSitio!): Boolean!
    actualizarSitio(input: actualizarSitio!): Boolean!

    #edificios
    crearEdificio(input: crearEdificio!): Boolean!
    actualizarEdificio(input: actualizarEdificio!): Boolean!

    #subdirecciones
    crearSubdireccion(input: crearSubdireccion!): Boolean!
    actualizarSubdireccion(input: actualizarSubdireccion!): Boolean!

    #acomodosillas
    crearAcomodosilla(input: crearAcomodosilla!): Boolean!
    actualizarAcomodosilla(input: actualizarAcomodosilla!): Boolean!

    #evidencia
    crearEvidencia(input: crearEvidencia!): Boolean!
    actualizarEvidencia(input: actualizarEvidencia!): Boolean!

    #tipoorder
    crearTipoorder(input: crearTipoorder!): Boolean!
    actualizarTipoorder(input: actualizarTipoorder!): Boolean!

    #puesto
    crearPuesto(input: crearPuesto!): Boolean!
    actualizarPuesto(input: actualizarPuesto!): Boolean!

    #permiso
    crearPermiso(input: crearPermiso!): Boolean!
    actualizarPermiso(input: actualizarPermiso!): Boolean!

  }
`;

module.exports = typeDefs;