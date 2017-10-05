const express = require('express');
const router = express.Router();

var CitaMedica = require('../../models/eventosGeo/citaMedica');


router.get('/', (req, res) => {
  CitaMedica.find().then(function(citasMedicas) {
    res.json(citasMedicas);
  }, function(err) {
    res.send(err);
  });
});




module.exports = router;
