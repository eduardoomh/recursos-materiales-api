const usuarioController = require("../controllers/usuario");
const eventoController = require("../controllers/evento");
const mantenimientoController = require("../controllers/Mantenimiento");
const salidaController = require("../controllers/salida");
const departamentoController = require("../controllers/departamento");
const vehiculoController = require("../controllers/vehiculo");
const edificioController = require("../controllers/edificio");
const sitioController = require("../controllers/sitio");
const subdireccionController = require("../controllers/subdirection");
const tipoorderController = require("../controllers/tipoorder");
const acomodosillaController = require("../controllers/acomodosilla");
const evidenciaController = require("../controllers/evidencia");
const puestoController = require("../controllers/puesto");
const permisoController = require("../controllers/permiso");
const generalController = require("../controllers/general");
  
const resolvers = {
    Query: {
      //usuarios
      obtenerUsuarios: (_, {input, filtro}, ctx) => usuarioController.obtenerUsuarios(input, filtro, ctx),
      obtenerUsuario: (_, args, ctx) => usuarioController.obtenerUsuario(args.id, ctx),

      //eventos
      obtenerEventos: (_, args, ctx) => eventoController.obtenerEventos(args.input, ctx),
      obtenerEvento: (_, args, ctx) => eventoController.obtenerEvento(args.id, ctx),
      buscarEvento: (_, args, ctx) => eventoController.buscarEvento(args.search, ctx),
      eventoFechas: (_, args, ctx) => eventoController.eventoFechas(args.input, ctx),
      obtenerEventosFiltro: (_, {input, filtro}, ctx) => eventoController.obtenerEventosFiltro(input, filtro, ctx),

      //mantenimientos
      obtenerReparaciones: (_, args, ctx) => mantenimientoController.obtenerReparaciones(args.input, ctx),
      obtenerServicios: (_, args, ctx) => mantenimientoController.obtenerServicios(args.input, ctx),
      obtenerTransportes: (_, args, ctx) => mantenimientoController.obtenerTransportes(args.input, ctx),
      obtenerMantenimiento: (_, args, ctx) => mantenimientoController.obtenerMantenimiento(args.id, ctx),
      buscarMantenimiento: (_, args, ctx) => mantenimientoController.buscarMantenimiento(args.search, ctx),
      mantenimientoFechas: (_, args, ctx) => mantenimientoController.mantenimientoFechas(args.input, ctx),
      obtenerMantenimientosFiltro: (_, {input, filtro}, ctx) => mantenimientoController.obtenerMantenimientosFiltro(input, filtro, ctx),

      //salidas
      obtenerSalidas: (_, args, ctx) => salidaController.obtenerSalidas(args.input, ctx),
      obtenerSalida: (_, args, ctx) => salidaController.obtenerSalida(args.id, ctx),
      buscarSalida: (_, args, ctx) => salidaController.buscarSalida(args.search, ctx),
      obtenerSalidasFiltro: (_, {input, filtro}, ctx) => salidaController.obtenerSalidasFiltro(input, filtro, ctx),

      //solicitudes generales
      solicitudesHoy: (_, args, ctx) => generalController.solicitudesHoy(args.input, ctx),

      //departamentos
      obtenerDepartamentos: (_, args, ctx) => departamentoController.obtenerDepartamentos(args.input, ctx),
      obtenerDepartamento: (_, args, ctx) => departamentoController.obtenerDepartamento(args.id, ctx),

      //vehiculos
      obtenerVehiculos: (_, args, ctx) => vehiculoController.obtenerVehiculos(args.input, ctx),
      obtenerVehiculo: (_, args, ctx) => vehiculoController.obtenerVehiculo(args.id, ctx),

      //edificios
      obtenerEdificios: (_, args, ctx) => edificioController.obtenerEdificios(args.input, ctx),
      obtenerEdificio: (_, args, ctx) => edificioController.obtenerEdificio(args.id, ctx),

      //sitios
      obtenerSitios: (_, args, ctx) => sitioController.obtenerSitios(args.input, ctx),
      obtenerSitio: (_, args, ctx) => sitioController.obtenerSitio(args.id, ctx),

      //subdirecciones
      obtenerSubdirecciones: (_, args, ctx) => subdireccionController.obtenerSubdirecciones(args.input, ctx),
      obtenerSubdireccion: (_, args, ctx) => subdireccionController.obtenerSubdireccion(args.id, ctx),

      //tipoorders
      obtenerTipoorders: (_, args, ctx) => tipoorderController.obtenerTipoOrders(args.input, ctx),
      obtenerTipoorder: (_, args, ctx) => tipoorderController.obtenerTipoOrder(args.id, ctx),

      //acomodosillas
      obtenerAcomodosillas: (_, args, ctx) => acomodosillaController.obtenerAcomodosillas(args.input, ctx),
      obtenerAcomodosilla: (_, args, ctx) => acomodosillaController.obtenerAcomodosilla(args.id, ctx),

      //evidencias
      obtenerEvidencias: (_, args, ctx) => evidenciaController.obtenerEvidencias(args.input, ctx),
      obtenerEvidencia: (_, args, ctx) => evidenciaController.obtenerEvidencia(args.id, ctx),

      //puestos
      obtenerPuestos: (_, args, ctx) => puestoController.obtenerPuestos(args.input, ctx),
      obtenerPuesto: (_, args, ctx) => puestoController.obtenerPuesto(args.id, ctx),

      //permisos
      obtenerPermisos: (_, args, ctx) => permisoController.obtenerPermisos(args.input, ctx),
      obtenerPermiso: (_, args, ctx) => permisoController.obtenerPermiso(args.id, ctx),
      obtenerPermisoUsuario: (_, args, ctx) => permisoController.obtenerPermisoUsuario(args.id, ctx)
      
    },
    Mutation: {
        //usuarios
        crearUsuario: (parent, args, context) => usuarioController.crearUsuario(args.input),
        login: (parent, args, context) => usuarioController.login(args.input),
        modificarUsuarios: (_, {id, input}, ctx) => usuarioController.modificarUsuarios(id, input, ctx),
        actualizarUsuario: (parent, args, context) => usuarioController.actualizarUsuario(args.input, context),
        actualizarAvatar: (_, {file}, ctx) => usuarioController.actualizarAvatar(file, ctx),

        //eventos
        crearEvento: (_, args, ctx) => eventoController.crearEvento(args.input, ctx),
        actualizarEvento: (_, {id, input}, ctx) => eventoController.actualizarEvento(id, input, ctx),
        aprobarEvento: (_, {id, input, contrasena}, ctx) => eventoController.aprobarEvento(id, input, contrasena, ctx),
        borrarEvento: (_, args, ctx) => eventoController.borrarEvento(args.id, ctx),

        //mantenimientos
        crearMantenimiento: (_, args, ctx) => mantenimientoController.crearMantenimiento(args.input, ctx),
        actualizarMantenimiento: (_, {id, input}, ctx) => mantenimientoController.actualizarMantenimiento(id, input, ctx),
        aprobarMantenimiento: (_, {id, input, contrasena}, ctx) => mantenimientoController.aprobarMantenimiento(id, input, contrasena, ctx),
        borrarMantenimiento: (_, args, ctx) => mantenimientoController.borrarMantenimiento(args.id, ctx),

        //salidas
        crearSalida: (_, args, ctx) => salidaController.crearSalida(args.input, ctx),
        actualizarSalida: (_, {id, input}, ctx) => salidaController.actualizarSalida(id, input, ctx),
        borrarSalida: (_, args, ctx) => salidaController.borrarSalida(args.id, ctx),
        

        //departamentos
        crearDepartamento: (_, args, ctx) => departamentoController.crearDepartamento(args.input, ctx),
        actualizarDepartamento: (_, {id, input}, ctx) => departamentoController.actualizarDepartamento(id, input, ctx),
        borrarDepartamento: (_, {id}, ctx) => departamentoController.borrarDepartamento(id, ctx),

        //vehiculos
        crearVehiculo: (_, args, ctx) => vehiculoController.crearVehiculo(args.input, ctx),
        actualizarVehiculo: (_, {id, input}, ctx) => vehiculoController.actualizarVehiculo(id, input, ctx),
        borrarVehiculo: (_, {id}, ctx) => vehiculoController.borrarVehiculo(id, ctx),

        //sitios
        crearSitio: (_, args, ctx) => sitioController.crearSitio(args.input, ctx),
        actualizarSitio: (_, {id, input}, ctx) => sitioController.actualizarSitio(id, input, ctx),
        borrarSitio: (_, {id}, ctx) => sitioController.borrarSitio(id, ctx),

        //edificios
        crearEdificio: (_, args, ctx) => edificioController.crearEdificio(args.input, ctx),
        actualizarEdificio: (_, {id, input}, ctx) => edificioController.actualizarEdificio(id, input, ctx),
        borrarEdificio: (_, {id}, ctx) => edificioController.borrarEdificio(id, ctx),

        //subdirecciones
        crearSubdireccion: (_, args, ctx) => subdireccionController.crearSubdireccion(args.input, ctx),
        actualizarSubdireccion: (_, {id, input}, ctx) => subdireccionController.actualizarSubdireccion(id, input, ctx),
        borrarSubdireccion: (_, {id}, ctx) => subdireccionController.borrarSubdireccion(id, ctx),

        //tipoorders
        crearTipoorder: (_, args, ctx) => tipoorderController.crearTipoOrder(args.input, ctx),
        actualizarTipoorder: (_, {id, input}, ctx) => tipoorderController.actualizarTipoOrder(id, input, ctx),
        borrarTipoorder: (_, {id}, ctx) => tipoorderController.borrarTipoOrder(id, ctx),

        //acomodosillas
        crearAcomodosilla: (_, args, ctx) => acomodosillaController.crearAcomodosilla(args.input, ctx),
        actualizarAcomodosilla: (_, {id, input}, ctx) => acomodosillaController.actualizarAcomodosilla(id, input, ctx),
        borrarAcomodosilla: (_, {id}, ctx) => acomodosillaController.borrarAcomodosilla(id, ctx),

        //evidencias
        crearEvidencia: (_, {file, input}, ctx) => evidenciaController.crearEvidencia(file, input, ctx),
        actualizarEvidencia: (_, args, ctx) => evidenciaController.actualizarEvidencia(args.input, ctx),
        borrarEvidencia: (_, args, ctx) => evidenciaController.borrarEvidencia(args.id, ctx),
      
        //puesto
        crearPuesto: (_, args, ctx) => puestoController.crearPuesto(args.input, ctx),
        actualizarPuesto: (_, {id, input}, ctx) => puestoController.actualizarPuesto(id, input, ctx),
        borrarPuesto: (_, {id}, ctx) => puestoController.borrarPuesto(id, ctx),

        //permiso
        crearPermiso: (_, args, ctx) => permisoController.crearPermiso(args.input, ctx),
        actualizarPermiso: (_, {id, input}, ctx) => permisoController.actualizarPermiso(id, input, ctx),
        borrarPermiso: (_, {id}, ctx) => permisoController.borrarPermiso(id, ctx)


    },
  };

  module.exports = resolvers;
