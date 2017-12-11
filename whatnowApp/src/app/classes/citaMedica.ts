export class CitaMedica {
  _id: string;
  nombre: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  datosGeojson: {
    name: string;
    category: string;
    city: string;
    street: string;
    lat: Number;
    lng: Number;
  };
  nombreEspecialista: string;
  especialidad: string;
  telefono: string;
  tipoConsulta: string;
}
