const express = require('express');
const router = express.Router();


var Evento = require('../models/evento');


router.get('/', (req, res) => {
  Evento.find().then(function(eventos) {
    res.json(eventos);
  }, function(err) {
    res.send(err);
  });
});




module.exports = router;
