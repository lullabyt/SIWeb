const express = require('express');
const router = express.Router();

var EventoAcademico = require('../../models/eventosGeo/eventoAcademico');
var Usuario = require('../../models/usuario');



router.get('/', (req, res) => {
  EventoAcademico.find().then(function(eventosAcademicos) {
    res.json(eventosAcademicos);
  }, function(err) {
    res.send(err);
  });
});




router.post('/:_id', (req, res) => {

  var evento = new EventoAcademico(

    req.body

  );

  //una vez creada se guarda en la base de datos
  evento.save().then(function() {
    Usuario.findById(
      req.params._id
    ).then(function(usuario) {
      //actualiza la referencia al usuario
      var event = {
        kind: 'EventoAcademico',
        item: evento._id
      }
      usuario.eventos.push(event);
      usuario.save().then(function() {
        res.json(evento);
      }, function(err) {

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

  EventoAcademico.findByIdAndUpdate(req.params._id,
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
  EventoAcademico.findByIdAndRemove(
    req.params._id
  ).then(function() {

    Usuario.findByIdAndUpdate(req.query._idUsuario, {
        $pull: {
          eventos: req.params._id

        }
      }).then(function() {
        res.json({
          message: 'Successfully deleted EventoAcademico'
        });

      })
      .catch((err) => {
        res.send(err);
      });

  }, function(err) {
    res.send(err);
  });
});



module.exports = router;
