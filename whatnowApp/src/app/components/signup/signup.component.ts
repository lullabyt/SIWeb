import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/auth/authentication.service'
import { Usuario } from '../../classes/usuario'

import swal from 'sweetalert2';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = new Usuario();
  public errorMsg = '';

  constructor(
    private _authService: AuthenticationService,
    private _router: Router) { }


  ngOnInit() {
  }


  signup() {
    /*
    if (!) {
      this.errorMsg = 'Failed to login';
    }*/

    this._authService.signup(this.user).then(resultado => {

      if (resultado) {
        if (resultado.success) {
          this._router.navigate(['inicio']);
          swal({
            title: 'Hecho!',
            text: 'Tu cuenta ha sido creada con éxito.',
            type: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3b3a30',
            allowOutsideClick: false,
            allowEscapeKey: false
          });

        } else {
          if (resultado.message) {
            swal({
              title: 'Oops!',
              text: resultado.message,
              type: 'warning',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#3b3a30',
              allowOutsideClick: false,
              allowEscapeKey: false
            });


          } else {
            swal({
              title: 'Oops!',
              text: 'Se ha producido un error. Pruebe más tarde.',
              type: 'warning',
              confirmButtonText: 'Ok',
              confirmButtonColor: '#3b3a30',
              allowOutsideClick: false,
              allowEscapeKey: false
            });
          }

        }

      } else {
        swal({
          title: 'Oops!',
          text: 'Se ha producido un error. Pruebe más tarde.',
          type: 'warning',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3b3a30',
          allowOutsideClick: false,
          allowEscapeKey: false
        });
      }

    }).catch((err) => {

      //se produjo error cualquiera
      swal({
        title: 'Error!',
        text: 'Se ha producido un error. Pruebe más tarde.',
        type: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#3b3a30',
        allowOutsideClick: false,
        allowEscapeKey: false
      });
      console.log(err);
    });


  }



  formCompletado() {
    if (this.user.nombre && this.user.apellido && this.user.email && this.user.password && this.user.localidadActual && this.user.fechaNacimiento) {
      return true;
    } else { return false; }

  }


}
