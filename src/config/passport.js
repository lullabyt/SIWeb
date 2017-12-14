// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
const VariablesGlobales = require('../utiles/variablesGlobales');
var validator = require("email-validator");

// load up the user model
var User = require('../models/usuario');

var Pass = function(passport) {

  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {

    User.findById(id)
      .then(function(user) {
        done(null, user);
      }, function(err) {
        done(err);

      });

    /*
    User.findById(id, function(err, user) {
      done(err, user);
    });
*/

  });

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {


      if (password) {
        if (validator.validate(email)) {
          // asynchronous
          // User.findOne wont fire unless data is sent back
          process.nextTick(function() {

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({
              'email': email
            }).then(function(user) {

                // check to see if theres already a user with that email
                if (user) {
                  req.flash('signupMessage', 'That email is already taken.')
                  return done(null, user, 'Ese email ya ha sido tomado.');
                } else {
                  return done(null, false);
                  // if there is no user with that email
                  // create the user
                  /*
                                      const urlUsuario = VariablesGlobales.BASE_API_URL + '/api/usuarios';

                                      postContent(urlUsuario, req.body, req.headers)
                                        .then((user) =>
                                          return done(null, user);

                                          .catch((err) =>
                                            throw err);
                  */
                  /*
            var newUser = new User();

            // set the user's local credentials
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);

            // save the user
            newUser.save(function(err) {
              if (err)
                throw err;
              return done(null, newUser);
            });
*/

                }

              },
              function(err) {
                // if there are any errors, return the error
                return done(err);
              });

          });
        } else {
          return done(null, null, 'Formato mail incorrecto');
        }
      } else {
        return done(null, null, 'Password requerida');
      }
    }));



  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  passport.use('local-login', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

      if (password) {
        if (validator.validate(email)) {

          // find a user whose email is the same as the forms email
          // we are checking to see if the user trying to login already exists
          User.findOne({
              'email': email
            }).populate(
              'notas proyectos')
            .populate(
              'eventos.item')
            .then(function(user) {

                // if no user is found, return the message
                if (!user) {
                  req.flash('loginMessage', 'No user found.');
                  return done(null, false, 'Ningun usuario encontrado.'); // req.flash is the way to set flashdata using connect-flash
                } else {

                  // test a matching password
                  user.comparePassword(password, function(err, isMatch) {
                    if (err) throw err;

                    if (!isMatch) {
                      req.flash('loginMessage', 'Oops! Wrong password.');
                      return done(null, false, 'Contraseña equivocada.'); // create the loginMessage and save it to session as flashdata

                      /*
                              // if the user is found but the password is wrong
                              if (!user.comparePassword(req.body.password)){
                              */
                    } else {
                      // all is well, return successful user
                      return done(null, user);

                    }

                  });

                }

              },
              function(err) {
                // if there are any errors, return the error
                return done(err);
              });
        } else {
          return done(null, null, 'Formato mail incorrecto');
        }
      } else {
        return done(null, null, 'Password requerida');
      }
    }));

};


// expose this function to our app using module.exports
module.exports = Pass;