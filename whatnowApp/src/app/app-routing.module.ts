import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardIn } from './services/auth/authIn.guard';
import { AuthGuardOut } from './services/auth/authOut.guard';

import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CreareventoComponent } from './components/crearevento/crearevento.component';
import { NotasComponent } from './components/notas/notas.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { CrearnotaComponent } from './components/crearnota/crearnota.component';

import { PageNotFoundComponent } from './not-found.component';


const routes: Routes = [

  //rutas solo sin estar loggeado
  {
    path: '', canActivate: [
      AuthGuardIn
    ], children: [
      {
        path: 'bienvenida', component: BienvenidaComponent
      },
      {
        path: 'signup', component: SignupComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: '', redirectTo: '/bienvenida', pathMatch: 'full'
      }
    ]
  },

  //rutas solo estando loggeado
  {
    path: '', canActivate: [
      AuthGuardOut
    ], children: [
      {
        path: 'inicio', component: InicioComponent
      },
      {
        path: 'crearEvento', component: CreareventoComponent
      },
      {
        path: 'notas', component: NotasComponent
      },
      {
        path: 'notas/crearnota', component: CrearnotaComponent
      },
      {
        path: 'mapa', component: MapaComponent
      },
      {
        path: '', redirectTo: '/inicio', pathMatch: 'full'
      }
    ]
  },
  //wildcard
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuardIn, AuthGuardOut],
  exports: [RouterModule]
})
export class AppRoutingModule { }
