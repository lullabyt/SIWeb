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


/*
router.get('/map', (req, res) => {

  const urlAsignacion = 'https://maps.googleapis.com/maps/api/geocode/json';
  req.query = {
    address: 'Eva Peron y Luis Beltran,Neuquen,Neuquen',
    key: 'AIzaSyCePtdONf9QH13km56WgDWeMuZIsVVsIoY'
  };
  getContentQuery(urlAsignacion, req.query)
    .then((asig) => {
      res.json(asig);
    })
    .catch((err) => res.send(err));
});

const getContentQuery = function(url, queryData) {
  // return new pending promise
  console.log(url);
  return new Promise((resolve, reject) => {

    var options = {
      method: 'get',
      qs: queryData, // Javascript object
      json: true, // Use,If you are sending JSON data
      url: url
    };

    request(options, (err, response, body) => {
      // handle http errors
      if (err) {
        reject(err);
      }

      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load page, status code: ' + response.statusCode));
      }
      //devuelve respuesta post
      resolve(body);

    });

  })
};
*/

module.exports = router;
