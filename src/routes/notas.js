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
router.post((req, res) => {

  var nota = new Nota({
    titulo: req.body.titulo,
    contenido: req.body.contenido,
    tipo: req.body.tipo,
    criticidad: req.body.criticidad
  });

  nota.save().then(function() {
    res.json(nota);

  }, function(err) {
    res.send(err);
    console.log("Error al crear una nota");
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

router.delete('/:_id',(req, res) => {

  Nota.findByIdAndRemove(req.params._id)
    .then(function(nota) {
      res.send("Nota eliminada");
    }, function(err) {
      res.send(err);
      console.log("Error al eliminar la nota");
    });
})







//Obtener las notas de un usuario particular
router.get('/:_id', (req, res) => {
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
