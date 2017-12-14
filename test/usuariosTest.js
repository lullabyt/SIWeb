//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let ObjectId = require('mongoose').Types.ObjectId;

let Usuario = require('../src/models/usuario');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
let should = chai.should();

chai.use(chaiHttp);

var idUsuario = null;

describe('TEST MODULO USUARIOS', () => {


  //CAMINO CORRECTO

  //Our parent block
  describe('Ejecución modulo usuarios correcta', () => {

    /*
     * Test the /GET route
     */
    describe('/GET usuarios', () => {
      it('it should GET all the usuarios', (done) => {
        chai.request(server)
          .get('/api/usuarios')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            //res.body.length.should.be.eql(0);
            res.body[0].should.have.property('nombre');
            res.body[0].should.have.property('apellido');
            res.body[0].should.have.property('email');
            res.body[0].should.have.property('password');
            res.body[0].should.have.property('fechaNacimiento');
            res.body[0].should.have.property('localidadActual');
            done();
          });
      });
    });

    /*
     * Test the /GET:id route
     */
    describe('/GET/:idUsuario usuario', () => {
      it('it should GET usuario by the given idUsuario', (done) => {
        let idUsuario = '5a2d8651fdf538141484f7fe';
        chai.request(server)
          .get('/api/usuarios/' + idUsuario)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('nombre');
            res.body.should.have.property('apellido');
            res.body.should.have.property('email');
            res.body.should.have.property('password');
            res.body.should.have.property('fechaNacimiento');
            res.body.should.have.property('localidadActual');
            res.body.should.have.property('_id').equals(idUsuario);
            done();
          });
      });

    });


    /*
     * Test the /POST route
     */
    describe('/POST usuario', () => {
      it('it should POST a usuario ', (done) => {
        let usuario = {
          nombre: 'Juan',
          apellido: 'Perez',
          email: 'Juankapo@gmail.com',
          password: 'cuac',
          fechaNacimiento: '1994-08-04',
          localidadActual: 'Neuquen'
        };
        chai.request(server)
          .post('/api/usuarios/')
          .send(usuario)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('nombre').eql(usuario.nombre);
            res.body.should.have.property('apellido').eql(usuario.apellido);
            res.body.should.have.property('email').eql(usuario.email);
            res.body.should.have.property('password').to.not.eql(usuario.password);
            res.body.should.have.property('fechaNacimiento').eql(usuario.fechaNacimiento + 'T00:00:00.000Z');
            res.body.should.have.property('localidadActual').eql(usuario.localidadActual);
            res.body.should.have.property('_id');
            this.idUsuario = res.body._id;
            done();
          });
      });
    });


    /*
     * Test the /patch/:id route
     */
    describe('/PATCH/:id usuario', () => {
      it('it should PATCH a usuario given the id', (done) => {
        let idUsuario = '5a2d8651fdf538141484f7fe';
        let usuario = {
          nombre: 'Carlos',
          apellido: 'Perez'
        };
        chai.request(server)
          .patch('/api/usuarios/' + idUsuario)
          .send(usuario)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('nombre').eql(usuario.nombre);
            res.body.should.have.property('apellido').eql(usuario.apellido);
            res.body.should.have.property('_id').equals(idUsuario);
            done();
          });
      });
    });

    describe('/DELETE/:id usuario', () => {
      it('it should DELETE a usuario given the id', (done) => {
        let idUsuario = this.idUsuario;
        chai.request(server)
          .delete('/api/usuarios/' + idUsuario)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Successfully deleted usuario (sus creaciones persisten)');
            res.body.should.have.property('result');
            res.body.result.should.have.property('_id').eql(idUsuario);
            done();
          });
      });
    });

  });


  //CAMINO INCORRECTO

  //Our parent block
  describe('Ejecución modulo usuarios incorrecta', () => {


    describe('/GET/:idUsuario usuario', () => {
      it('it should not GET usuario by the given incorrect idUsuario', (done) => {
        let idUsuario = '123';
        chai.request(server)
          .get('/api/usuarios/' + idUsuario)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.should.have.property('error');
            res.error.should.have.property('text').eql('formato id invalido');
            done();
          });
      });

    });



    describe('/POST usuario', () => {

      it('it should not POST usuario (no password)', (done) => {
        let usuario = {
          nombre: 'Juan',
          apellido: 'Perez',
          email: 'Juankapo@gmail.com',
          password: '',
          fechaNacimiento: '1994-08-04',
          localidadActual: 'Neuquen'
        };
        chai.request(server)
          .post('/api/usuarios')
          .send(usuario)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.should.have.property('error');
            res.error.should.have.property('text').eql('Password requerida');
            done();
          });
      });



      it('it should not POST usuario (incorrect date)', (done) => {
        let usuario = {
          nombre: 'Juan',
          apellido: 'Perez',
          email: 'Juankapo@gmail.com',
          password: 'cuac',
          fechaNacimiento: '1994-08',
          localidadActual: 'Neuquen'
        };
        chai.request(server)
          .post('/api/usuarios')
          .send(usuario)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.should.have.property('error');
            res.error.should.have.property('text').eql('formato date invalido');
            done();
          });
      });


      it('it should not POST usuario (formato mail incorrecto)', (done) => {
        let usuario = {
          nombre: 'Juan',
          apellido: 'Perez',
          email: 'Juan',
          password: 'cuac',
          fechaNacimiento: '1994-08-04',
          localidadActual: 'Neuquen'
        };
        chai.request(server)
          .post('/api/usuarios')
          .send(usuario)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.should.have.property('error');
            res.error.should.have.property('text').eql('Formato mail incorrecto');
            done();
          });
      });

    });

    describe('/PATCH/:id usuario', () => {
      it('it should not PATCH a usuario given the incorrect id', (done) => {
        let idUsuario = 7637;

        chai.request(server)
          .patch('/api/usuarios/' + idUsuario)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.should.have.property('error');
            res.error.should.have.property('text').eql('formato id invalido');
            done();
          });
      });
    });


    describe('/DELETE/:id usuario', () => {
      it('it should not DELETE a usuario given the incorrect id', (done) => {
        let idUsuario = 'gg';
        chai.request(server)
          .delete('/api/usuarios/' + idUsuario)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.should.have.property('error');
            res.error.should.have.property('text').eql('formato id invalido');
            done();
          });
      });
    });


  });

});