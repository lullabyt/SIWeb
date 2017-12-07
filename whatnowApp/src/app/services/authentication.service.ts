
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { VariablesGlobales } from '../utiles/variablesGlobales';
import 'rxjs/add/operator/toPromise';


//clases utilizadas
import { Usuario } from './../classes/usuario';


@Injectable()
export class AuthenticationService {

  private headers = new Headers({ 'Content-Type': 'application/json' });


  private usuarionUrl = VariablesGlobales.BASE_API_URL + '/api/usuarios';

  private instrumentosUrl = VariablesGlobales.BASE_API_URL + '/gestionOrdenes/movimientos/asignarPersonal/obtenerInstrumentosTipoTrabajo';
  private ordenesUrl = VariablesGlobales.BASE_API_URL + '/gestionOrdenes/movimientos/asignarPersonal/obtenerOrdenes';
  private personalUrl = VariablesGlobales.BASE_API_URL + '/gestionOrdenes/movimientos/asignarPersonal/obtenerPersonal';
  private trabajosUrl = VariablesGlobales.BASE_API_URL + '/gestionOrdenes/movimientos/asignarPersonal/obtenerTrabajosOrden';


  constructor(private http: Http) { }


  /*
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

  */
  signup(user: Usuario): Promise<any> {

    let usuario = JSON.stringify({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      password: user.password,
      localidadActual: user.localidadActual,
      fechaNacimiento: user.fechaNacimiento
    });

    const urlSignUp = this.usuarionUrl + '/signup';
    console.log(user.password);
    return this.http
      .post(urlSignUp, usuario, { headers: this.headers })
      .toPromise()
      .then(res => {
        console.log(res.json());
        return res.json();
      })
      .catch(this.handleError);
  }

  login(email: string, password: string): Promise<any> {

    const urlSignUp = this.usuarionUrl + '/login';

    return this.http
      .post(urlSignUp, JSON.stringify({ email: email, password: password }), { headers: this.headers })
      .toPromise()
      .then(res => {
        console.log(res.json().obj);
        return res.json().obj;
      })
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
