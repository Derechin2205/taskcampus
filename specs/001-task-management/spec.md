# Especificación de la funcionalidad: Gestión de tareas para estudiantes universitarios

**Branch**: `001-task-management`

**Creado**: 2026-05-26

**Estado**: Borrador

**Entrada**: Descripción del usuario: "TaskCampus es una aplicación web frontend-only que permite a los estudiantes universitarios gestionar tareas académicas localmente en el navegador usando localStorage. La aplicación ayuda a los estudiantes a organizar entregas, monitorear trabajo pendiente y seguir el progreso de la finalización de tareas. El sistema debe desarrollarse usando Vite (Vanilla), TypeScript, HTML, TailwindCSS, localStorage. No se permite backend ni base de datos."

## Escenarios de usuario y pruebas *(obligatorio)*

### Historia de usuario 1 - Gestionar tareas (Prioridad: P1)

El usuario puede crear, listar, editar y eliminar tareas académicas desde la interfaz.

**Por qué esta prioridad**: Provee la funcionalidad mínima viable para gestionar actividades académicas localmente.

**Prueba independiente**: Crear una tarea con todos los campos, verificar que aparece en la lista, editarla, recargar la página y comprobar que los cambios persisten; finalmente eliminarla y comprobar que desaparece y `localStorage` se actualiza.

**Escenarios de aceptación**:

1. **Dado** que el usuario abre la aplicación con `localStorage` inicializado, **cuando** crea una nueva tarea con título, asignatura, fecha de entrega, prioridad y estado, **entonces** la tarea aparece en la lista y persiste en `localStorage`.
2. **Dado** una tarea existente, **cuando** el usuario edita campos (título, descripción, asignatura, fecha, prioridad, estado), **entonces** los cambios se reflejan inmediatamente en la UI y en `localStorage`.
3. **Dado** una tarea existente, **cuando** el usuario la elimina, **entonces** se remueve de la lista y `localStorage` se actualiza inmediatamente.

---

### Historia de usuario 2 - Filtrado y búsqueda (Prioridad: P2)

El usuario puede filtrar la lista por estado, prioridad y asignatura; los filtros pueden combinarse.

**Prueba independiente**: Crear varias tareas con distintas prioridades, estados y asignaturas; aplicar filtros y comprobar que la lista resultante coincide con los criterios seleccionados.

**Escenarios de aceptación**:

1. **Dado** múltiples tareas con distintas prioridades, **cuando** el usuario selecciona `prioridad = alta`, **entonces** la lista muestra únicamente las tareas con prioridad `alta`.
2. **Dado** múltiples tareas, **cuando** el usuario aplica `estado = pendiente` y `asignatura = Matemáticas`, **entonces** la lista muestra solo las que cumplen ambos filtros.

---

### Historia de usuario 3 - Resumen y estadísticas (Prioridad: P3)

El usuario ve un panel resumen que muestra métricas: total de tareas, pendientes, finalizadas y tareas de alta prioridad.

**Prueba independiente**: Crear un conjunto de tareas con distintas combinaciones; verificar que los números del panel resumen coinciden con el estado real de la lista.

**Escenarios de aceptación**:

1. **Dado** 10 tareas con 3 finalizadas y 4 de prioridad alta, **cuando** el usuario abre la vista principal, **entonces** el panel muestra `Total: 10`, `Finalizadas: 3`, `Alta prioridad: 4`.

---

### Casos borde

- Qué ocurre con fechas inválidas o pasadas: el formulario debe validar la fecha de entrega y avisar al usuario.
- Manejo de IDs duplicados: el sistema debe generar IDs únicos (se recomienda incremento numérico o timestamp).
- Tamaño excesivo de `localStorage`: mostrar advertencia si la escritura falla por límite de espacio.

## Requisitos *(obligatorio)*

### Requisitos funcionales

- **FR-001**: El frontend DEBE permitir a los usuarios crear tareas con título, descripción, asignatura, fecha de entrega, prioridad y estado.
- **FR-002**: El frontend DEBE mostrar todas las tareas en una lista responsive; cada elemento debe mostrar título, asignatura, fecha de entrega, prioridad y estado.
- **FR-003**: El frontend DEBE permitir la edición de todos los campos de tarea y persistir los cambios inmediatamente en `localStorage`.
- **FR-004**: El frontend DEBE permitir eliminar tareas y actualizar `localStorage` inmediatamente.
- **FR-005**: El frontend DEBE proporcionar filtrado por estado, prioridad y asignatura; los filtros DEBEN ser combinables.
- **FR-006**: El frontend DEBE inicializar `localStorage` con datos de ejemplo cuando esté vacío.
- **FR-007**: El frontend DEBE presentar un panel de resumen con totales, pendientes, completadas y de alta prioridad.

### Entidades clave

- **Tarea**: representa una tarea académica con atributos:

  ```ts
  interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    asignatura: string;
    fecha_entrega: string; // fecha ISO
    prioridad: 'baja' | 'media' | 'alta';
    estado: 'pendiente' | 'en proceso' | 'finalizada';
    activo: boolean;
  }
  ```

