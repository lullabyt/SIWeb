const express = require('express');
const router = express.Router();
const passport = require('passport');

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
    // Generate a JSON response reflecting authentication status

    if (user) {
      return res.send({
        success: false,
        message: 'That email is already taken.'
      });

    }
    console.log(req);
    console.log(req.body);
    console.log("aaasss2" + req.body.password);
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
      console.log("aaa" + req.body);
      req.login(newUser, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        console.log(req.body);
        return res.send({
          success: true,
          message: 'signup succeeded',
          newUser: newUser
        });
      });

    }, function(err) {
      res.send(err);
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
    // Generate a JSON response reflecting authentication status
    if (!user) {
      return res.send({
        success: false,
        message: 'authentication failed'
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
      return res.send({
        success: true,
        message: 'authentication succeeded'
      });
    });
  })(req, res, next);
});



router.get('/logout', isLoggedIn, function(req, res) {

  req.logout();
  //  req.flash('success_msg', 'You are logged out.')
  //  res.redirect('/');

  res.send({
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

  res.send({
    success: false,
    message: 'not logged in'
  });
}



//get todos los usuarios
router.get('/', (req, res) => {
  Usuario.find().then(function(usuarios) {
    res.json(usuarios);
  }, function(err) {
    res.send(err);
  });
});


//get todos los datos pertenecientes a un usuario especifico, junto con sus respectivas notas, proyectos y eventos
router.get('/:_id', (req, res) => {

  Usuario.findById(req.params._id)
    .populate(
      'notas proyectos')
    .populate(
      'eventos.item')
    .then(function(usuario) {
      res.json(usuario);

    }, function(err) {
      res.send(err);
    });

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
    res.json(user);

  }, function(err) {
    res.send(err);
  });
});



//para cualquier modifcacion menos contraseñas
router.patch('/:_id', (req, res) => {

  Usuario.findByIdAndUpdate(req.params._id,
    //solo hace update de los atributos que vengan en body, pueden ser uno o muchos
    req.body, {
      //para que devuelva actualizado
      new: true
    }).then(function(user) {
    res.json(user);

  }, function(err) {
    res.send(err);
  });
});


//para modificar solo contraseñas
router.patch('/password/:_id', (req, res) => {

  Usuario.findById(req.params._id)
    .then(function(user) {

      user.password = req.body.password;

      user.save().then(function() {
        res.json(user);

      }, function(err) {
        res.send(err);
      });

    }, function(err) {
      res.send(err);
    });
});


router.delete('/:_id', (req, res) => {
  Usuario.findByIdAndRemove(
    req.params._id
  ).then(function() {
    res.json({
      message: 'Successfully deleted usuario (sus creaciones persisten)'
    });
  }, function(err) {
    res.send(err);
  });
});



module.exports = router;