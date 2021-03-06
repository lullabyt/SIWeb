import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule
} from '@angular/material';

import { AgmCoreModule } from '@agm/core';

//services
import { AuthenticationService } from './services/auth/authentication.service';
import { EventoService } from './services/evento.service';
import { NotasService } from './services/notas.service';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PageNotFoundComponent } from './not-found.component';

import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarModule } from 'ng-sidebar';

import { CreareventoComponent } from './components/crearevento/crearevento.component';
import { BienvenidaComponent } from './components/bienvenida/bienvenida.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NotasComponent } from './components/notas/notas.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { CrearnotaComponent } from './components/crearnota/crearnota.component';


@NgModule({
  exports: [
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MaterialModule { }



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    BienvenidaComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    InicioComponent,
    CreareventoComponent,
    FooterComponent,
    NotasComponent,
    MapaComponent,
    CrearnotaComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCePtdONf9QH13km56WgDWeMuZIsVVsIoY",
      libraries: ["places"]
    }),
    BrowserModule,
    SidebarModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule

  ],
  providers: [
    AuthenticationService,
    EventoService,
    NotasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
