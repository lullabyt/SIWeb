const express = require('express');
const router = express.Router();


var Tarea = require('../models/tarea');
var Proyecto = require('../models/proyecto');
var Etapa = require('../models/etapa');


//Obtener todas las tareas existentes
router.get('/', (req, res) => {
  Tarea.find().then(function(tareas) {
    res.json(tareas);
  }, function(err) {
    res.send(err);
  });
});


//ALTA TAREA
router.post('/', (req, res) => {

  var tarea = new Tarea(
    req.body
    /*
        titulo: req.body.titulo,
        contenido: req.body.contenido,
        tipo: req.body.tipo,
        criticidad: req.body.criticidad,
        objetivos: req.body.objetivos,
        participantes: req.body.participantes
        */
  );

  tarea.save().then(function() {
    res.json(tarea);

  }, function(err) {
    res.send(err);
  });
})


//MODIFICACION DE UNA TAREA

router.patch('/:_id', (req, res) => {

  Tarea.findByIdAndUpdate(req.params._id,
    req.body, {
      new: true
    }).then(function(tarea) {
    res.json(tarea);

  }, function(err) {
    res.send(err);
  });
});


//DELETE UNA TAREA

router.delete('/:_id', (req, res) => {

  Tarea.findByIdAndRemove(req.params._id)
    .then(function(tarea) {
      res.json("Tarea eliminada");
    }, function(err) {
      res.send(err);
    });
})



//Obtener las TAREAS de un proyecto particular
router.get('/proyecto/:_id', (req, res) => {
  Proyecto.find({
      _id: req.params._id
    }, "tareas")
    .populate(
      'tareas')
    .then(function(proyecto) {
      res.json(proyecto);

    }, function(err) {
      res.send(err);
    });
})



//Obtener las TAREAS de una etapa particular
router.get('/etapa/:_id', (req, res) => {
  Etapa.find({
      _id: req.params._id
    }, "tareas")
    .populate(
      'tareas')
    .then(function(etapa) {
      res.json(etapa);

    }, function(err) {
      res.send(err);
    });
});



module.exports = router;
