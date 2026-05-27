import type { Tarea } from './types/tarea.interface';
import { configurarFormulario, cargarTareaEnFormulario, cargarValoresIniciales } from './modules/tasks/task-form';
import { renderizarTareas } from './modules/tasks/task-list';
import { configurarFiltros, aplicarFiltros, Filtros } from './modules/filters/filters';
import { calcularResumen, renderResumen } from './modules/summary/summary';
import { obtenerTareasAsync, agregarTareaAsync, actualizarTareaAsync, eliminarTareaAsync } from './services/tareas.service';

let tareas: Tarea[] = [];
let filtros: Filtros = { asignatura: '', prioridad: '', estado: '' };

async function actualizarVista(): Promise<void> {
  const tareasFiltradas = aplicarFiltros(tareas, filtros);

  renderizarTareas(tareasFiltradas, {
    onEdit(tarea) {
      cargarTareaEnFormulario(tarea);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    async onDelete(id) {
      // Mensaje de advertencia interactivo antes de procesar el DELETE en PostgreSQL
      const confirmarBorrado = confirm('¿Está completamente seguro de que desea remover esta tarea del repositorio académico? Esta acción no se puede deshacer.');
      
      if (confirmarBorrado) {
        const exito = await eliminarTareaAsync(id);
        if (exito) {
          tareas = await obtenerTareasAsync();
          actualizarVista();
        }
      }
    },
  });

  renderResumen(calcularResumen(tareasFiltradas));
}

async function inicializarApp(): Promise<void> {
  // Carga inicial asíncrona de datos desde la base de datos de PostgreSQL
  tareas = await obtenerTareasAsync();

  configurarFiltros((nuevosFiltros) => {
    filtros = nuevosFiltros;
    actualizarVista();
  });

  configurarFormulario(async (tarea, id) => {
    if (id) {
      await actualizarTareaAsync(id, tarea);
    } else {
      await agregarTareaAsync(tarea);
    }

    tareas = await obtenerTareasAsync();
    cargarValoresIniciales();
    actualizarVista();
  });

  cargarValoresIniciales();
  actualizarVista();
}

inicializarApp();