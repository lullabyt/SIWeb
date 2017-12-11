
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { VariablesGlobales } from '../../utiles/variablesGlobales';
import 'rxjs/add/operator/toPromise';


//clases utilizadas
import { Usuario } from './../../classes/usuario';


@Injectable()
export class AuthenticationService {

  user: Usuario;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  private usuarionUrl = VariablesGlobales.BASE_API_URL + '/api/usuarios';


  constructor(private http: Http) { }


  isLoggedIn() {
    let loggedIn = false;

    if (this.user) {
      loggedIn = true;
    }
    return loggedIn;

  }


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

    return this.http
      .post(urlSignUp, usuario, { headers: this.headers })
      .toPromise()
      .then(res => {
        console.log(res.json());
        if (res.json().success) {
          this.user = res.json().newUser;
        }
        return res.json();
      })
      .catch(this.handleError);
  }


  login(user: Usuario): Promise<any> {

    let usuario = JSON.stringify({

      email: user.email,
      password: user.password
    });


    const urlLogin = this.usuarionUrl + '/login';

    return this.http
      .post(urlLogin, usuario, { headers: this.headers })
      .toPromise()
      .then(res => {
        console.log(res.json());
        if (res.json().success) {
          this.user = res.json().user;
        }
        return res.json();
      })
      .catch(this.handleError);
  }


  logout(): Promise<any> {

    const urlLogout = this.usuarionUrl + '/logout';

    return this.http
      .get(urlLogout)
      .toPromise()
      .then(res => {
        console.log(res.json());
        if (res.json().success) {
          this.user = null;
        }
        return res.json();
      })
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


}
