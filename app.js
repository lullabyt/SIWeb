// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');




// Get our API routes
const eventos = require('./src/routes/eventos');
const notas = require('./src/routes/notas');
const proyectos = require('./src/routes/proyectos');
const tareas = require('./src/routes/tareas');
const etapas = require('./src/routes/etapas');


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


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Set our api routes
app.use('/eventos', eventos);
app.use('/notas', notas);
app.use('/proyectos', proyectos);
app.use('/tareas', tareas);
app.use('/etapas', etapas);


// Catch all other routes and return the index file
app.get('*', (req, res) => {
  //Agregar cuando este angular!!
  //res.sendFile(path.join(__dirname, 'dist/index.html'));
  res.json({
        message: 'Bienvenido a la aplicacion!'
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
