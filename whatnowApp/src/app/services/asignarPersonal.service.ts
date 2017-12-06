
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { VariablesGlobales } from '../utiles/variablesGlobales';
import 'rxjs/add/operator/toPromise';


//clases utilizadas
import { Asignacion } from './../classes/asignacion';
import { Instrumento } from './../classes/instrumento';
import { Orden } from './../classes/orden';
import { Personal } from './../classes/personal';
import { Trabajo } from './../classes/trabajo';


//MOVIMIENTO ASIGNAR PERSONAL

@Injectable()
export class AsignarPersonalService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  //urls hacia movimiento asignarPersonal
  private asignacionUrl = VariablesGlobales.BASE_API_URL + '/gestionOrdenes/movimientos/asignarPersonal/registrarAsignacion';
  private instrumentosUrl = VariablesGlobales.BASE_API_URL + '/gestionOrdenes/movimientos/asignarPersonal/obtenerInstrumentosTipoTrabajo';
  private ordenesUrl = VariablesGlobales.BASE_API_URL + '/gestionOrdenes/movimientos/asignarPersonal/obtenerOrdenes';
  private personalUrl = VariablesGlobales.BASE_API_URL + '/gestionOrdenes/movimientos/asignarPersonal/obtenerPersonal';
  private trabajosUrl = VariablesGlobales.BASE_API_URL + '/gestionOrdenes/movimientos/asignarPersonal/obtenerTrabajosOrden';



  private atributosInstrumento: string[] = [
    "Número de Instrumento", "Nombre", "Estado", "Disponibilidad", "Fecha de Ingreso"
  ];


  private atributosOrden: string[] = [
    "Número de Orden", "Fecha de Ingreso", "Progreso", "Observaciones"
  ];


  private atributosPersonal: string[] = [
    "Cuil", "Nombre", "Apellido", "Telefonos", "Direccion", "Puesto", "Asignado"
  ];


  private atributosTrabajo: string[] = [
    "Número de Trabajo", "Fecha de Realizaciín", "Evaluación", "Observacion", "Orden de Servicio", "Tipo de Trabajo"
  ];


  constructor(private http: Http) { }



  getOrdenes(): Promise<Orden[]> {
    return this.http.get(this.ordenesUrl)
      .toPromise()
      .then(response => response.json() as Orden[])
      .catch(this.handleError);
  }


  getTrabajosOrden(_idOrden: string): Promise<Trabajo[]> {

    const url = `${this.trabajosUrl}/${_idOrden}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Trabajo[])
      .catch(this.handleError);
  }


  getPersonalLibre(): Promise<Personal[]> {

    const urlLibre = this.personalUrl + 'Libre';

    return this.http.get(urlLibre)
      .toPromise()
      .then(response => response.json() as Personal[])
      .catch(this.handleError);
  }


  getPersonalOcupado(): Promise<Personal[]> {

    const urlOcupado = this.personalUrl + 'Ocupado';

    return this.http.get(urlOcupado)
      .toPromise()
      .then(response => response.json() as Personal[])
      .catch(this.handleError);
  }


  getInstrumentosTipoTrabajo(_idTipoTrabajo: string): Promise<Instrumento[]> {

    const url = `${this.instrumentosUrl}/${_idTipoTrabajo}`;

    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Instrumento[])
      .catch(this.handleError);
  }


  createAsignacion(trabajo: string, personal: string, instrumento: string): Promise<Asignacion> {

    return this.http
      .post(this.asignacionUrl, JSON.stringify({ trabajo: trabajo, personal: personal, instrumento: instrumento }), { headers: this.headers })
      .toPromise()
      .then(res => {
        return res.json().obj;
      })
      .catch(this.handleError);
  }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }



  getAtributosInstrumento() {
    return this.atributosInstrumento;
  }


  getAtributosTrabajo() {
    return this.atributosTrabajo;
  }


  getAtributosPersonal() {
    return this.atributosPersonal;
  }


  getAtributosOrden() {
    return this.atributosOrden;
  }


}
