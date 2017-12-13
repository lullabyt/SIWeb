import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/auth/authentication.service';
import { NotasService } from '../../services/notas.service';

import { Usuario } from '../../classes/usuario';
import { Nota } from '../../classes/nota';

import swal from 'sweetalert2';

@Component({
  selector: 'app-crearnota',
  templateUrl: './crearnota.component.html',
  styleUrls: ['./crearnota.component.css']
})
export class CrearnotaComponent implements OnInit {

  public note = new Nota();
  public user = new Usuario();

  constructor(
    private _notasService: NotasService,
    private _authService: AuthenticationService,
    private _router: Router) { this.user = this._authService.user; }


  ngOnInit() {
  }


  crear() {
    this._notasService.crear(this.user._id, this.note).then(resultado => {
      this.note.estado = "En curso";
      this.user.notas.push(this.note);
      this._router.navigate(['/notas']);
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


  formCompletado() {
    if (this.note.titulo && this.note.contenido) {
      return true;
    } else { return false; }

  }


}
