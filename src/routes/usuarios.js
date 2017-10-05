const express = require('express');
const router = express.Router();


var Usuario = require('../models/usuario');


router.get('/', (req, res) => {
  Usuario.find().then(function(usuarios) {
    res.json(usuarios);
  }, function(err) {
    res.send(err);
  });
});






module.exports = router;
