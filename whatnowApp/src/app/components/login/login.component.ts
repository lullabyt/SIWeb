import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/auth/authentication.service'
import { Usuario } from '../../classes/usuario'

import swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new Usuario();
  public errorMsg = '';

  constructor(
    private _authService: AuthenticationService,
    private _router: Router) { }


  ngOnInit() {
  }


  login() {
    /*
    if (!this._authService.login(this.user.email, this.user.password)) {
      this.errorMsg = 'Failed to login';
    }*/

    this._authService.login(this.user).then(resultado => {

      if (resultado) {
        if (resultado.success) {
          this._router.navigate(['inicio']);
          swal({
            title: 'Hecho!',
            text: 'Login exitoso.',
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
    if (this.user.email && this.user.password) {
      return true;
    } else { return false; }

  }

}
