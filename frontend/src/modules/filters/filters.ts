/**
 * Modelos de filtro para los estados y prioridades de tarea.
 */
export type FiltroEstado = '' | 'pendiente' | 'en proceso' | 'finalizada';
export type FiltroPrioridad = '' | 'baja' | 'media' | 'alta';

export type Filtros = {
  asignatura: string;
  prioridad: FiltroPrioridad;
  estado: FiltroEstado;
};

type FilterChange = (filtros: Filtros) => void;

let asignaturaInput: HTMLInputElement | null = null;
let prioridadSelect: HTMLSelectElement | null = null;
let estadoSelect: HTMLSelectElement | null = null;
let activeFiltersSection: HTMLDivElement | null = null;

export function configurarFiltros(onChange: FilterChange): void {
  const container = document.querySelector<HTMLDivElement>('#filters-container');
  if (!container) {
    throw new Error('Contenedor de filtros no encontrado.');
  }

  container.innerHTML = '';
  container.appendChild(crearCampoTexto('asignatura', 'Asignatura'));
  container.appendChild(crearCampoSelect('prioridad', 'Prioridad', ['', 'baja', 'media', 'alta']));
  container.appendChild(crearCampoSelect('estado', 'Estado', ['', 'pendiente', 'en proceso', 'finalizada']));

  activeFiltersSection = document.createElement('div');
  activeFiltersSection.className = 'mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600';
  container.appendChild(activeFiltersSection);

  if (!asignaturaInput || !prioridadSelect || !estadoSelect) {
    throw new Error('No se pudieron inicializar los controles de filtro.');
  }

  const actualizar = (): void => {
    const filtros = obtenerFiltros();
    renderActiveFilters(filtros);
    onChange(filtros);
  };

  asignaturaInput.addEventListener('input', actualizar);
  prioridadSelect.addEventListener('change', actualizar);
  estadoSelect.addEventListener('change', actualizar);
  renderActiveFilters(obtenerFiltros());
}

function crearCampoTexto(id: string, labelText: string): HTMLElement {
  const wrapper = document.createElement('div');
  const label = document.createElement('label');
  label.htmlFor = id;
  label.className = 'block text-sm font-medium text-slate-700';
  label.textContent = labelText;

  const input = document.createElement('input');
  input.id = id;
  input.type = 'text';
  input.className = 'mt-1 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200';

  wrapper.append(label, input);
  if (id === 'asignatura') {
    asignaturaInput = input;
  }
  return wrapper;
}

function crearCampoSelect(id: string, labelText: string, opciones: string[]): HTMLElement {
  const wrapper = document.createElement('div');
  const label = document.createElement('label');
  label.htmlFor = id;
  label.className = 'block text-sm font-medium text-slate-700';
  label.textContent = labelText;

  const select = document.createElement('select');
  select.id = id;
  select.className = 'mt-1 block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200';

  opciones.forEach((value) => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value === '' ? `Seleccionar ${labelText.toLowerCase()}` : value;
    select.appendChild(option);
  });

  wrapper.append(label, select);

  if (id === 'prioridad') {
    prioridadSelect = select;
  }

  if (id === 'estado') {
    estadoSelect = select;
  }

  return wrapper;
}

export function obtenerFiltros(): Filtros {
  if (!asignaturaInput || !prioridadSelect || !estadoSelect) {
    return { asignatura: '', prioridad: '', estado: '' };
  }

  return {
    asignatura: asignaturaInput.value.trim().toLowerCase(),
    prioridad: prioridadSelect.value as FiltroPrioridad,
    estado: estadoSelect.value as FiltroEstado,
  };
}

function renderActiveFilters(filtros: Filtros): void {
  if (!activeFiltersSection) {
    return;
  }

  const filtrosActivos = [];
  if (filtros.asignatura) {
    filtrosActivos.push(`Asignatura: ${filtros.asignatura}`);
  }
  if (filtros.prioridad) {
    filtrosActivos.push(`Prioridad: ${filtros.prioridad}`);
  }
  if (filtros.estado) {
    filtrosActivos.push(`Estado: ${filtros.estado}`);
  }

  if (filtrosActivos.length === 0) {
    activeFiltersSection.innerHTML = '<p>No hay filtros activos.</p>';
    return;
  }

  activeFiltersSection.innerHTML = `
    <div class="flex flex-wrap gap-2">
      ${filtrosActivos
        .map(
          (filtro) =>
            `<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">${filtro}</span>`
        )
        .join('')}
    </div>
  `;
}

export function aplicarFiltros<T extends { asignatura: string; prioridad: string; estado: string }>(items: T[], filtros: Filtros): T[] {
  return items.filter((item) => {
    const asignaturaMatch = filtros.asignatura === '' || item.asignatura.toLowerCase().includes(filtros.asignatura);
    const prioridadMatch = filtros.prioridad === '' || item.prioridad === filtros.prioridad;
    const estadoMatch = filtros.estado === '' || item.estado === filtros.estado;
    return asignaturaMatch && prioridadMatch && estadoMatch;
  });
}
