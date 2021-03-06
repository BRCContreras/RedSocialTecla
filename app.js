const express = require("express");
const app = express();
require("dotenv").config();
const sequelize = require("./db/conexion");
const userRoutes = require("./view/rutas");
const midd = require("./midd/midd");
const cors = require("cors");
const Usuario = require("./db/usuario");
const Universidad = require("./db/universidad");
const Descripcion = require("./db/descripcion");
const Certificacion = require("./db/certificacion");
const Idioma = require("./db/idioma");

//const serviciosMercadoLibre = require("./services/services");
//const swaggerUi = require('swagger-ui-express')
//const swaggerFile = require('./swagger_output.json')
//const vistaProductos = require('./mvc/vista/vista.producto')

//middleware globales
app.use(express.json());
app.use(midd.limiter);
app.use(cors());
//app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//configuraciones globales
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//iniciar bd
//iniciar servidor
async function inicioServidor() {
  try {
    await Usuario.sync({ alter: true });
    await Universidad.sync({ alter: true });
    await Descripcion.sync({ alter: true });
    await Certificacion.sync({ alter: true });
    await Idioma.sync({  alter: true });
    await sequelize.authenticate();
    //await Usuarios.newUsuario({nombre:'Brandon', apellidos: 'Contreras', email: 'braru@gmail.com',movil: '4652313413', telefono: '5642156023',ciudad:'Mexico',estado:'Mexico', cp:'56460',  contrasena: '123' , usuario: 'braru@gmail.com', fechaAlta:'2022', idEstatus: 2})
    // await Usuarios.newUsuario({nombre:'Dana', apellidos: 'Rivera', email: 'dana@gmail.com',bandera_admin:'2',  contrasena: '123', fechaAlta:'2021', idEstatus: 1})
    //await Usuarios.newUsuario({nombre:'Brandon', apellidos: 'Contreras', email: 'braru@gmail.com',movil: '4652313413', telefono: '5642156023',ciudad:'Mexico',estado:'Mexico', cp:'56460',  contrasena: '123' , usuario: 'braru55', fechaAlta:'2022', idEstatus: 1})

    console.log("Conexi??n correcta con la db");
    app.listen(process.env.PORT, function () {
      console.log(`Servidor iniciado en ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
    console.log("no se pudo conectar con la bd ");
  }
}
inicioServidor();

//Routes
userRoutes(app);
