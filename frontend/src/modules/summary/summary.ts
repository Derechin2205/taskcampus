import type { Tarea } from '../../types/tarea.interface';

type SummaryMetrics = {
  total: number;
  pendientes: number;
  finalizadas: number;
  altaPrioridad: number;
};

const summaryContainer = document.querySelector<HTMLDivElement>('#summary-container')!;
if (!summaryContainer) {
  throw new Error('Contenedor de resumen no encontrado.');
}

/**
 * Calcula las métricas de resumen en función de las tareas filtradas.
 */
export function calcularResumen(tareas: Tarea[]): SummaryMetrics {
  return {
    total: tareas.length,
    pendientes: tareas.filter((tarea) => tarea.estado === 'pendiente').length,
    finalizadas: tareas.filter((tarea) => tarea.estado === 'finalizada').length,
    altaPrioridad: tareas.filter((tarea) => tarea.prioridad === 'alta').length,
  };
}

/**
 * Renderiza las tarjetas de métricas en el panel de resumen.
 */
export function renderResumen(metrics: SummaryMetrics): void {
  summaryContainer.innerHTML = `
    <div class="rounded-3xl bg-slate-50 p-5">
      <p class="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Total de tareas</p>
      <p class="mt-3 text-3xl font-semibold text-slate-900">${metrics.total}</p>
    </div>
    <div class="rounded-3xl bg-slate-50 p-5">
      <p class="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Pendientes</p>
      <p class="mt-3 text-3xl font-semibold text-slate-900">${metrics.pendientes}</p>
    </div>
    <div class="rounded-3xl bg-slate-50 p-5">
      <p class="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Finalizadas</p>
      <p class="mt-3 text-3xl font-semibold text-slate-900">${metrics.finalizadas}</p>
    </div>
    <div class="rounded-3xl bg-slate-50 p-5">
      <p class="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Prioridad alta</p>
      <p class="mt-3 text-3xl font-semibold text-slate-900">${metrics.altaPrioridad}</p>
    </div>
  `;
}
