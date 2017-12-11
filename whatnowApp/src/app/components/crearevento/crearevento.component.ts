import { Component, OnInit } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { Headers, Http } from '@angular/http';

import { EventoService } from '../../services/evento.service';
import {Coordenada} from '../../classes/coordenadas';

//sweet alert
import swal from 'sweetalert2';

@Component({
  selector: 'app-crearevento',
  templateUrl: './crearevento.component.html',
  styleUrls: ['./crearevento.component.css']
})
export class CreareventoComponent implements OnInit {

  private selectedDateFrom: Date = null;
  private selectedDateTo: Date = null;
  private descripcion: String = "";
  private nombre: String;
  private calle: String;
  private altura: String;
  private localidad: String;
  private tipo: string;
  private id: String = '59d696abceda233e3463aade';

  private nombreEspecialista: String = "";
  private especialidad: String = "";
  private telefono: String = "";
  private tipoConsulta: String = "";

  private tipoAcademico: String = "";

  private participantes: String = "";

  private dinero: String = "";

  private urlPeticion= "https://maps.googleapis.com/maps/api/geocode/json?address=";
  private urlApiKey = "&key=AIzaSyCh2O8CbR0c1EkEWTlwhgBDwThEW6aYTOQ";

  constructor(
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private _eventoService: EventoService,
    private http: Http
  ) {
    dateAdapter.setLocale('es-ES');
  }

  ngOnInit() {
  }


