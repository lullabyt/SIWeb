import { Component, OnInit } from '@angular/core';
import { ElementRef, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { AuthenticationService } from '../../services/auth/authentication.service';
import { EventoService } from '../../services/evento.service';

import {Usuario} from '../../classes/usuario';
import {EventoGeo} from '../../classes/eventoGeo';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

export class InicioComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public latitude2: number;
  public longitude2: number;
  public searchControl: FormControl;
  public zoom: number;
  user: Usuario;
  public eventos: any[]=[];
  private datosEventos = [];

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private _authService: AuthenticationService,
    private ngZone: NgZone,
    private _eventoService: EventoService
  ) { this.user = this._authService.user; }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 12;
    //avenida argentina 400
    this.latitude = -38.9507975;
    this.longitude = -68.0592929;

    this.latitude2 = -38.9494408;
    this.longitude2 = -68.042551;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

    this.eventos = this.user.eventos;
    var aux;
    for (let variable of this.eventos) {
        aux = {
          kind: variable.kind,
          item: variable.item
        }    
        this.datosEventos.push(aux);
    }
    console.log(this.datosEventos);

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
}
