import { Component, OnInit } from '@angular/core';
import {Nota} from '../../classes/nota';
import { NotasService } from '../../services/notas.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  private notas: Nota[] = [];

  constructor(private _notasService: NotasService) { }

  ngOnInit() {

    this._notasService.getNotas().then(resultado =>{
      console.log(resultado[0])
      this.notas = resultado[0].notas;
    });
  }

  eliminar(_id: string){
    this._notasService.eliminar(_id).then(resultado =>{
      console.log(resultado);
      swal({
          title: 'Hecho!',
          text: 'Nota eliminada',
          type: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3b3a30',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
    })
  }

}
