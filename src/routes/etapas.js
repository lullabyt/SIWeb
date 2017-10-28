const express = require('express');
const router = express.Router();

var Etapa = require('../models/etapa');
var Proyecto = require('../models/proyecto');


//get todas las etapas
router.get('/', (req, res) => {
  Etapa.find().then(function(etapas) {
    res.json(etapas);
  }, function(err) {
    res.send(err);
  });
});

//Obtener las etapas de un proyecto particular
router.get('/proyecto/:_id', (req, res) => {
  Proyecto.find({
      _id: req.params._id
    }, "etapas")
    .populate(
      'etapas')
    .then(function(proyecto) {
      res.json(proyecto);

    }, function(err) {
      res.send(err);
    });
});


router.post('/:_id', (req, res) => {

  var etapa = new Etapa(

    req.body

  );

  //una vez creada se guarda en la base de datos
  etapa.save().then(function() {

    Proyecto.findById(
        req.params._id
      ).then(function(proyecto) {
        //actualiza la referencia al usuario
        proyecto.etapas.push(etapa._id);
        proyecto.save().then(function(){
            res.json(etapa);
        }, function(err){

          //Si no puede actualizar el usuario se debe borrar la etapa ya guardada
          /*
          Etapa.findByIdAndRemove(
            etapa._id
          ).then(function() {
            res.json({
              message: 'No se pudo crear la etapa'
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
});



router.patch('/:_id', (req, res) => {

  Etapa.findByIdAndUpdate(req.params._id,
    //solo hace update de los atributos que vengan en body, pueden ser uno o muchos
    req.body, {
      //para que devuelva actualizado
      new: true
    }).then(function(etapa) {
    res.json(etapa);

  }, function(err) {
    res.send(err);
  });
});



router.delete('/:_id', (req, res) => {
  Proyecto.findByIdAndRemove(
    req.params._id
  ).then(function() {
    res.json({
      message: 'Successfully deleted etapa'
    });
  }, function(err) {
    res.send(err);
  });
});



module.exports = router;
