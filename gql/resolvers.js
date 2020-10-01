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
  
const resolvers = {
    Query: {
      //usuarios
      obtenerUsuarios: (_, args, ctx) => usuarioController.obtenerUsuarios(args.input, ctx),
      obtenerUsuario: (_, args, ctx) => usuarioController.obtenerUsuario(args.id, ctx),

      //eventos
      obtenerEventos: (_, args, ctx) => eventoController.obtenerEventos(args.input, ctx),
      obtenerEvento: (_, args, ctx) => eventoController.obtenerEvento(args.id, ctx),

      //mantenimientos
      obtenerReparaciones: (_, args, ctx) => mantenimientoController.obtenerReparaciones(args.input, ctx),
      obtenerServicios: (_, args, ctx) => mantenimientoController.obtenerServicios(args.input, ctx),
      obtenerTransportes: (_, args, ctx) => mantenimientoController.obtenerTransportes(args.input, ctx),
      obtenerMantenimiento: (_, args, ctx) => mantenimientoController.obtenerMantenimiento(args.id, ctx),

      //salidas
      obtenerSalidas: (_, args, ctx) => salidaController.obtenerSalidas(args.input, ctx),
      obtenerSalida: (_, args, ctx) => salidaController.obtenerSalida(args.id, ctx),

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
      obtenerAcomodosilla: (_, args, ctx) => acomodosillaController.obtenerAcomodosilla(args.id),

      //evidencias
      obtenerEvidencias: (_, args, ctx) => evidenciaController.obtenerEvidencias(args.input, ctx),
      obtenerEvidencia: (_, args, ctx) => evidenciaController.obtenerEvidencia(args.id, ctx),

      //puestos
      obtenerPuestos: (_, args, ctx) => puestoController.obtenerPuestos(args.input, ctx),
      obtenerPuesto: (_, args, ctx) => puestoController.obtenerPuesto(args.id, ctx),

      //permisos
      obtenerPermisos: (_, args, ctx) => permisoController.obtenerPermisos(args.input, ctx),
      obtenerPermiso: (_, args, ctx) => permisoController.obtenerPermiso(args.id, ctx),
      
    },
    Mutation: {
        //usuarios
        crearUsuario: (parent, args, context) => usuarioController.crearUsuario(args.input),
        login: (parent, args, context) => usuarioController.login(args.input),
        aprobarUsuario: (parent, args, context) => usuarioController.aprobarUsuario(args.id),
        actualizarUsuario: (parent, args, context) => usuarioController.actualizarUsuario(args.input, context),

        //eventos
        crearEvento: (_, args, ctx) => eventoController.crearEvento(args.input, ctx),
        actualizarEvento: (_, args, ctx) => eventoController.actualizarEvento(args.id, args.input, ctx),

        //mantenimientos
        crearMantenimiento: (_, args, ctx) => mantenimientoController.crearMantenimiento(args.input, ctx),
        actualizarMantenimiento: (_, args, ctx) => mantenimientoController.actualizarMantenimiento(args.id, args.input, ctx),

        //salidas
        crearSalida: (_, args, ctx) => salidaController.crearSalida(args.input, ctx),
        actualizarSalida: (_, args, ctx) => salidaController.actualizarSalida(args.id, args.input, ctx),
        

        //departamentos
        crearDepartamento: (_, args, ctx) => departamentoController.crearDepartamento(args.input, ctx),
        actualizarDepartamento: (_, args, ctx) => departamentoController.actualizarDepartamento(args.input, ctx),

        //vehiculos
        crearVehiculo: (_, args, ctx) => vehiculoController.crearVehiculo(args.input, ctx),
        actualizarVehiculo: (_, args, ctx) => vehiculoController.actualizarVehiculo(args.input, ctx),

        //sitios
        crearSitio: (_, args, ctx) => sitioController.crearSitio(args.input, ctx),
        actualizarSitio: (_, args, ctx) => sitioController.actualizarSitio(args.input, ctx),

        //edificios
        crearEdificio: (_, args, ctx) => edificioController.crearEdificio(args.input, ctx),
        actualizarEdificio: (_, args, ctx) => edificioController.actualizarEdificio(args.input, ctx),

        //subdirecciones
        crearSubdireccion: (_, args, ctx) => subdireccionController.crearSubdireccion(args.input, ctx),
        actualizarSubdireccion: (_, args, ctx) => subdireccionController.actualizarSubdireccion(args.input, ctx),

        //tipoorders
        crearTipoorder: (_, args, ctx) => tipoorderController.crearTipoOrder(args.input, ctx),
        actualizarTipoorder: (_, args, ctx) => tipoorderController.actualizarTipoOrder(args.input, ctx),

        //acomodosillas
        crearAcomodosilla: (_, args, ctx) => acomodosillaController.crearAcomodosilla(args.input, ctx),
        actualizarAcomodosilla: (_, args, ctx) => acomodosillaController.actualizarAcomodosilla(args.input, ctx),

        //evidencias
        crearEvidencia: (_, args, ctx) => evidenciaController.crearEvidencia(args.input, ctx),
        actualizarEvidencia: (_, args, ctx) => evidenciaController.actualizarEvidencia(args.input, ctx),

        //puesto
        crearPuesto: (_, args, ctx) => puestoController.crearPuesto(args.input, ctx),
        actualizarPuesto: (_, args, ctx) => puestoController.actualizarPuesto(args.input, ctx),

        //permiso
        crearPermiso: (_, args, ctx) => permisoController.crearPermiso(args.input, ctx),
        actualizarPermiso: (_, args, ctx) => permisoController.actualizarPermiso(args.input, ctx),


    },
  };

  module.exports = resolvers;
