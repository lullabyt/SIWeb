import {Orden} from './orden';
import {TipoTrabajo} from './tipoTrabajo';

export class Trabajo {
    numeroTrabajo:string;
    fechaRealizacion:string;
    evaluacion:string;
    observacion:string;
    ordenServicio: Orden;
    tipoTrabajo: TipoTrabajo;
    _id: string;
}
