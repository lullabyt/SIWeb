var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var proyectoSchema = new Schema({

});



// the schema is useless so far
// we need to create a model using it
var Proyecto = mongoose.model('Proyecto', proyectoSchema);

// make this available to our users in our Node applications
module.exports = Proyecto;
