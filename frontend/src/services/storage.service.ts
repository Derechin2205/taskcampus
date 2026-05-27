const STORAGE_KEY = 'taskcampus_tasks';

export function leerStorage(): string | null {
  return window.localStorage.getItem(STORAGE_KEY);
}

export function escribirStorage(valor: string): void {
  window.localStorage.setItem(STORAGE_KEY, valor);
}

export function inicializarStorage(datos: string): void {
  if (leerStorage() === null) {
    escribirStorage(datos);
  }
}
