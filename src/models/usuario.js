var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({

  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  telefono: String,
  genero: String,
  fechaNacimiento: {
    type: Date,
    required: true
  },
  localidadActual: {
    type: String,
    required: true
  },
  lugarTrabajo: String,
  lugarEstudio: String,

  notas: [{
    type: Schema.ObjectId,
    ref: "Nota"
  }],

  //cualquier eventoGeo
  eventos: [{
    kind: String,
    item: {
      type: Schema.ObjectId,
      refPath: "eventos.kind"
    }

  }],

  proyectos: [{
    type: Schema.ObjectId,
    ref: "Proyecto"
  }]


});


// the schema is useless so far
// we need to create a model using it
var Usuario = mongoose.model('Usuario', usuarioSchema);

// make this available to our users in our Node applications
module.exports = Usuario;
