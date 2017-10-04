const express = require('express');
const router = express.Router();

var Nota = require('../models/nota');


router.get('/', (req, res) => {
  Nota.find().then(function(notas) {
    res.json(notas);
  }, function(err) {
    res.send(err);
  });
});






module.exports = router;
