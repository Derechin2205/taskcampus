---
description: "Lista de tareas para la implementación de la funcionalidad TaskCampus"
---

# Tareas: Gestión académica de tareas en TaskCampus

**Entrada**: Documentos de diseño en `/specs/001-task-management/`

**Requisitos previos**: plan.md (obligatorio), spec.md (obligatorio para historias de usuario), research.md, data-model.md, contracts/

## Fase 1: Configuración (Infraestructura compartida)

**Propósito**: Inicialización del proyecto y estructura básica

- [X] T001 Crear la estructura del proyecto frontend en `frontend/` con `src/`, `public/`, `index.html`, `package.json` y `tsconfig.json`
- [X] T002 Inicializar el proyecto Vite + TypeScript en `frontend/` usando configuración vanilla
- [X] T003 [P] Instalar TailwindCSS y configurar `frontend/postcss.config.js` y `frontend/tailwind.config.cjs`
- [X] T004 [P] Crear el entrypoint inicial `frontend/src/main.ts` y `frontend/src/styles/main.css`
- [X] T005 [P] Añadir entradas a `.gitignore` para `node_modules`, salida de build y archivos de entorno local

---

## Fase 2: Fundacional (Requisitos bloqueantes)

**Propósito**: Infraestructura central del frontend que DEBE estar completa antes de que cualquier historia de usuario pueda implementarse

- [X] T006 Crear `frontend/src/types/tarea.interface.ts` con la interfaz `Tarea` y los valores enum permitidos
- [X] T007 Crear `frontend/src/services/storage.service.ts` con `leerStorage()` y `escribirStorage()` para la clave `taskcampus_tasks`
- [X] T008 Crear `frontend/src/services/tareas.service.ts` con `obtenerTareas()`, `guardarTareas()`, `agregarTarea()`, `actualizarTarea()`, `eliminarTarea()`
- [X] T009 Crear `frontend/src/services/initial-data.ts` con `tareasIniciales` y la lógica de inicialización cuando `localStorage` esté vacío
- [X] T010 Crear `frontend/src/modules/tasks/task-form.ts` como scaffold para renderizar el formulario de tarea y leer valores del formulario
- [X] T011 Crear `frontend/src/modules/tasks/task-list.ts` como scaffold para renderizar tarjetas de tareas y el contenedor de la lista
- [X] T012 Crear `frontend/src/modules/filters/filters.ts` como scaffold para el estado de filtros y los controles de UI
- [X] T013 Crear `frontend/src/modules/summary/summary.ts` como scaffold para renderizar métricas de resumen
- [X] T014 Implementar la estructura HTML base en `frontend/index.html` con secciones de encabezado, main y pie de página
- [X] T015 Implementar estilos base responsivos en `frontend/src/styles/main.css` usando clases utilitarias de Tailwind
- [X] T016 Añadir estructura HTML semántica y etiquetas de accesibilidad para campos del formulario de tarea en `frontend/index.html`

**Punto de control**: La base está lista; la implementación de historias de usuario puede comenzar en paralelo

---

## Fase 3: Historia de usuario 1 - Gestionar tareas (Prioridad: P1) 🎯 MVP

**Meta**: Permitir la creación, edición, eliminación y listado de tareas académicas con persistencia en localStorage.

**Prueba independiente**: Crear una tarea, verificar que aparece en la lista, editarla, recargar la página y confirmar la persistencia; luego eliminarla y confirmar su eliminación tanto en la UI como en `localStorage`.

### Implementación para Historia de usuario 1

- [X] T017 [US1] Implementar el envío del formulario de creación de tareas en `frontend/src/modules/tasks/task-form.ts`
- [X] T018 [US1] Implementar la lógica de renderizado de la lista de tareas en `frontend/src/modules/tasks/task-list.ts`
- [X] T019 [US1] Implementar el flujo de creación de tareas en `frontend/src/services/tareas.service.ts` y persistir con `storage.service.ts`
- [X] T020 [US1] Implementar el flujo de edición de tareas en `frontend/src/services/tareas.service.ts` y lógica de actualización de UI en `frontend/src/modules/tasks/task-list.ts`
- [X] T021 [US1] Implementar el flujo de eliminación de tareas en `frontend/src/services/tareas.service.ts` y la lógica de eliminación de UI en `frontend/src/modules/tasks/task-list.ts`
- [X] T022 [US1] Conectar el formulario de tareas, la lista de tareas y los servicios de almacenamiento en `frontend/src/main.ts`
- [X] T023 [US1] Asegurar que `frontend/src/main.ts` inicializa tareas desde `localStorage` o datos de muestra al cargar la app
- [X] T024 [US1] Añadir validación para campos requeridos y `fecha_entrega` válida en `frontend/src/modules/tasks/task-form.ts`

**Punto de control**: La Historia de usuario 1 debe ser completamente funcional y probada de forma independiente

---

## Fase 4: Historia de usuario 2 - Filtrado y búsqueda (Prioridad: P2)

**Meta**: Permitir que los usuarios filtren tareas dinámicamente por estado, prioridad y asignatura.

**Prueba independiente**: Crear tareas con múltiples estados, prioridades y asignaturas; aplicar filtros y verificar que la lista mostrada coincide con los criterios combinados.

### Implementación para Historia de usuario 2

