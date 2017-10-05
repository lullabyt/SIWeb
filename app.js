// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');




// Get our API routes
const api = require('./src/routes/api');
const eventosGeo = require('./src/routes/eventosGeo');
const citasMedicas = require('./src/routes/eventosGeo/citasMedicas');
const eventosAcademicos = require('./src/routes/eventosGeo/eventosAcademicos');
const reunionesLaborales = require('./src/routes/eventosGeo/reunionesLaborales');
const reunionesSociales = require('./src/routes/eventosGeo/reunionesSociales');
const notas = require('./src/routes/notas');
const proyectos = require('./src/routes/proyectos');
const tareas = require('./src/routes/tareas');
const etapas = require('./src/routes/etapas');
const usuarios = require('./src/routes/usuarios');


const app = express();


//Import the mongoose module
var mongoose = require('mongoose');

//direccion a la base de datos
var dbURI = 'mongodb://localhost/whatnow';


//para creacion de BD, SACAR DESPUES
var Usuario = require('./src/models/usuario');
var Tarea = require('./src/models/tarea');
var Proyecto = require('./src/models/proyecto');
var Nota = require('./src/models/nota');
var EventoGeo = require('./src/models/eventoGeo');
var Etapa = require('./src/models/etapa');
var ReunionSocial = require('./src/models/eventosGeo/reunionSocial');
var ReunionLaboral = require('./src/models/eventosGeo/reunionLaboral');
var EventoAcademico = require('./src/models/eventosGeo/eventoAcademico');
var CitaMedica = require('./src/models/eventosGeo/citaMedica');



//Set up default mongoose connection
// connect to our database
mongoose.connect(dbURI, {
  keepAlive: true,
  reconnectTries: 10,
  useMongoClient: true
});

//mensajes de conexion
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function() {
  console.log('Conectado a la BD: whatnow');
});
db.on('disconnected', function() {
  console.log('Desconexión de Mongoose');
});


// configure app to use bodyParser()
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));



//para creacion de BD, SACAR DESPUES

