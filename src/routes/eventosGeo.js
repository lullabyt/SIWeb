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




module.exports = router;
