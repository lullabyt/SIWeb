const express = require('express');
const router = express.Router();


/*

//loggea luego de cualquier interaccion con el router
// middleware to use for all requests

router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

*/


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api funciona correctamente!');
});


module.exports = router;
