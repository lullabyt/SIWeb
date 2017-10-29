var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var tareaSchema = new Schema({

  titulo: {
    type: String,
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  tipo: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    default: 'pendiente'
  },
  criticidad: String,
  objetivos: String,
  participantes: String


});



// the schema is useless so far
// we need to create a model using it
var Tarea = mongoose.model('Tarea', tareaSchema);

// make this available to our users in our Node applications
module.exports = Tarea;
