import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { VariablesGlobales } from '../utiles/variablesGlobales';


import { Nota } from '../classes/nota';


@Injectable()
export class NotasService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  private notasUrl = VariablesGlobales.BASE_API_URL + '/api/notas';


  constructor(private http: Http) { }

  /*
    getNotas(): Promise<any> {
      return this.http.get(this.notasUrl + '/usuario/' + this.id)
        .toPromise()
        .then(response => response.json())
        .catch(this.handleError);
    }*/

  crear(_idUsuario: string, note: Nota): Promise<any> {

    const url = `${this.notasUrl}/${_idUsuario}`;

    let nota = JSON.stringify({

      criticidad: note.criticidad,
      titulo: note.titulo,
      contenido: note.contenido,
      tipo: note.tipo,
      estado: note.estado
    });

    return this.http
      .post(url, nota, { headers: this.headers })
      .toPromise()
      .then(res => {
        console.log(res.json());
        return res.json();
      })
      .catch(this.handleError);
  }


  eliminar(_idNota: string, _idUser: string): Promise<any> {

    const url = `${this.notasUrl}/${_idNota}`;

    var config = {
      params: {
        _idUsuario: _idUser
      }
    };

    return this.http.delete(url, config)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  modificar(note: Nota): Promise<any> {

    const url = `${this.notasUrl}/${note._id}`;

    let nota = JSON.stringify({

      criticidad: note.criticidad,
      titulo: note.titulo,
      contenido: note.contenido,
      tipo: note.tipo,
      estado: note.estado
    });

    return this.http.patch(url, nota, { headers: this.headers })
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
