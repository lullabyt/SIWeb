import { Component, OnInit } from '@angular/core';
import { DateAdapter, NativeDateAdapter } from '@angular/material';


//sweet alert
import swal from 'sweetalert2';

@Component({
  selector: 'app-crearevento',
  templateUrl: './crearevento.component.html',
  styleUrls: ['./crearevento.component.css']
})
export class CreareventoComponent implements OnInit {

  private selectedDateFrom: Date = null;
  private selectedDateTo: Date = null;
  private descripcion: String = "";
  private nombre: String;
  private calle: String;
  private altura: String;
  private localidad: String;
  private tipo: String;

  private nombreEspecialista: String = "";
  private especialidad: String = "";
  private telefono: String = "";
  private tipoConsulta: String = "";

  private tipoAcademico: String = "";

  private participantes: String = "";

  private dinero: String = "";

  constructor(private dateAdapter: DateAdapter<NativeDateAdapter>
  ) {
    dateAdapter.setLocale('es-ES');
  }

  ngOnInit() {
  }

  crearEvento() {

    swal({
      title: 'Listo!',
      text: 'Evento creado',
      type: 'success',
      confirmButtonText: 'Ok',
      confirmButtonColor: '#3b3a30',
      allowOutsideClick: false,
      allowEscapeKey: false
    });

  }

  formCompletado() {
    if (this.nombre && this.calle && this.altura && this.localidad && this.tipo) {
      return true;
    } else { return false; }

  }

}