for (var i = 0; i < 5; i++) {
  var nota = new Nota({
    titulo: "titulo 1",
    contenido: "algo importante",
    tipo: "Algun tipo",
    criticidad: "alta"
  });
  nota.save().then(function() {
    console.log('Nota saved successfully!');
  }, function(err) {
    console.log(String(err));
  });

  var nota2 = new Nota({
    titulo: "titulo 2",
    contenido: "algo importante",
    tipo: "Algun tipo",
    criticidad: "alta"
  });
  nota2.save().then(function() {
    console.log('Nota saved successfully!');
  }, function(err) {
    console.log(String(err));
  });

  var nota3 = new Nota({
    titulo: "titulo 3",
    contenido: "algo importante",
    tipo: "Algun tipo",
    criticidad: "alta"
  });
  nota3.save().then(function() {
    console.log('Nota saved successfully!');
  }, function(err) {
    console.log(String(err));
  });



  var tarea = new Tarea({
    titulo: "titulo 1",
    contenido: "algun contenido",
    tipo: "Algún tipo",
    criticidad: "alta"
  });
  tarea.save().then(function() {
    console.log('tarea saved successfully!');
  }, function(err) {
    console.log(String(err));
  });
  var tarea2 = new Tarea({
    titulo: "titulo 2",
    contenido: "algun contenido",
    tipo: "Algún tipo",
    criticidad: "alta"
  });
  tarea2.save().then(function() {
    console.log('tarea saved successfully!');
  }, function(err) {
    console.log(String(err));
  });

  var tarea3 = new Tarea({
    titulo: "titulo 3",
    contenido: "algun contenido",
    tipo: "Algún tipo",
    criticidad: "alta"
  });
  tarea3.save().then(function() {
    console.log('tarea saved successfully!');
  }, function(err) {
    console.log(String(err));
  });

  var tarea4 = new Tarea({
    titulo: "titulo 4",
    contenido: "algun contenido",
    tipo: "Algún tipo",
    criticidad: "alta"
  });
  tarea4.save().then(function() {
    console.log('tarea saved successfully!');
  }, function(err) {
    console.log(String(err));
  });



  var etapa = new Etapa({
    nombre: "etapa 1",
    descripcion: "Alguna descripcion",
    fechaInicio: "2017-12-17",
    fechaFin: "2017-12-20",
    numero: 1,
    tareas: [tarea._id, tarea2._id]
  });
  etapa.save().then(function() {
    console.log('etapa saved successfully!');
  }, function(err) {
    console.log(String(err));
  });

  var etapa2 = new Etapa({
    nombre: "etapa 2",
    descripcion: "Alguna descripcion",
    fechaInicio: "2017-12-20",
    fechaFin: "2017-12-31",
    numero: 2,
    tareas: [tarea3._id, tarea4._id]
  });
  etapa2.save().then(function() {
    console.log('etapa saved successfully!');
  }, function(err) {
    console.log(String(err));
  });

  var proyecto = new Proyecto({
    titulo: "Mi proyecto",
    contenido: "algo",
    tipo: "laboral",
    criticidad: "alta",
    fechaInicio: "2017-12-17",
    fechaFin: "2017-12-31",
    etapas: [etapa._id, etapa2._id]
  });

  proyecto.save().then(function() {
    console.log('Proyecto saved successfully!');
  }, function(err) {
    console.log(String(err));
  });


  var citaMedica = new CitaMedica({
    nombre: "visita medica",
    descripcion: 'Alguna descripcion',
    fechaInicio: "2017-12-17",
    datosGeojson: {
      name: "Policlinico Ados",
      category: "clinica",
      city: "Neuquen",
      street: "Av. Argentina 1000",
      lat: -38.95,
      lng: -68.0667
    }
  });

  citaMedica.save().then(function() {
    console.log('citaMedica saved successfully!');
  }, function(err) {
    console.log(String(err));
  });

  var reunionSocial = new ReunionSocial({
    nombre: "visita medica",
    descripcion: 'Alguna descripcion',
    fechaInicio: "2017-12-17",
    datosGeojson: {
      name: "casa de tato",
      category: "casa",
      city: "Neuquen",
      street: "Av. Argentina 1230",
      lat: -38.95,
      lng: -68.0667
    },
    dinero: "$20"
  });

  reunionSocial.save().then(function() {
    console.log('reunionSocial saved successfully!');
  }, function(err) {
    console.log(String(err));
  });

  var usuario = new Usuario({
    nombre: "Juan",
    apellido: "Perez",
    mail: i + "perezcapo@gmail.com",
    password: "hash",
    telefono: "12381313",
    genero: "M",
    fechaNacimiento: "1990-12-17",
    localidadActual: "Neuquen",

    notas: [nota._id, nota2._id, nota3._id],
    eventos: [{
      kind: "CitaMedica",
      item: citaMedica._id
    }, {
      kind: "ReunionSocial",
      item: reunionSocial._id
    }],
    proyectos: [proyecto._id]

  });
  // call the built-in save method to save to the database
  usuario.save().then(function() {
    console.log('Usuario saved successfully!');
  }, function(err) {
    console.log(String(err));
  });


}



// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Set our api routes
app.use('/api', api);
app.use('/api/eventosGeo', eventosGeo);
app.use('/api/eventosGeo/citasMedicas', citasMedicas);
app.use('/api/eventosGeo/eventosAcademicos', eventosAcademicos);
app.use('/api/eventosGeo/reunionesLaborales', reunionesLaborales);
app.use('/api/eventosGeo/reunionesSociales', reunionesSociales);
app.use('/api/notas', notas);
app.use('/api/proyectos', proyectos);
app.use('/api/tareas', tareas);
app.use('/api/etapas', etapas);
app.use('/api/usuarios', usuarios);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  //Agregar cuando este angular!!
  //res.sendFile(path.join(__dirname, 'dist/index.html'));
  res.json({
    message: 'Aqui no hay nada!'
  })
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
