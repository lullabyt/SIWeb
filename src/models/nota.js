var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var notaSchema = new Schema({

  titulo: {
    type: String,
    required: true
  },
  contenido: {
    type: String,
    required: true
  },
  tipo: String,
  criticidad: String,
  estado: {
    type: String,
    default: 'En curso'
  }

});



// the schema is useless so far
// we need to create a model using it
var Nota = mongoose.model('Nota', notaSchema);

// make this available to our users in our Node applications
module.exports = Nota;
