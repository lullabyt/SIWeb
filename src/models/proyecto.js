var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var proyectoSchema = new Schema({

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
  criticidad: String,
  objetivos: [String],
  fechaInicio: {
    type: Date,
    //required: true
  },
  fechaFin: Date,
  participantes: [String],
  estado: {
    type: String,
    default: 'En curso'
  },

  tareas: [{
    type: Schema.ObjectId,
    ref: "Tarea"
  }],

  etapas: [{
    type: Schema.ObjectId,
    ref: "Etapa"
  }]

});



// the schema is useless so far
// we need to create a model using it
var Proyecto = mongoose.model('Proyecto', proyectoSchema);

// make this available to our users in our Node applications
module.exports = Proyecto;
