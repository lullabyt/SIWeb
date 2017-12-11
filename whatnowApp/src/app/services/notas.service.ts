import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { VariablesGlobales } from '../utiles/variablesGlobales';
import {Nota} from '../classes/nota';


@Injectable()
export class NotasService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  private notasUrl = VariablesGlobales.BASE_API_URL + '/api/notas';
  private id: String = '59d696abceda233e3463aade';
  constructor(private http: Http) { }

  ngOnInit(){

  }


  getNotas(): Promise<any> {
    return this.http.get(this.notasUrl+'/usuario/'+this.id)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  eliminar(_id: string): Promise<any>{
    console.log(_id);
    return this.http.delete(this.notasUrl+'/'+_id)
    .toPromise()
    .then(response => response.json())
    .catch(this.handleError);
  }

}
