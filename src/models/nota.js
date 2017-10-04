var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var notaSchema = new Schema({

});



// the schema is useless so far
// we need to create a model using it
var Nota = mongoose.model('Nota', notaSchema);

// make this available to our users in our Node applications
module.exports = Nota;
