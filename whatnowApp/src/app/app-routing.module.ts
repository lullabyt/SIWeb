import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PageNotFoundComponent } from './not-found.component';


const routes: Routes = [

  { path: 'bienvenida', component: BienvenidaComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  //{ path: 'wizardAsignarPersonal', component: WizardAsignarPersonalComponent },
  //{ path: 'wizardTipoPiezaInspeccionada', component: WizardTipoPiezaInspeccionadaComponent },
  //{ path: 'wizardTrabajosSupervisadosEmpleado', component: WizardTrabajosSupervisadosEmpleadoComponent },


  { path: '', redirectTo: '/bienvenida', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
