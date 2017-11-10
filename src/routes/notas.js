const express = require('express');
const router = express.Router();

var Nota = require('../models/nota');
var Usuario = require('../models/usuario');


//Obtener todas las notas existentes
router.get('/', (req, res) => {
  Nota.find().then(function(notas) {
    res.json(notas);
  }, function(err) {
    res.send(err);
  });
});



//ALTA NOTA
router.post('/:_id', (req, res) => {

  var nota = new Nota(
    req.body
    /*
    titulo: req.body.titulo,
    contenido: req.body.contenido,
    tipo: req.body.tipo,
    criticidad: req.body.criticidad

    */
  );

  nota.save().then(function() {

    Usuario.findById(
      req.params._id
    ).then(function(usuario) {
      //actualiza la referencia al usuario
      usuario.notas.push(nota._id);
      usuario.save().then(function() {
        res.json(nota);
      }, function(err) {

        //Si no puede actualizar el usuario se debe borrar la nota ya guardada
        /*
        Nota.findByIdAndRemove(
          nota._id
        ).then(function() {
          res.json({
            message: 'No se pudo crear la nota'
          });
        }, function(err) {
          res.send(err);
        });
        */
        res.send(err);
      });
    }, function(err) {
      res.send(err);
    });

  }, function(err) {
    res.send(err);
  });
})



//MODIFICACION DE UNA NOTA

router.patch('/:_id', (req, res) => {

  Nota.findByIdAndUpdate(req.params._id,
    req.body, {
      new: true
    }).then(function(nota) {
    res.json(nota);

  }, function(err) {
    res.send(err);
  });
});


//DELETE UNA NOTA

router.delete('/:_id', (req, res) => {

  Nota.findByIdAndRemove(req.params._id)
    .then(function(nota) {


      Usuario.findByIdAndUpdate(req.query._idUsuario, {
          $pull: {
            notas: req.params._id

          }
        }).then(function() {

          res.json("Nota eliminada");

        })


        .catch((err) => {
          res.send(err);
        });


    }, function(err) {
      res.send(err);
    });
})



//Obtener las notas de un usuario particular
router.get('/usuario/:_id', (req, res) => {
  Usuario.find({
      _id: req.params._id
    }, "notas")
    .populate(
      'notas')
    .then(function(usuario) {
      res.json(usuario);

    }, function(err) {
      res.send(err);
    });
});




module.exports = router;
