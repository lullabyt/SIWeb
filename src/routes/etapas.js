const express = require('express');
const router = express.Router();

var Etapa = require('../models/etapa');
var Proyecto = require('../models/proyecto');
var Tarea = require('../models/tarea');

//get todas las etapas
router.get('/', (req, res) => {
  Etapa.find().then(function(etapas) {
    res.json(etapas);
  }, function(err) {
    res.send(err);
  });
});

//Obtener las etapas de un proyecto particular
router.get('/proyecto/:_id', (req, res) => {
  Proyecto.find({
      _id: req.params._id
    }, "etapas")
    .populate(
      'etapas')
    .then(function(proyecto) {
      res.json(proyecto);

    }, function(err) {
      res.send(err);
    });
});


router.post('/:_id', (req, res) => {

  var etapa = new Etapa(

    req.body

  );

  //una vez creada se guarda en la base de datos
  etapa.save().then(function() {

    Proyecto.findByIdAndUpdate(req.params._id, {
        $push: {
          etapas: etapa._id

        }
      })

      .then(function() {
        res.json(etapa);

      })
      .catch((err) => {
        res.send(err);
        errorPostEtapa(etapa._id);
      });

  }, function(err) {
    res.send(err);
  });
});


const errorPostEtapa = function(idEtapa) {
  //Si no puede actualizar el usuario se debe borrar la etapa ya guardada
  Etapa.findByIdAndRemove(
    idEtapa
  ).then(function() {
    res.json({
      message: 'No se pudo crear la etapa'
    });
  }, function(err) {
    res.send(err);
  });

};



router.patch('/:_id', (req, res) => {

  Etapa.findByIdAndUpdate(req.params._id,
    //solo hace update de los atributos que vengan en body, pueden ser uno o muchos
    req.body, {
      //para que devuelva actualizado
      new: true
    }).then(function(etapa) {
    res.json(etapa);

  }, function(err) {
    res.send(err);
  });
});



router.delete('/:_id', (req, res) => {

  Etapa.findById(
    req.params._id
  ).then(function(etapa) {
      Tarea.deleteMany({
        _id: {
          $in: etapa.tareas
        }

      }).then(function() {

          Etapa.findByIdAndRemove(
            req.params._id
          ).then(function() {

              Proyecto.findByIdAndUpdate(req.query._idProyecto, {
                  $pull: {
                    etapas: req.params._id

                  }
                }).then(function() {


                  res.json({
                    message: 'Successfully deleted etapa'
                  });

                })

                /*
                              Proyecto.findById(
                                  req.query._idProyecto
                                ).then(function(proyecto) {

                                  //actualiza la referencia a los proyectos
                                  let index = proyecto.etapas.indexOf(req.params._id);
                                  if (index > -1) {

                                    proyecto.etapas.splice(index, 1);

                                  }

                                  proyecto.save().then(function() {


                                    res.json({
                                      message: 'Successfully deleted etapa'
                                    });

                                  })

                    })
                        */
                .catch((err) => {
                  res.send(err);
                });

            },
            function(err) {
              res.send(err);
            });

        },
        function(err) {
          res.send(err);
        });

    },
    function(err) {
      res.send(err);
    });

});



module.exports = router;
