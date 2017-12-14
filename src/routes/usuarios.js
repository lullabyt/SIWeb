const express = require('express');
const router = express.Router();
const passport = require('passport');

var validator = require("email-validator");
var ObjectId = require('mongoose').Types.ObjectId;

var Usuario = require('../models/usuario');


/*
// process the signup form
 router.post('/signup', passport.authenticate('local-signup', {
     successRedirect : '/profile', // redirect to the secure profile section
     failureRedirect : '/signup', // redirect back to the signup page if there is an error
     failureFlash : true // allow flash messages
 }));
*/

router.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }

    if (user === null) {
      //credenciales erroneas
      return res.status(400).send({
        success: false,
        message: info
      });

    }

    // Generate a JSON response reflecting authentication status
    if (user) {
      //usuario ya existe en sistema
      return res.status(200).send({
        success: false,
        message: info
      });

    }

    var newUser = new Usuario(req.body);

    //una vez creada se guarda en la base de datos
    newUser.save().then(function() {
      //  res.json(newUser);


      // ***********************************************************************
      // "Note that when using a custom callback, it becomes the application's
      // responsibility to establish a session (by calling req.login()) and send
      // a response."
      // Source: http://passportjs.org/docs
      // ***********************************************************************

      req.login(newUser, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }

        return res.status(200).send({
          success: true,
          message: 'signup succeeded',
          newUser: newUser
        });
      });

    }, function(err) {
      res.status(400).send(err);
    });

  })(req, res, next);
});

/*

// process the login form
    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
*/
router.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }

    if (user === null) {
      //credenciales erroneas
      return res.status(400).send({
        success: false,
        message: info
      });

    }

    // Generate a JSON response reflecting authentication status
    if (!user) {
      //no se encontro usuario segun credenciales correctas
      return res.status(200).send({
        success: false,
        message: info
      });
    }
    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.status(200).send({
        success: true,
        message: 'authentication succeeded',
        user: user
      });
    });
  })(req, res, next);
});



router.get('/logout', isLoggedIn, function(req, res) {

  req.logout();
  req.flash('success_msg', 'You are logged out.')
  //  res.redirect('/');

  res.status(200).send({
    success: true,
    message: 'You are logged out.'
  });
});



// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {

    return next();
  }
  // if they aren't redirect them to the home page
  //res.redirect('/');

  res.status(200).send({
    success: false,
    message: 'Not logged in'
  });
}



//get todos los usuarios
router.get('/', (req, res) => {
  Usuario.find().then(function(usuarios) {
    res.status(200).json(usuarios);
  }, function(err) {
    res.status(400).send(err);
  });
});


//get todos los datos pertenecientes a un usuario especifico, junto con sus respectivas notas, proyectos y eventos
router.get('/:_id', (req, res) => {

  if (checkObjectId(req.params._id)) {

    Usuario.findById(req.params._id)
      .populate(
        'notas proyectos')
      .populate(
        'eventos.item')
      .then(function(usuario) {
        res.status(200).json(usuario);

      }, function(err) {
        res.status(400).send(err);
      });

  } else {

    res.status(400).send("formato id invalido");
  }

  /*
  test para probar compare password

    Usuario.findOne({
      nombre: 'dsf'
    }, function(err, user) {
      if (err) throw err;

      // test a matching password
      user.comparePassword('Password123', function(err, isMatch) {
        if (err) throw err;
        console.log('Password123:', isMatch); // -&gt; Password123: true
      });

      // test a failing password
      user.comparePassword('123Password', function(err, isMatch) {
        if (err) throw err;
        console.log('123Password:', isMatch); // -&gt; 123Password: false
      });
    });

  */

});



router.post('/', (req, res) => {

  if (req.body.password) {
    if (validator.validate(req.body.email)) {
      if (isValidDate(req.body.fechaNacimiento)) {

        var user = new Usuario(req.body
          /*
          nombre: req.body.nombre,
          apellido: req.body.apellido,
          mail: req.body.mail,
          password: req.body.password,
          telefono: req.body.telefono,
          genero: req.body.genero,
          fechaNacimiento: req.body.fechaNacimiento,
          localidadActual: req.body.localidadActual,
          lugarTrabajo: req.body.lugarTrabajo,
          lugarEstudio: req.body.lugarEstudio
          */
        );

        //una vez creada se guarda en la base de datos
        user.save().then(function() {
          res.status(200).json(user);

        }, function(err) {
          res.status(400).send(err);
        });

      } else {

        res.status(400).send("formato date invalido");
      }

    } else {
      res.status(400).send('Formato mail incorrecto');
    }
  } else {
    res.status(400).send('Password requerida');
  }

});



//para cualquier modifcacion menos contraseñas
router.patch('/:_id', (req, res) => {

  if (checkObjectId(req.params._id)) {

    Usuario.findByIdAndUpdate(req.params._id,
      //solo hace update de los atributos que vengan en body, pueden ser uno o muchos
      req.body, {
        //para que devuelva actualizado
        new: true
      }).then(function(user) {
      res.status(200).json(user);

    }, function(err) {
      res.status(400).send(err);
    });

  } else {

    res.status(400).send("formato id invalido");
  }

});


//para modificar solo contraseñas
router.patch('/password/:_id', (req, res) => {

  if (checkObjectId(req.params._id)) {

    Usuario.findById(req.params._id)
      .then(function(user) {

        user.password = req.body.password;

        user.save().then(function() {
          res.status(200).json(user);

        }, function(err) {
          res.status(400).send(err);
        });

      }, function(err) {
        res.status(400).send(err);
      });

  } else {

    res.status(400).send("formato id invalido");
  }

});


router.delete('/:_id', (req, res) => {

  if (checkObjectId(req.params._id)) {

    Usuario.findByIdAndRemove(
      req.params._id
    ).then(function(result) {
      res.status(200).json({
        message: 'Successfully deleted usuario (sus creaciones persisten)',
        result
      });
    }, function(err) {
      res.status(400).send(err);
    });
  } else {

    res.status(400).send("formato id invalido");
  }

});



// funcion que verifica formato ObjectId

const checkObjectId = function(id) {

  if (ObjectId.isValid(id)) {

    var prueba = new ObjectId(id);

    if (prueba == id) {
      return true

    } else {
      return false
    }

  } else {
    return false
  }

};


const isValidDate = function(dateString) {

  if (dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false; // Invalid format
    var d = new Date(dateString);
    if (!d.getTime()) return false; // Invalid date (or this could be epoch)
    return d.toISOString().slice(0, 10) === dateString;
  } else {
    return false;
  }

}


module.exports = router;