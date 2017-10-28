const express = require('express');
const router = express.Router();


var Proyecto = require('../models/proyecto');
var Usuario = require('../models/usuario');



router.get('/', (req, res) => {
  Proyecto.find().then(function(proyectos) {
    res.json(proyectos);
  }, function(err) {
    res.send(err);
  });
});


//get proyecto especifico, junto con sus respectivas tareas y etapas
router.get('/:_id', (req, res) => {
  Proyecto.findById(
      req.params._id
    )
    .populate({
      path: 'etapas',
      populate: {
        path: 'tareas'
      }
    })
    .populate('tareas')
    .then(function(proyecto) {
      res.json(proyecto);

    }, function(err) {
      res.send(err);
    });
});

//Obtener los proyectos de un usuario particular
router.get('/usuario/:_id', (req, res) => {
  Usuario.find({
      _id: req.params._id
    }, "proyectos")
    .populate(
      'proyectos')
    .then(function(usuario) {
      res.json(usuario);

    }, function(err) {
      res.send(err);
    });
});



router.post('/:_id', (req, res) => {

  var proyect = new Proyecto(req.body

    /*
    titulo: req.body.titulo,
    contenido: req.body.contenido,
    tipo: req.body.tipo,
    criticidad: req.body.criticidad,
    objetivos: req.body.objetivos,
    fechaInicio: req.body.fechaInicio,
    fechaFin: req.body.fechaFin,
    participantes: req.body.participantes
    */
  );

  //una vez creada se guarda en la base de datos
  proyect.save().then(function() {

      Usuario.findById(
          req.params._id
        ).then(function(usuario) {
          //actualiza la referencia al usuario
          usuario.proyectos.push(proyect._id);
          usuario.save().then(function(){
              res.json(proyect);
          }, function(err){

            //Si no puede actualizar el usuario se debe borrar el proyecto ya guardado
            /*
            Proyecto.findByIdAndRemove(
              proyect._id
            ).then(function() {
              res.json({
                message: 'No se pudo crear el proyecto'
              });
            }, function(err) {
              res.send(err);
            });
            */
            res.send(err);
          });
        }, function(err) {
          res.send(err);
        });

  }, function(err) {
    res.send(err);
  });
});



router.patch('/:_id', (req, res) => {

  Proyecto.findByIdAndUpdate(req.params._id,
    //solo hace update de los atributos que vengan en body, pueden ser uno o muchos
    req.body, {
      //para que devuelva actualizado
      new: true
    }).then(function(proyecto) {
    res.json(proyecto);

  }, function(err) {
    res.send(err);
  });
});



router.delete('/:_id', (req, res) => {
  Proyecto.findByIdAndRemove(
    req.params._id
  ).then(function() {
    res.json({
      message: 'Successfully deleted proyecto'
    });
  }, function(err) {
    res.send(err);
  });
});


module.exports = router;
