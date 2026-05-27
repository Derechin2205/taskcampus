# Plan de implementación: Gestión académica de tareas en TaskCampus

**Branch**: `feature/001-task-management` | **Fecha**: 2026-05-26 | **Spec**: [spec.md](spec.md)

**Entrada**: Especificación de la funcionalidad en `/specs/001-task-management/spec.md`

## Resumen

TaskCampus es un gestor de tareas académicas frontend-only construido con Vite, TypeScript, TailwindCSS y `localStorage` del navegador. La aplicación proporcionará creación, edición, eliminación, filtrado y métricas de resumen de tareas sin ningún backend o dependencia remota.

## Contexto técnico

**Lenguaje/Versión**: TypeScript dirigido a navegadores modernos (ES2022/ESNext) con soporte de compilación Vite.

**Dependencias principales**: Vite, TypeScript, TailwindCSS.

**Almacenamiento**: `localStorage` del navegador con la clave `taskcampus_tasks`.

**Pruebas**: Verificaciones estáticas de TypeScript, validación manual de la UI y verificación ligera en el navegador.

**Plataforma objetivo**: Navegadores modernos de escritorio y móviles; SPA responsive.

**Tipo de proyecto**: Aplicación web frontend-only.

**Objetivos de rendimiento**: Renderizado rápido inicial, tamaño de bundle pequeño, actualizaciones UI responsivas y persistencia inmediata.

**Restricciones**: Sin backend, sin APIs, sin bases de datos, sin autenticación, sin servicios en la nube, sin manejadores de estado externos.

**Escala/Alcance**: Usuario único, persistencia local para flujos académicos de tareas.

## Revisión de constitución

- Debe permanecer frontend-only. Sin código del lado del servidor, sin endpoints REST/GraphQL, sin bases de datos.
- Debe persistir exclusivamente en `localStorage` del navegador.
- Debe usar TypeScript con tipado estricto y evitar `any`.
- Debe usar TailwindCSS y HTML semántico para una UI mínima y responsive.

No se planean violaciones a la constitución.

## Project Structure

### Documentation (this feature)

```text
specs/001-task-management/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── README.md
├── spec.md
└── checklists/
    └── requirements.md
```

### Código fuente

```text
frontend/
├── src/
│   ├── modules/
│   │   ├── tasks/
│   │   │   ├── task-form.ts
│   │   │   ├── task-list.ts
│   │   │   └── task-actions.ts
│   │   ├── filters/
│   │   │   └── filters.ts
│   │   └── summary/
│   │       └── summary.ts
│   ├── services/
│   │   ├── storage.service.ts
│   │   └── tareas.service.ts
│   ├── types/
│   │   └── tarea.interface.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── styles/
│   │   └── main.css
│   └── main.ts
├── public/
├── index.html
├── package.json
└── tsconfig.json
```

**Decisión de estructura**: Una aplicación frontend única bajo `frontend/` con directorios modulares para tareas, filtros, resumen, servicios, tipos y utilidades.

## Plan de fases

### Fase 1 — Configuración del proyecto
- Inicializar Vite + TypeScript.
- Configurar TailwindCSS.
- Crear la estructura de carpetas del frontend.
- Añadir `tsconfig.json` con `strict` activado.

### Fase 2 — Capa de datos
- Definir la interfaz `Tarea` en `types/tarea.interface.ts`.
- Implementar `storage.service.ts` para la gestión de `localStorage`.
- Implementar `tareas.service.ts` para operaciones CRUD.
- Inicializar datos de ejemplo cuando `localStorage` esté vacío.

### Fase 3 — Capa de UI
- Construir los módulos del formulario de tarea y la lista de tareas.
- Construir el módulo de controles de filtro.
- Construir el módulo del panel de resumen.
- Conectar las actualizaciones de renderizado para creación, edición, eliminación y filtrado.

### Fase 4 — Lógica de negocio
- Conectar las acciones CRUD con los servicios de almacenamiento.
- Implementar filtrado dinámico por estado, prioridad y asignatura.
- Implementar el recálculo de métricas de resumen.
- Añadir validación para campos obligatorios y reglas de fecha/enum.

### Fase 5 — Validación
- Verificar la persistencia tras recargas.
- Confirmar que la UI se actualiza en cada cambio CRUD/filtrado.
- Validar el diseño responsive y Tailwind.

## Seguimiento de complejidad

No se esperan violaciones a la constitución. El diseño permanece intencionalmente simple y enfocado en frontend.

## Notas

- Usar funciones helper para las operaciones de `localStorage`: `obtenerTareas()`, `guardarTareas()`, `agregarTarea()`, `actualizarTarea()`, `eliminarTarea()`.
- Mantener la renderización de la UI separada de la lógica de datos y almacenamiento.
- Favorecer módulos pequeños reutilizables y evitar bibliotecas externas innecesarias.
