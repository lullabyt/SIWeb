var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var etapaSchema = new Schema({

  nombre: {
    type: String,
    required: true
  },
  descripcion: String,
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: {
    type: Date,
    required: true
  },
  numero: Number,
  objetivos: String,
  participantes: String,
  estado: {
    type: String,
    default: 'creada'
  },
  tareas: [{
    type: Schema.ObjectId,
    ref: "Tarea"
  }]

});



// the schema is useless so far
// we need to create a model using it
var Etapa = mongoose.model('Etapa', etapaSchema);

// make this available to our users in our Node applications
module.exports = Etapa;
