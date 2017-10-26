const express = require('express');
const router = express.Router();

var Etapa = require('../models/etapa');


//get todas las etapas
router.get('/', (req, res) => {
  Etapa.find().then(function(etapas) {
    res.json(etapas);
  }, function(err) {
    res.send(err);
  });
});




router.post('/', (req, res) => {

  var etapa = new Etapa(

    req.body

  );

  //una vez creada se guarda en la base de datos
  etapa.save().then(function() {
    res.json(etapa);

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