## Criterios de éxito *(obligatorio)*

- **SC-001**: Los usuarios pueden crear, editar y eliminar tareas; después de cada operación, la lista de tareas refleja el cambio inmediatamente y `localStorage` contiene el nuevo estado.
- **SC-002**: Después de crear 5 tareas y recargar la página, las 5 tareas permanecen visibles e inalteradas (los datos persisten tras la recarga).
- **SC-003**: Filtrar por cualquier criterio individual devuelve el subconjunto correcto en el 100% de los casos de prueba (corrección determinista).
- **SC-004**: Las métricas del panel de resumen coinciden con los recuentos reales de la lista para varios conjuntos de datos de ejemplo.

## Supuestos

- Aplicación local de un solo usuario: no se requiere sincronización multiusuario.
- Entorno de navegador moderno con `localStorage` disponible.
- Formato de fecha: cadena ISO (`YYYY-MM-DD`) usada para `fecha_entrega`.
- Rendimiento: los conjuntos de datos son pequeños (cientos de tareas), por lo que las operaciones en memoria son aceptables.

## Notas

- Arquitectura sugerida: módulos para `services/localStorage`, `services/tareas`, `modules/ui`, `modules/filters`, `utils/date` y `types`.
- Proveer helpers: `obtenerTareas()`, `guardarTareas()`, `agregarTarea()`, `actualizarTarea()`, `eliminarTarea()`.

---

**Especificación lista para planificación**

## Almacenamiento: clave e inicialización

- **Clave de localStorage**: `taskcampus_tasks`
- **Inicialización**: Si `localStorage` no contiene la clave `taskcampus_tasks`, la aplicación DEBE inicializarla con datos simulados (`tareasIniciales`). Ejemplo:

```ts
const tareasIniciales: Tarea[] = [
  {
    id: 1,
    titulo: "Investigar GitHub Spec Kit",
    descripcion: "Leer documentación oficial",
    asignatura: "Ingeniería de Software",
    fecha_entrega: "2026-05-30",
    prioridad: "alta",
    estado: "pendiente",
    activo: true
  }
];
```

La función de inicialización debe escribir `JSON.stringify(tareasIniciales)` en `localStorage` bajo la clave indicada.

## Estructura de carpetas sugerida

```
frontend/
├── src/
│   ├── modules/
│   │   ├── tasks/
│   │   ├── filters/
│   │   └── summary/
│   ├── services/
│   │   └── storage.service.ts
│   ├── types/
│   │   └── tarea.interface.ts
+│   ├── utils/
│   ├── styles/
│   └── main.ts
├── public/
├── index.html
└── package.json
```

## Requisitos de la interfaz de usuario

- Usar `TailwindCSS` para estilos y utilidades.
- Ser responsiva y minimalista; evitar animaciones innecesarias.
- Usar HTML semántico y etiquetas accesibles (`label`, `button`, `aria-*`).
- Vistas mínimas: formulario de tarea, lista de tareas, panel de filtros, panel resumen.

## Estándares de TypeScript

- `tsconfig.json` debe habilitar `strict`.
- Evitar `any` y preferir tipos e interfaces en `types/`.
- Separar lógica de renderizado y lógica de almacenamiento en módulos diferentes.

## Servicios requeridos (API interna)

- `services/storage.service.ts` — responsable de leer y escribir en `localStorage` y de migraciones si cambian esquemas.
- `services/tareas.service.ts` — funciones de alto nivel que usan `storage.service` para CRUD:
  - `obtenerTareas(): Tarea[]`
  - `guardarTareas(tareas: Tarea[]): void`
  - `agregarTarea(tarea: Omit<Tarea, 'id'>): Tarea`
  - `actualizarTarea(id: number, cambios: Partial<Tarea>): Tarea | null`
  - `eliminarTarea(id: number): boolean`

## Reglas de renderizado

- La UI debe re-renderizarse automáticamente después de operaciones CRUD y cambios en filtros.
- Evitar recargar toda la página; usar manipulación DOM o un patrón reactivo simple.

## Validación

- Campos obligatorios: `titulo`, `asignatura`, `fecha_entrega`.
- Validar `fecha_entrega` como fecha ISO y no aceptar formatos inválidos.
- Prioridad y estado deben ser valores permitidos; rechazar valores desconocidos.
- No permitir títulos vacíos.

## Flujo de trabajo de Git

- Usar ramas de características (`feature/descripcion-corta`) y PR para merge.
- Commits claros y atómicos; incluir `docs:` o `feat:` como prefijo cuando corresponda.

## Criterios de aceptación (concretados)

- Crear tareas: el usuario puede crear una tarea y verla inmediatamente en la lista.
- Editar tareas: el usuario guarda cambios y al recargar la página persisten.
- Eliminar tareas: la tarea se elimina y no aparece tras recargar.
- Filtros: combinaciones de filtros devuelven conjuntos correctos.
- Persistencia: `localStorage` contiene el estado actualizado después de cada operación.

