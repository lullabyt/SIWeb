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
  console.log('Conectado a la BD: ' + dbURI);
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
