var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var eventoSchema = new Schema({

});



// the schema is useless so far
// we need to create a model using it
var Evento = mongoose.model('Evento', eventoSchema);

// make this available to our users in our Node applications
module.exports = Evento;
