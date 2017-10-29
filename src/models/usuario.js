var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

//para hash contraseñas
var bcrypt = require('bcrypt');
const saltRounds = 10;


var usuarioSchema = new Schema({

  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  telefono: String,
  genero: String,
  fechaNacimiento: {
    type: Date,
    required: true
  },
  localidadActual: {
    type: String,
    required: true
  },
  lugarTrabajo: String,
  lugarEstudio: String,

  notas: [{
    type: Schema.ObjectId,
    ref: "Nota"
  }],

  //cualquier eventoGeo
  eventos: [{
    kind: String,
    item: {
      type: Schema.ObjectId,
      refPath: "eventos.kind"
    }

  }],

  proyectos: [{
    type: Schema.ObjectId,
    ref: "Proyecto"
  }]


});


//manejo de contraseña post
usuarioSchema.pre('validate', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(saltRounds).then(function(salt) {

      // hash the password using our new salt
      bcrypt.hash(user.password, salt).then(function(hash) {

        // override the cleartext password with the hashed one
        user.password = hash;
        next();

      })
    })
    .catch(err => next(err));
});



usuarioSchema.methods.comparePassword = function(candidatePassword, cb) {

  bcrypt.compare(candidatePassword, this.password).then(function(isMatch) {

    cb(null, isMatch);
  }, function(err) {
    cb(err);
  });
};



// the schema is useless so far
// we need to create a model using it
var Usuario = mongoose.model('Usuario', usuarioSchema);

// make this available to our users in our Node applications
module.exports = Usuario;
