const express = require('express');
const router = express.Router();

var EventoAcademico = require('../../models/eventosGeo/eventoAcademico');


router.get('/', (req, res) => {
  EventoAcademico.find().then(function(eventosAcademicos) {
    res.json(eventosAcademicos);
  }, function(err) {
    res.send(err);
  });
});




module.exports = router;
