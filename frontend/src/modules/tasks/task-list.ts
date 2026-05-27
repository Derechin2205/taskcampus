import type { Tarea } from '../../types/tarea.interface';
import { formatearFecha, capitalizar } from '../../utils/helpers';

type Actions = {
  onEdit: (tarea: Tarea) => void;
  onDelete: (id: number) => void;
};

function getPrioridadBadge(prioridad: Tarea['prioridad']): string {
  switch (prioridad) {
    case 'baja':
      return 'badge-priority-baja';
    case 'media':
      return 'badge-priority-media';
    case 'alta':
      return 'badge-priority-alta';
    default:
      return 'badge-priority-baja';
  }
}

function getEstadoBadge(estado: Tarea['estado']): string {
  switch (estado) {
    case 'pendiente':
      return 'badge-status-pendiente';
    case 'en proceso':
      return 'badge-status-en-proceso';
    case 'finalizada':
      return 'badge-status-finalizada';
    default:
      return 'badge-status-pendiente';
  }
}

const taskListElement = document.querySelector<HTMLDivElement>('#task-list')!;
const taskCountElement = document.querySelector<HTMLElement>('#task-count')!;

if (!taskListElement || !taskCountElement) {
  throw new Error('No se encontraron los elementos de lista de tareas en el DOM.');
}

export function renderizarTareas(tareas: Tarea[], acciones: Actions): void {
  taskListElement.innerHTML = '';
  const filtradas = [...tareas];

  if (filtradas.length === 0) {
    taskListElement.innerHTML = '<p class="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">No hay tareas que mostrar.</p>';
    taskCountElement.textContent = '0 tareas';
    return;
  }

  taskCountElement.textContent = `${filtradas.length} tarea${filtradas.length === 1 ? '' : 's'}`;

  filtradas.forEach((tarea) => {
    const tarjeta = document.createElement('article');
    tarjeta.className = 'task-card rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm';
    tarjeta.innerHTML = `
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p class="text-sm font-medium text-slate-500">${capitalizar(tarea.asignatura)}</p>
          <h3 class="mt-1 text-xl font-semibold text-slate-900">${tarea.titulo}</h3>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="badge ${getPrioridadBadge(tarea.prioridad)}">${tarea.prioridad}</span>
          <span class="badge ${getEstadoBadge(tarea.estado)}">${tarea.estado}</span>
        </div>
      </div>
      <div class="mt-4 grid gap-3 sm:grid-cols-2">
        <p class="text-sm text-slate-600"><strong>Entrega:</strong> ${formatearFecha(tarea.fecha_entrega)}</p>
        <p class="text-sm text-slate-600"><strong>Activo:</strong> ${tarea.activo ? 'Sí' : 'No'}</p>
      </div>
      <p class="mt-4 text-sm leading-6 text-slate-700">${tarea.descripcion}</p>
      <div class="mt-5 flex flex-wrap gap-3">
        <button data-action="edit" data-id="${tarea.id}" class="button button-edit">Editar</button>
        <button data-action="delete" data-id="${tarea.id}" class="button button-delete">Eliminar</button>
      </div>
    `;

    taskListElement.appendChild(tarjeta);
  });

  taskListElement.querySelectorAll('button').forEach((button) => {
    const action = button.getAttribute('data-action');
    const idValue = button.getAttribute('data-id');
    const id = idValue ? Number(idValue) : undefined;

    if (!action || !id) {
      return;
    }

    if (action === 'edit') {
      button.addEventListener('click', () => acciones.onEdit(tareas.find((tarea) => tarea.id === id)!));
    }

    if (action === 'delete') {
      button.addEventListener('click', () => acciones.onDelete(id));
    }
  });
}
