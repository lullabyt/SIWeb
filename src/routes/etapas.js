const express = require('express');
const router = express.Router();

var Etapa = require('../models/etapa');


router.get('/', (req, res) => {
  Etapa.find().then(function(etapas) {
    res.json(etapas);
  }, function(err) {
    res.send(err);
  });
});




module.exports = router;