- [X] T025 [US2] Implementar el modelo de estado de filtros en `frontend/src/modules/filters/filters.ts`
- [X] T026 [US2] Implementar los controles de UI de filtros en `frontend/src/modules/filters/filters.ts`
- [X] T027 [US2] Implementar la lógica de aplicación de filtros en `frontend/src/modules/tasks/task-list.ts`
- [X] T028 [US2] Conectar los filtros con el pipeline de renderizado de tareas en `frontend/src/main.ts`
- [X] T029 [US2] Añadir soporte de filtrado combinado por estado, prioridad y asignatura en `frontend/src/modules/filters/filters.ts`
- [X] T030 [US2] Añadir retroalimentación de UI para filtros activos en `frontend/src/modules/filters/filters.ts`

**Punto de control**: La Historia de usuario 2 debe ser funcional de forma independiente

---

## Fase 5: Historia de usuario 3 - Resumen y estadísticas (Prioridad: P3)

**Meta**: Mostrar un tablero de resumen que se actualice automáticamente después de operaciones CRUD y filtrado.

**Prueba independiente**: Crear tareas con varios estados y prioridades; verificar que el panel de resumen muestra los totales correctos y se actualiza después de cambiar tareas.

### Implementación para Historia de usuario 3

- [X] T031 [US3] Implementar helpers de cálculo de resumen en `frontend/src/modules/summary/summary.ts`
- [X] T032 [US3] Renderizar métricas de resumen en `frontend/src/modules/summary/summary.ts`
- [X] T033 [US3] Conectar la actualización del resumen a los cambios de la lista de tareas en `frontend/src/main.ts`
- [X] T034 [US3] Incluir totales de tareas, pendientes, completadas y de alta prioridad en `frontend/src/modules/summary/summary.ts`
- [X] T035 [US3] Asegurar que el panel de resumen se actualice tras crear, editar, eliminar y filtrar tareas

**Punto de control**: La Historia de usuario 3 debe ser funcional de forma independiente

---

## Fase 6: Pulido y preocupaciones transversales

**Propósito**: Mejorar la UX, la calidad del código y la documentación de la funcionalidad.

- [X] T036 [P] Mejorar el diseño responsive y el estilo Tailwind en `frontend/src/styles/main.css`
- [X] T037 [P] Añadir mensajes de validación en línea y visualización de errores en `frontend/src/modules/tasks/task-form.ts`
- [X] T038 [P] Añadir comentarios y documentación a `frontend/src/services/*` y `frontend/src/modules/*`
- [X] T039 [P] Actualizar `specs/001-task-management/quickstart.md` con comandos exactos de ejecución y previsualización
- [X] T040 [P] Verificar la lógica de inicialización de `taskcampus_tasks` en `frontend/src/services/initial-data.ts`
- [X] T041 [P] Validar que la aplicación funciona sin backend y persiste tras recargar la página

---

## Dependencias y orden de ejecución

### Dependencias de fase

- **Configuración (Fase 1)**: Sin dependencias - puede comenzar inmediatamente
- **Fundacional (Fase 2)**: Depende de la finalización de Configuración - BLOQUEA todas las historias de usuario
- **Historias de usuario (Fase 3+)**: Dependen de la finalización de la fase Fundacional
- **Pulido (Fase 6)**: Depende de que todas las historias de usuario estén completas

### Dependencias de historias de usuario

- **Historia de usuario 1 (P1)**: Puede comenzar después de la Fase 2 y es la base MVP para las operaciones CRUD de tareas
- **Historia de usuario 2 (P2)**: Puede comenzar después de la Fase 2 e debe integrarse con la lógica de renderizado de la lista de tareas
- **Historia de usuario 3 (P3)**: Puede comenzar después de la Fase 2 e debe integrarse con las actualizaciones de tareas de US1/US2

### Oportunidades paralelas

- `T003`, `T005`, `T006`, `T007`, `T008`, `T009`, `T010`, `T011`, `T012`, `T013` pueden ejecutarse en paralelo durante el setup y el trabajo fundacional
- `T017`–`T024` pueden continuar de forma independiente a `T025`–`T030` después de la fase fundacional
- `T031`–`T035` pueden implementarse mientras se pule la US2 y se finalizan los filtros
- `T036`–`T041` son tareas de pulido transversales adecuadas para ejecución paralela una vez que existe la funcionalidad central

## Ejemplo paralelo: Historia de usuario 1

- [ ] T017 [US1] Implementar el envío del formulario de creación de tareas en `frontend/src/modules/tasks/task-form.ts`
- [ ] T018 [US1] Implementar la lógica de renderizado de la lista de tareas en `frontend/src/modules/tasks/task-list.ts`
- [ ] T019 [US1] Implementar el flujo de creación de tareas en `frontend/src/services/tareas.service.ts`

## Estrategia de implementación

### MVP primero

1. Completar la Fase 1: Configuración
2. Completar la Fase 2: Fundacional
3. Entregar la Fase 3: Historia de usuario 1
4. Validar CRUD y persistencia de forma independiente
5. Detener y revisar antes de agregar filtrado y resumen

### Entrega incremental

1. Terminar las tareas de configuración y fundacionales
2. Entregar US1 como el slice inicial funcional
3. Añadir filtrado US2 y verificar el comportamiento
4. Añadir resumen US3 y verificar métricas
5. Pulir UI, validación y documentación

### Alcance MVP sugerido

- Creación básica de tareas, listado, edición y eliminación
- Inicialización y persistencia en `localStorage`
- Diseño UI básico y renderizado de tareas
- Validación mínima para campos obligatorios

***