  crearEventoInicial(tipo: string) {
        switch(this.tipo){
          case 'Cita médica':{
              this.createCitaMedica();
          }
          break;
          case 'Evento académico': {
              this.crearEventoAcademico();
          }
          break;
          case 'Reunión laboral': {
              this.createReunionLaboral();
          }
          break;
          case 'Reunión social': {
              this.createReunionSocial();
          }
          break;
          default: {
            this.crearEvento();
          }
          break;
        }
}


crearEvento(){
  var calle = encodeURI(this.calle.toString());
  var local = encodeURI(this.localidad.toString());
  var url = `${this.urlPeticion}${this.altura},${calle},${local}${this.urlApiKey}`;
  this._eventoService.consultar(url).then(resultado =>{
    var datosGeojson = {
      lat: resultado.results[0].geometry.location.lat,
      lng: resultado.results[0].geometry.location.lng,
      street: this.calle,
      city: this.localidad
    }
    this._eventoService.crearEvento(this.id, this.nombre, this.descripcion, this.selectedDateFrom,
                this.selectedDateTo, datosGeojson).then(evento =>{
                  console.log(evento);
                  swal({
                      title: 'Hecho!',
                      text: 'Evento creado',
                      type: 'success',
                      confirmButtonText: 'Ok',
                      confirmButtonColor: '#3b3a30',
                      allowOutsideClick: false,
                      allowEscapeKey: false
                    });
    })
  }).catch( error => {
    console.log(error);
    swal({
        title: 'Error!',
        text: 'No se pudo crear el evento. Pruebe más tarde.',
        type: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      });
  })
}

crearEventoAcademico(){
  var calle = encodeURI(this.calle.toString());
  var local = encodeURI(this.localidad.toString());
  var url = `${this.urlPeticion}${this.altura},${calle},${local}${this.urlApiKey}`;
  this._eventoService.consultar(url).then(resultado =>{
    var datosGeojson = {
      lat: resultado.results[0].geometry.location.lat,
      lng: resultado.results[0].geometry.location.lng,
      street: this.calle,
      city: this.localidad
    }
    this._eventoService.createEventoAcademico(this.id, this.nombre, this.descripcion, this.selectedDateFrom,
                this.selectedDateTo, datosGeojson, this.tipoAcademico).then(evento =>{
                  console.log(evento);
                  swal({
                      title: 'Hecho!',
                      text: 'Evento creado.',
                      type: 'success',
                      confirmButtonText: 'Ok',
                      confirmButtonColor: '#3b3a30',
                      allowOutsideClick: false,
                      allowEscapeKey: false
                    });
    })
  }).catch( error => {
    console.log(error);
    swal({
        title: 'Error!',
        text: 'No se pudo crear el evento. Pruebe más tarde.',
        type: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      });
  })
}

createReunionLaboral(){
  var calle = encodeURI(this.calle.toString());
  var local = encodeURI(this.localidad.toString());
  var url = `${this.urlPeticion}${this.altura},${calle},${local}${this.urlApiKey}`;
  this._eventoService.consultar(url).then(resultado =>{
    var datosGeojson = {
      lat: resultado.results[0].geometry.location.lat,
      lng: resultado.results[0].geometry.location.lng,
      street: this.calle,
      city: this.localidad
    }
    this._eventoService.createReunionLaboral(this.id, this.nombre, this.descripcion, this.selectedDateFrom,
                this.selectedDateTo, datosGeojson, this.participantes).then(evento =>{
                  console.log(evento);
                  swal({
                      title: 'Hecho!',
                      text: 'Evento creado.',
                      type: 'success',
                      confirmButtonText: 'Ok',
                      confirmButtonColor: '#3b3a30',
                      allowOutsideClick: false,
                      allowEscapeKey: false
                    });
    })
  }).catch( error => {
    console.log(error);
    swal({
        title: 'Error!',
        text: 'No se pudo crear el evento. Pruebe más tarde.',
        type: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      });
  })
}

createReunionSocial(){
  var calle = encodeURI(this.calle.toString());
  var local = encodeURI(this.localidad.toString());
  var url = `${this.urlPeticion}${this.altura},${calle},${local}${this.urlApiKey}`;
  this._eventoService.consultar(url).then(resultado =>{
    var datosGeojson = {
      lat: resultado.results[0].geometry.location.lat,
      lng: resultado.results[0].geometry.location.lng,
      street: this.calle,
      city: this.localidad
    }
    this._eventoService.createReunionSocial(this.id, this.nombre, this.descripcion, this.selectedDateFrom,
                this.selectedDateTo, datosGeojson, this.dinero).then(evento =>{
                  console.log(evento);
                  swal({
                      title: 'Hecho!',
                      text: 'Evento creado.',
                      type: 'success',
                      confirmButtonText: 'Ok',
                      confirmButtonColor: '#3b3a30',
                      allowOutsideClick: false,
                      allowEscapeKey: false
                    });
    })
  }).catch( error => {
    console.log(error);
    swal({
        title: 'Error!',
        text: 'No se pudo crear el evento. Pruebe más tarde.',
        type: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      });
  })
}

createCitaMedica(){
  var calle = encodeURI(this.calle.toString());
  var local = encodeURI(this.localidad.toString());
  var url = `${this.urlPeticion}${this.altura},${calle},${local}${this.urlApiKey}`;
  this._eventoService.consultar(url).then(resultado =>{
    var datosGeojson = {
      lat: resultado.results[0].geometry.location.lat,
      lng: resultado.results[0].geometry.location.lng,
      street: this.calle,
      city: this.localidad
    }
    this._eventoService.createCitaMedica(this.id, this.nombre, this.descripcion, this.selectedDateFrom,
                this.selectedDateTo, datosGeojson, this.nombreEspecialista, this.especialidad, this.telefono, this.tipoConsulta).then(evento =>{
                  console.log(evento);
                  swal({
                      title: 'Hecho!',
                      text: 'Evento creado.',
                      type: 'success',
                      confirmButtonText: 'Ok',
                      confirmButtonColor: '#3b3a30',
                      allowOutsideClick: false,
                      allowEscapeKey: false
                    });
    })
  }).catch( error => {
    console.log(error);
    swal({
        title: 'Error!',
        text: 'No se pudo crear el evento. Pruebe más tarde.',
        type: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      });
  })
}






  formCompletado() {
    if (this.nombre && this.calle && this.altura && this.localidad && this.tipo) {
      return true;
    } else { return false; }

  }

}
