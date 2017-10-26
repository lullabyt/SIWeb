const express = require('express');
const router = express.Router();


var Usuario = require('../models/usuario');


router.get('/', (req, res) => {
  Usuario.find().then(function(usuarios) {
    res.json(usuarios);
  }, function(err) {
    res.send(err);
  });
});


//get todos los datos pertenecientes a un usuario especifico, junto con sus respectivas notas y proyectos
router.get('/:_id', (req, res) => {

  Usuario.findById(req.params._id)
    .populate(
      'notas proyectos')
    .populate(
      'eventos.item')
    .then(function(usuario) {
      res.json(usuario);

    }, function(err) {
      res.send(err);
    });

  /*

  test para probar compare password

    Usuario.findOne({
      nombre: 'dsf'
    }, function(err, user) {
      if (err) throw err;

      // test a matching password
      user.comparePassword('Password123', function(err, isMatch) {
        if (err) throw err;
        console.log('Password123:', isMatch); // -&gt; Password123: true
      });

      // test a failing password
      user.comparePassword('123Password', function(err, isMatch) {
        if (err) throw err;
        console.log('123Password:', isMatch); // -&gt; 123Password: false
      });
    });

  */

});



router.post('/', (req, res) => {

  var user = new Usuario(req.body
    /*
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    mail: req.body.mail,
    password: req.body.password,
    telefono: req.body.telefono,
    genero: req.body.genero,
    fechaNacimiento: req.body.fechaNacimiento,
    localidadActual: req.body.localidadActual,
    lugarTrabajo: req.body.lugarTrabajo,
    lugarEstudio: req.body.lugarEstudio
    */
  );

  //una vez creada se guarda en la base de datos
  user.save().then(function() {
    res.json(user);

  }, function(err) {
    res.send(err);
  });
});



//para cualquier modifcacion menos contraseñas
router.patch('/:_id', (req, res) => {

  Usuario.findByIdAndUpdate(req.params._id,
    //solo hace update de los atributos que vengan en body, pueden ser uno o muchos
    req.body, {
      //para que devuelva actualizado
      new: true
    }).then(function(user) {
    res.json(user);

  }, function(err) {
    res.send(err);
  });
});


//para modificar solo contraseñas
router.patch('/password/:_id', (req, res) => {

  Usuario.findById(req.params._id)
    .then(function(user) {

      user.password = req.body.password;

      user.save().then(function() {
        res.json(user);

      }, function(err) {
        res.send(err);
      });

    }, function(err) {
      res.send(err);
    });
});


router.delete('/:_id', (req, res) => {
  Usuario.findByIdAndRemove(
    req.params._id
  ).then(function() {
    res.json({
      message: 'Successfully deleted usuario'
    });
  }, function(err) {
    res.send(err);
  });
});



module.exports = router;
