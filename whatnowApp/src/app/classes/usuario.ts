import { Nota } from './nota';
//import {Proyecto} from './proyecto';

export class Usuario {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
  genero: string;
  fechaNacimiento: Date;
  localidadActual: string;
  lugarTrabajo: string;
  lugarEstudio: string;
  _id: string;

  notas: [Nota];

  //cualquier eventoGeo
  eventos: [{
    kind: string,
    item: string
  }];

  //  proyectos: [Proyecto];
}
