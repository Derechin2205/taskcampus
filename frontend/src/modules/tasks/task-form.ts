import type { Tarea } from '../../types/tarea.interface';

type SubmitHandler = (tarea: Omit<Tarea, 'id'>, id?: number) => void;

type FormState = {
  form: HTMLFormElement;
  inputs: Record<string, HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
  statusNode: HTMLElement;
};

const state = {} as FormState;

function crearInputs() {
  const titulo = document.querySelector<HTMLInputElement>('#titulo');
  const asignatura = document.querySelector<HTMLInputElement>('#asignatura');
  const fecha_entrega = document.querySelector<HTMLInputElement>('#fecha_entrega');
  const prioridad = document.querySelector<HTMLSelectElement>('#prioridad');
  const estado = document.querySelector<HTMLSelectElement>('#estado');
  const activo = document.querySelector<HTMLSelectElement>('#activo');
  const descripcion = document.querySelector<HTMLTextAreaElement>('#descripcion');
  const statusNode = document.querySelector<HTMLElement>('#form-status');
  const form = document.querySelector<HTMLFormElement>('#task-form');

  if (!form || !titulo || !asignatura || !fecha_entrega || !prioridad || !estado || !activo || !descripcion || !statusNode) {
    throw new Error('Error crítico: Interfaces del formulario de control no detectadas en el árbol DOM.');
  }

  state.form = form;
  state.inputs = {
    titulo,
    asignatura,
    fecha_entrega,
    prioridad,
    estado,
    activo,
    descripcion,
  };
  state.statusNode = statusNode;
}

export function configurarFormulario(onSubmit: SubmitHandler): void {
  crearInputs();
  const resetButton = document.querySelector<HTMLButtonElement>('#reset-button');

  state.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const valores = obtenerValores();
    if (!validarFormulario(valores)) {
      return;
    }
    const id = obtenerIdActual();
    onSubmit(valores, id);
    state.form.reset();
    
    // Aseguramos limpiar el input hidden del ID de forma segura
    const idInput = state.form.querySelector<HTMLInputElement>('#task-id');
    if (idInput) idInput.value = '';
    
    showStatus(
      id ? 'Registro académico modificado en el repositorio local.' : 'Nueva actividad inyectada con éxito en el sistema.', 
      'text-emerald-700 font-semibold'
    );
  });

  resetButton?.addEventListener('click', () => {
    state.form.reset();
    const idInput = state.form.querySelector<HTMLInputElement>('#task-id');
    if (idInput) idInput.value = '';
    showStatus('Formulario operativo restablecido. Listo para captura.', 'text-slate-500');
  });
}

export function cargarTareaEnFormulario(tarea: Tarea): void {
  const idInput = state.form.querySelector<HTMLInputElement>('#task-id');
  if (idInput) idInput.value = String(tarea.id);
  
  state.inputs.titulo.value = tarea.titulo;
  state.inputs.asignatura.value = tarea.asignatura;
  state.inputs.fecha_entrega.value = tarea.fecha_entrega;
  state.inputs.prioridad.value = tarea.prioridad;
  state.inputs.estado.value = tarea.estado;
  state.inputs.activo.value = String(tarea.activo);
  state.inputs.descripcion.value = tarea.descripcion;
  showStatus('Cargando especificaciones técnicas en los campos de edición.', 'text-indigo-600 font-medium');
}

export function cargarValoresIniciales(): void {
  state.form.reset();
  const idInput = state.form.querySelector<HTMLInputElement>('#task-id');
  if (idInput) idInput.value = '';
  showStatus('Sistema listo para la indexación de tareas.', 'text-slate-500');
}

function obtenerIdActual(): number | undefined {
  const idInput = state.form.querySelector<HTMLInputElement>('#task-id');
  const value = idInput ? idInput.value : '';
  return value ? Number(value) : undefined;
}

function obtenerValores(): Omit<Tarea, 'id'> {
  return {
    titulo: state.inputs.titulo.value.trim(),
    asignatura: state.inputs.asignatura.value.trim(),
    fecha_entrega: state.inputs.fecha_entrega.value,
    prioridad: state.inputs.prioridad.value as Tarea['prioridad'],
    estado: state.inputs.estado.value as Tarea['estado'],
    activo: state.inputs.activo.value === 'true',
    descripcion: state.inputs.descripcion.value.trim(),
  };
}

function validarFormulario(valores: Omit<Tarea, 'id'>): boolean {
  clearValidation();

  const camposInvalidos: Array<{ field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement; message: string }> = [];

  if (valores.titulo.length === 0) {
    camposInvalidos.push({ field: state.inputs.titulo, message: 'Campo requerido: El nombre de la actividad es obligatorio.' });
  }

  if (valores.asignatura.length === 0) {
    camposInvalidos.push({ field: state.inputs.asignatura, message: 'Campo requerido: La cátedra universitaria es obligatoria.' });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(valores.fecha_entrega)) {
    camposInvalidos.push({ field: state.inputs.fecha_entrega, message: 'Formato inválido: Ingrese una fecha cronológica válida.' });
  }

  if (!['baja', 'media', 'alta'].includes(valores.prioridad)) {
    camposInvalidos.push({ field: state.inputs.prioridad, message: 'Validación fallida: Seleccione un nivel de prioridad válido.' });
  }

  if (!['pendiente', 'en proceso', 'finalizada'].includes(valores.estado)) {
    camposInvalidos.push({ field: state.inputs.estado, message: 'Validación fallida: Seleccione un estado operativo válido.' });
  }

  if (valores.descripcion.length === 0) {
    camposInvalidos.push({ field: state.inputs.descripcion, message: 'Campo requerido: Las especificaciones técnicas son obligatorias.' });
  }

  if (camposInvalidos.length > 0) {
    camposInvalidos.forEach(({ field }) => marcarCampoInvalido(field));
    showStatus(camposInvalidos[0].message, 'text-rose-600 font-medium');
    return false;
  }

  return true;
}

function clearValidation(): void {
  Object.values(state.inputs).forEach((input) => {
    input.classList.remove('border-rose-500', 'ring-2', 'ring-rose-100');
  });
}

function marcarCampoInvalido(field: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void {
  field.classList.add('border-rose-500', 'ring-2', 'ring-rose-100');
}

function showStatus(message: string, classes: string): void {
  state.statusNode.textContent = message;
  state.statusNode.className = classes;
}