const express = require('express');
const router = express.Router();

var ReunionSocial = require('../../models/eventosGeo/reunionSocial');


router.get('/', (req, res) => {
  ReunionSocial.find().then(function(reunionesSociales) {
    res.json(reunionesSociales);
  }, function(err) {
    res.send(err);
  });
});



router.post('/', (req, res) => {

  var evento = new ReunionSocial(

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

  ReunionSocial.findByIdAndUpdate(req.params._id,
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
  ReunionSocial.findByIdAndRemove(
    req.params._id
  ).then(function() {
    res.json({
      message: 'Successfully deleted ReunionSocial'
    });
  }, function(err) {
    res.send(err);
  });
});



module.exports = router;
