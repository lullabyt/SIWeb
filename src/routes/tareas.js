const express = require('express');
const router = express.Router();


var Tarea = require('../models/tarea');


router.get('/', (req, res) => {
  Tarea.find().then(function(tareas) {
    res.json(tareas);
  }, function(err) {
    res.send(err);
  });
});



module.exports = router;
