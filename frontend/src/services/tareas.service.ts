// src/services/tareas.service.ts
import type { Tarea } from '../types/tarea.interface';

const API_BASE_URL = 'http://localhost:5000/tasks';

/**
 * Capa de Abstracción de Datos Académicos.
 * Migración transparente de almacenamiento local (localStorage) a persistencia JSON distribuida vía API REST.
 */

// Interceptamos la inicialización para verificar que el servidor esté en línea de modo asíncrono
export function obtenerTareas(): Tarea[] {
  // Retornamos un array vacío de sincronización inicial
  // La carga reactiva en tiempo real se ejecutará desde el inicializador del flujo principal
  return [];
}

export async function obtenerTareasAsync(): Promise<Tarea[]> {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Fallo en la comunicación con el repositorio central.');
    return await response.json();
  } catch (error) {
    console.error('API REST Connection Error:', error);
    return [];
  }
}

export async function agregarTareaAsync(tarea: Omit<Tarea, 'id'>): Promise<Tarea | null> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarea),
    });
    if (!response.ok) throw new Error('Fallo al registrar la nueva asignación en la base de datos.');
    return await response.json();
  } catch (error) {
    console.error('API REST Connection Error:', error);
    return null;
  }
}

export async function actualizarTareaAsync(id: number, cambios: Partial<Tarea>): Promise<Tarea | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cambios),
    });
    if (!response.ok) throw new Error('Fallo al modificar los parámetros del registro.');
    return await response.json();
  } catch (error) {
    console.error('API REST Connection Error:', error);
    return null;
  }
}

export async function eliminarTareaAsync(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Fallo al remover la tupla del fichero físico.');
    const data = await response.json();
    return data.result === true;
  } catch (error) {
    console.error('API REST Connection Error:', error);
    return false;
  }
}