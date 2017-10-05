const express = require('express');
const router = express.Router();

var ReunionLaboral = require('../../models/eventosGeo/reunionLaboral');


router.get('/', (req, res) => {
  ReunionLaboral.find().then(function(reunionesLaborales) {
    res.json(reunionesLaborales);
  }, function(err) {
    res.send(err);
  });
});




module.exports = router;
