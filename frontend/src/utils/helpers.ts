export function formatearFecha(fecha: string): string {
  const date = new Date(fecha);
  if (Number.isNaN(date.getTime())) {
    return fecha;
  }
  return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
}

export function capitalizar(texto: string): string {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
