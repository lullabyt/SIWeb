var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var eventoGeoSchema = new Schema({

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
  }

});

//ejemplo geojson
/*
var data = [
  { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 },
  { name: 'Location B', category: 'House', street: 'Broad', lat: 39.284, lng: -75.833 },
  { name: 'Location C', category: 'Office', street: 'South', lat: 39.123, lng: -74.534 }
];
*/


// the schema is useless so far
// we need to create a model using it
var EventoGeo = mongoose.model('EventoGeo', eventoGeoSchema);

// make this available to our users in our Node applications
module.exports = EventoGeo;
