import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service'
import { Usuario } from '../../classes/usuario'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new Usuario();
  public errorMsg = '';

  constructor(
    private _authService: AuthenticationService) { }


  ngOnInit() {
  }


  login() {
    if (!this._authService.login(this.user.email, this.user.password)) {
      this.errorMsg = 'Failed to login';
    }
  }

  formCompletado() {
    if (this.user.email && this.user.password) {
      return true;
    } else { return false; }

  }

}
