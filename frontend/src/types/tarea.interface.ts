export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  asignatura: string;
  fecha_entrega: string;
  prioridad: 'baja' | 'media' | 'alta';
  estado: 'pendiente' | 'en proceso' | 'finalizada';
  activo: boolean;
}
