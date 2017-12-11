import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { VariablesGlobales } from '../utiles/variablesGlobales';
import {Coordenada} from '../classes/coordenadas';
import {EventoGeo} from '../classes/eventoGeo';
import {CitaMedica} from '../classes/citaMedica';
import { EventoAcademico} from '../classes/eventoAcademico';
import { ReunionSocial} from '../classes/reunionSocial';
import { ReunionLaboral } from '../classes/reunionLaboral';


@Injectable()
export class EventoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  private eventoUrl = VariablesGlobales.BASE_API_URL + '/api/eventosGeo';
  private citaMedicaUrl = VariablesGlobales.BASE_API_URL + '/api/eventosGeo/citasMedicas';
  private reunionSocialUrl = VariablesGlobales.BASE_API_URL + '/api/eventosGeo/reunionesSociales';
  private reunionLaboralUrl = VariablesGlobales.BASE_API_URL + '/api/eventosGeo/reunionesLaborales';
  private eventoAcademicoUrl = VariablesGlobales.BASE_API_URL + '/api/eventosGeo/eventosAcademicos';

  private urlPeticion= "https://maps.googleapis.com/maps/api/geocode/json?address=";
  private urlApiKey = "&key=AIzaSyCh2O8CbR0c1EkEWTlwhgBDwThEW6aYTOQ";

  private coordenadas: any;


  constructor(private http: Http) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  crearEvento(id: String, nombre: String, descripcion: String, fechaInicio: Date,
              fechaFin: Date, datosGeojson: any ): Promise<EventoGeo> {
      var url = this.eventoUrl+'/'+id;
      console.log(url+ "URL")
      return this.http
        .post(url, JSON.stringify({ nombre: nombre, descripcion: descripcion, fechaInicio: fechaInicio,
      fechaFin: fechaFin, datosGeojson: datosGeojson }), { headers: this.headers })
        .toPromise()
        .then(res => {
          console.log(res.json());
          return res.json();
        })
        .catch(this.handleError);
  }

  createCitaMedica(id: String, nombre: String, descripcion: String, fechaInicio: Date,
              fechaFin: Date, datosGeojson: any, nombreEspecialista: String,
              especialidad: String,
              telefono: String,
              tipoConsulta: String): Promise<CitaMedica> {
      var url = this.eventoUrl+'/'+id;
      return this.http
        .post(url, JSON.stringify({ nombre: nombre, descripcion: descripcion, fechaInicio: fechaInicio,
          fechaFin: fechaFin, datosGeojson: datosGeojson,nombreEspecialista: nombreEspecialista, especialidad:especialidad,
        telefono: telefono, tipoConsulta: tipoConsulta}), { headers: this.headers })
        .toPromise()
        .then(res => {
          return res.json().obj;
        })
        .catch(this.handleError);
  }

  createEventoAcademico(id: String, nombre: String, descripcion: String, fechaInicio: Date,
              fechaFin: Date, datosGeojson: any, tipo: String): Promise<EventoAcademico> {
      var url = this.eventoUrl+'/'+id;
      return this.http
        .post(url, JSON.stringify({ nombre: nombre, descripcion: descripcion, fechaInicio: fechaInicio,
          fechaFin: fechaFin, datosGeojson: datosGeojson,tipo: tipo}), { headers: this.headers })
        .toPromise()
        .then(res => {
          return res.json();
        })
        .catch(this.handleError);
  }

  createReunionSocial(id: String, nombre: String, descripcion: String, fechaInicio: Date,
              fechaFin: Date, datosGeojson: any, dinero: String): Promise<ReunionSocial> {
      var url = this.reunionSocialUrl+'/'+id;
      return this.http
        .post(url, JSON.stringify({ nombre: nombre, descripcion: descripcion, fechaInicio: fechaInicio,
          fechaFin: fechaFin, datosGeojson: datosGeojson,dinero: dinero}), { headers: this.headers })
        .toPromise()
        .then(res => {
          return res.json();
        })
        .catch(this.handleError);
  }

  createReunionLaboral(id: String, nombre: String, descripcion: String, fechaInicio: Date,
              fechaFin: Date, datosGeojson: any, participantes: String): Promise<ReunionLaboral> {
      var url = this.reunionLaboralUrl+'/'+id;
      return this.http
        .post(url, JSON.stringify({ nombre: nombre, descripcion: descripcion, fechaInicio: fechaInicio,
          fechaFin: fechaFin, datosGeojson: datosGeojson,participantes: participantes}), { headers: this.headers })
        .toPromise()
        .then(res => {
          return res.json();
        })
        .catch(this.handleError);
  }

   consultar(url): Promise<any>{

    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json();

        //response.json();
      })
      .catch(this.handleError);
  }



}
