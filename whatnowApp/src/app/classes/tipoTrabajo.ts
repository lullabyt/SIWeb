import { TipoInstrumento } from './tipoInstrumento';

export class TipoTrabajo {
  _id: string;
  id: string;
  nombre: string;
  descripcion: string;
  tiposInstrumentos: [TipoInstrumento];
}
