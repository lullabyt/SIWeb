var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var eventoAcademicoSchema = new Schema({

  nombre: {
    type: String,
    required: true
  },
  descripcion: String,
  fechaInicio: {
    type: Date,
    required: true
  },
  fechaFin: Date,
  datosGeojson: {
    name: String,
    category: String,
    city: String,
    street: String,
    lat: Number,
    lng: Number
  },
  tipo: String


});



// the schema is useless so far
// we need to create a model using it
var EventoAcademico = mongoose.model('EventoAcademico', eventoAcademicoSchema);

// make this available to our users in our Node applications
module.exports = EventoAcademico;
