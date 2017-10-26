const express = require('express');
const router = express.Router();


var EventoGeo = require('../models/eventoGeo');



router.get('/', (req, res) => {
  EventoGeo.find().then(function(eventosGeo) {
    res.json(eventosGeo);
  }, function(err) {
    res.send(err);
  });
});



router.post('/', (req, res) => {

  var evento = new EventoGeo(

    req.body

  );

  //una vez creada se guarda en la base de datos
  evento.save().then(function() {
    res.json(evento);

  }, function(err) {
    res.send(err);
  });
});



router.patch('/:_id', (req, res) => {

  EventoGeo.findByIdAndUpdate(req.params._id,
    //solo hace update de los atributos que vengan en body, pueden ser uno o muchos
    req.body, {
      //para que devuelva actualizado
      new: true
    }).then(function(evento) {
    res.json(evento);

  }, function(err) {
    res.send(err);
  });
});



router.delete('/:_id', (req, res) => {
  EventoGeo.findByIdAndRemove(
    req.params._id
  ).then(function() {
    res.json({
      message: 'Successfully deleted eventoGeo'
    });
  }, function(err) {
    res.send(err);
  });
});


module.exports = router;
