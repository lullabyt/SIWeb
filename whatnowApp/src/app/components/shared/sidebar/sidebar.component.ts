import { Component, AnimationTransitionEvent } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../../services/auth/authentication.service';

import swal from 'sweetalert2';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  title = 'sidebar';
  img = 'calendar.jpg';
  private _opened: boolean = true;
  private _mode = 'push';


  constructor(
    private _authService: AuthenticationService,
    private _router: Router) { }


  isLoggedIn() {

    return this._authService.isLoggedIn();

  }


  logout() {

    swal({
      title: 'Estas seguro?',
      text: "Logout iniciado.",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yep',
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.value) {

        this._authService.logout().then(resultado => {

          if (resultado) {
            if (resultado.success) {
              this._router.navigate(['bienvenida']);
              swal({
                title: 'Nos vemos pronto!',
                text: 'Logout exitoso.',
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
    })


  }



  private _toggleSidebar() {
    this._opened = !this._opened;
  }

  private setBackground() {
    return {
      'background-image': 'url(assets/img/' + this.img + ')'
    }
  }
}
