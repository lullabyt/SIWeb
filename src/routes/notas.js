const express = require('express');
const router = express.Router();

var Nota = require('../models/nota');


//ruta
router.route('/')

//Obtener todas las notas existentes
.get('/', (req, res) => {
  Nota.find().then(function(notas) {
    res.json(notas);
  }, function(err) {
    res.send(err);
  });
});


//ALTA NOTA
.post((req, res) => {

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

.put('/:_id',(req, res) => {

  Nota.findById(req.params._id)
    .then(function(nota) {

        if(req.body.titulo){
          nota.titulo= req.body.titulo;
        }
        if(req.body.contenido){
          nota.contenido= req.body.contenido;
        }
        if(req.body.tipo){
          nota.tipo= req.body.tipo;
        }
        if(req.body.criticidad){
          nota.criticidad= req.body.criticidad;
        }

        nota.save().then(function() {
          res.json(nota);

        }, function(err) {
          res.send(err);
          console.log("Error al actualizar la nota");
        });

    }, function(err) {
      res.send(err);
      console.log("Error al encontrar la nota para actualizar");
    });
})


//DELETE UNA NOTA

.delete('/:_id',(req, res) => {

  Nota.findByIdAndRemove(req.params._id)
    .then(function(nota) {
      res.send("Nota eliminada");
    }, function(err) {
      res.send(err);
      console.log("Error al eliminar la nota");
    });
})




/*
//Obtener las notas de un usuario particular
router.get('/:_id', (req, res) => {
  Usuario.find({
      _id: req.params._id
    })
    .populate(
      'notas')
    .then(function(usuario) {
      res.json(usuario);

    }, function(err) {
      res.send(err);
    });
});
*/






module.exports = router;
