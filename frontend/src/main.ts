import type { Tarea } from './types/tarea.interface';
import { configurarFormulario, cargarTareaEnFormulario, cargarValoresIniciales } from './modules/tasks/task-form';
import { renderizarTareas } from './modules/tasks/task-list';
import { configurarFiltros, aplicarFiltros, Filtros } from './modules/filters/filters';
import { calcularResumen, renderResumen } from './modules/summary/summary';
import { agregarTarea, actualizarTarea, eliminarTarea, obtenerTareas } from './services/tareas.service';

let tareas: Tarea[] = [];
let filtros: Filtros = { asignatura: '', prioridad: '', estado: '' };

function actualizarVista(): void {
  const tareasFiltradas = aplicarFiltros(tareas, filtros);

  renderizarTareas(tareasFiltradas, {
    onEdit(tarea) {
      cargarTareaEnFormulario(tarea);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    onDelete(id) {
      eliminarTarea(id);
      tareas = obtenerTareas();
      actualizarVista();
    },
  });

  renderResumen(calcularResumen(tareasFiltradas));
}

function inicializarApp(): void {
  tareas = obtenerTareas();

  configurarFiltros((nuevosFiltros) => {
    filtros = nuevosFiltros;
    actualizarVista();
  });

  configurarFormulario((tarea, id) => {
    if (id) {
      actualizarTarea(id, tarea);
    } else {
      agregarTarea(tarea);
    }

    tareas = obtenerTareas();
    cargarValoresIniciales();
    actualizarVista();
  });

  // Inicializa el formulario y la vista sin datos provenientes del usuario.
  cargarValoresIniciales();
  actualizarVista();
}

inicializarApp();
