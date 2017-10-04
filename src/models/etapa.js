var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var etapaSchema = new Schema({

});



// the schema is useless so far
// we need to create a model using it
var Etapa = mongoose.model('Etapa', etapaSchema);

// make this available to our users in our Node applications
module.exports = Etapa;
