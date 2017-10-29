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


//ALTA TAREA DE UN PROYECTO
router.post('/proyecto/:_id', (req, res) => {

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

    Proyecto.findById(
        req.params._id
      ).then(function(proyecto) {
        //actualiza la referencia al usuario
        proyecto.tareas.push(tarea._id);
        proyecto.save().then(function(){
            res.json(tarea);
        }, function(err){

          //Si no puede actualizar el usuario se debe borrar la tarea ya guardada
          /*
          Nota.findByIdAndRemove(
            tarea._id
          ).then(function() {
            res.json({
              message: 'No se pudo crear la tarea'
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

//ALTA TAREA DE UNA ETAPA

router.post('/etapa/:_id', (req, res) => {

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

    Etapa.findById(
        req.params._id
      ).then(function(etapa) {
        //actualiza la referencia al usuario
        etapa.tareas.push(tarea._id);
        etapa.save().then(function(){
            res.json(tarea);
        }, function(err){

          //Si no puede actualizar el usuario se debe borrar la tarea ya guardada
          /*
          Nota.findByIdAndRemove(
            tarea._id
          ).then(function() {
            res.json({
              message: 'No se pudo crear la tarea'
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
