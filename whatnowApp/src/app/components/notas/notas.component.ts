import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Nota } from '../../classes/nota';
import { Usuario } from '../../classes/usuario'

import { NotasService } from '../../services/notas.service';
import { AuthenticationService } from '../../services/auth/authentication.service';


import swal from 'sweetalert2';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  user: Usuario;
  public note = new Nota();


  private notas: Nota[] = [];

  constructor(private _notasService: NotasService,
    private _authService: AuthenticationService,
    private _router: Router)
  { this.user = this._authService.user; }

  ngOnInit() {

    this.notas = this.user.notas;
    /*
        this._notasService.getNotas().then(resultado => {
          console.log(resultado[0])
          this.notas = resultado[0].notas;
        });*/
  }


  crear() {
    this._notasService.crear(this.user._id, this.note).then(resultado => {

      this.user.notas.push(this.note);

      swal({
        title: 'Hecho!',
        text: 'Nota creada con éxito.',
        type: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      });

    }).catch((err) => {
      console.log(err);
      swal({
        title: 'Error!',
        text: 'Se ha producido un error. Pruebe más tarde.',
        type: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    });
  }



  eliminar(_idNota: string) {

    swal({
      title: 'Estas seguro?',
      text: "Borrado iniciado.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yep',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.value) {

        this._notasService.eliminar(_idNota, this.user._id).then(resultado => {

          for (let i = 0; i < this.user.notas.length; i++) {
            if (this.user.notas[i]._id === _idNota) {
              this.user.notas.splice(i, 1);
              return swal({
                title: 'Hecho!',
                text: 'Nota eliminada con éxito.',
                type: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#3b3a30',
                allowOutsideClick: false,
                allowEscapeKey: false
              });
            }
          }


        }).catch((err) => {
          console.log(err);
          swal({
            title: 'Error!',
            text: 'Se ha producido un error. Pruebe más tarde.',
            type: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3b3a30',
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        });
      }

    })

  }



  modificar(_id: string) {
    this._notasService.modificar(this.note).then(resultado => {

      for (let i = 0; i < this.user.notas.length; i++) {
        if (this.user.notas[i]._id === _id) {
          this.user.notas.splice(i, 1);
          return swal({
            title: 'Hecho!',
            text: 'Nota modificada con éxito.',
            type: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3b3a30',
            allowOutsideClick: false,
            allowEscapeKey: false
          });
        }
      }


    }).catch((err) => {
      console.log(err);
      swal({
        title: 'Error!',
        text: 'Se ha producido un error. Pruebe más tarde.',
        type: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      });
    });
  }
}
