const express = require('express');
const router = express.Router();


var EventoGeo = require('../models/eventoGeo');
var Usuario = require('../models/usuario');


router.get('/', (req, res) => {
  EventoGeo.find().then(function(eventosGeo) {
    res.json(eventosGeo);
  }, function(err) {
    res.send(err);
  });
});

//Obtener los eventos de un usuario particular - no importa el tipo
router.get('/usuario/:_id', (req, res) => {
  Usuario.find({
      _id: req.params._id
    }, "eventos")
    .populate(
      'eventos')
    .then(function(usuario) {
      res.json(usuario);

    }, function(err) {
      res.send(err);
    });
});

router.post('/:_id', (req, res) => {

  var evento = new EventoGeo(

    req.body

  );

  //una vez creada se guarda en la base de datos
  evento.save().then(function() {

    Usuario.findById(
        req.params._id
      ).then(function(usuario) {
        //actualiza la referencia al usuario
        var event = {
          kind: 'eventoGeo',
          item: evento._id
        }
        usuario.eventos.push(event);
        usuario.save().then(function(){
            res.json(evento);
        }, function(err){

          //Si no puede actualizar el usuario se debe borrar el evento ya guardado
          /*
          Evento.findByIdAndRemove(
            evento._id
          ).then(function() {
            res.json({
              message: 'No se pudo crear el evento'
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
