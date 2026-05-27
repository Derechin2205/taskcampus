import type { Tarea } from '../types/tarea.interface';
import { leerStorage, escribirStorage, inicializarStorage } from './storage.service';
import { tareasIniciales } from './initial-data';

/**
 * Devuelve la lista de tareas almacenadas en localStorage.
 * Si el almacenamiento está vacío, inicializa con tareas de ejemplo.
 */
export function obtenerTareas(): Tarea[] {
  inicializarStorage(JSON.stringify(tareasIniciales));
  const contenido = leerStorage();
  if (!contenido) {
    return [];
  }

  try {
    const tareas = JSON.parse(contenido) as Tarea[];
    return Array.isArray(tareas) ? tareas : [];
  } catch {
    return [];
  }
}

export function guardarTareas(tareas: Tarea[]): void {
  escribirStorage(JSON.stringify(tareas));
}

/**
 * Agrega una nueva tarea y genera un id incremental.
 */
export function agregarTarea(tarea: Omit<Tarea, 'id'>): Tarea {
  const tareas = obtenerTareas();
  const nuevoId = tareas.length > 0 ? Math.max(...tareas.map((item) => item.id)) + 1 : 1;
  const nuevaTarea: Tarea = { ...tarea, id: nuevoId };
  guardarTareas([...tareas, nuevaTarea]);
  return nuevaTarea;
}

/**
 * Actualiza una tarea existente. Devuelve la tarea actualizada o null si no existe.
 */
export function actualizarTarea(id: number, cambios: Partial<Tarea>): Tarea | null {
  const tareas = obtenerTareas();
  const indice = tareas.findIndex((tarea) => tarea.id === id);

  if (indice === -1) {
    return null;
  }

  const actualizada = { ...tareas[indice], ...cambios, id };
  tareas[indice] = actualizada;
  guardarTareas(tareas);
  return actualizada;
}

/**
 * Elimina una tarea por id y devuelve verdadero si se eliminó correctamente.
 */
export function eliminarTarea(id: number): boolean {
  const tareas = obtenerTareas();
  const resultado = tareas.filter((tarea) => tarea.id !== id);

  if (resultado.length === tareas.length) {
    return false;
  }

  guardarTareas(resultado);
  return true;
}
