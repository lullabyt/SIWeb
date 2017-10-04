const express = require('express');
const router = express.Router();


var Proyecto = require('../models/proyecto');


router.get('/', (req, res) => {
  Proyecto.find().then(function(proyectos) {
    res.json(proyectos);
  }, function(err) {
    res.send(err);
  });
});






module.exports = router;
