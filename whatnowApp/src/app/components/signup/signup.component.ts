import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { Usuario } from '../../classes/usuario'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = new Usuario();
  public errorMsg = '';

  constructor(
    private _authService: AuthenticationService) { }


  ngOnInit() {
  }


  login() {
    if (!this._authService.signup(this.user)) {
      this.errorMsg = 'Failed to login';
    }
  }

  formCompletado() {
    if (this.user.nombre && this.user.apellido && this.user.email && this.user.password && this.user.localidadActual && this.user.fechaNacimiento) {
      return true;
    } else { return false; }

  }


}
