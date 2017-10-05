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




module.exports = router;
