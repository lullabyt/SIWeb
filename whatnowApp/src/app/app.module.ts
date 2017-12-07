import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//services
import { AsignarPersonalService } from './services/asignarPersonal.service';
import { AuthenticationService } from './services/authentication.service';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PageNotFoundComponent } from './not-found.component';

import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { SidebarModule } from 'ng-sidebar';

import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    BienvenidaComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AsignarPersonalService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
