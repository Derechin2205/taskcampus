<!--
Sync Impact Report

Version change: unknown -> 1.0.0
Modified principles: [TBD placeholders replaced with concrete TaskCampus principles]
Added sections: Frontend-only constraints, LocalStorage persistence rules
Removed sections: None removed; backend-related placeholders clarified as disallowed
Templates requiring updates: .specify/templates/plan-template.md ✅ updated
						 .specify/templates/spec-template.md ✅ updated
						 .specify/templates/tasks-template.md ✅ updated
Follow-up TODOs: None
-->

# TaskCampus Constitution

## Core Principles

### I. Frontend-Only Architecture (NON-NEGOTIABLE)
Todas las funcionalidades del proyecto MUST ejecutarse íntegramente en el navegador. No se permite añadir servidores, endpoints, bases de datos externas ni servicios en la nube. El repositorio sólo contiene código cliente (Vite + TypeScript + TailwindCSS) y artefactos de construcción.

### II. Persistencia en localStorage (MUST)
La única forma de persistencia permitida es el `localStorage` del navegador. La aplicación MUST inicializar datos por defecto cuando no exista contenido y todas las operaciones CRUD MUST actualizar `localStorage` de forma inmediata y determinista.

### III. Tipado Estricto y Modularidad (MUST)
El código MUST usar TypeScript con `strict` habilitado. Evitar `any`. La lógica se separa en módulos (`modules/`, `services/`, `utils/`, `types/`) y los tipos e interfaces se reutilizan entre módulos.

### IV. UI Minimalista y Accesible (SHOULD)
La interfaz debe ser responsiva y minimalista, usando utilidades de TailwindCSS y HTML semántico. La accesibilidad básica (teclas, labels, contraste) SHOULD ser considerada desde el inicio.

### V. Simplicidad y Mantenibilidad (SHOULD)
Preferir funciones pequeñas y reutilizables, nombres descriptivos y evitar duplicación. El código debe ser entendible por desarrolladores principiantes y fácil de mantener.

## Additional Constraints

- Stack: Vite (Vanilla), TypeScript, HTML5, TailwindCSS.
- No añadir frameworks de UI externos ni gestores de estado externos (Redux, MobX, etc.).
- No usar Docker, no añadir servicios externos ni autenticación.

## Development Workflow

- Ramas: usar ramas de características para el desarrollo.
- Commits: mensajes claros y atómicos; abrir Pull Requests para revisión.
- Tests: donde aplique, preferir pruebas ligeras y checks estáticos (TypeScript, linter).

## Storage Rules

Todas las operaciones de datos MUST usar helpers centralizados: `obtenerTareas()`, `guardarTareas()`, `agregarTarea()`, `actualizarTarea()`, `eliminarTarea()`. Estas funciones MUST asegurar la consistencia de `localStorage` y proveer puntos únicos para validación y migraciones de esquema local.

## Governance

Las enmiendas a esta constitución requieren una PR documentando los cambios y su justificación. Cambios menores (typos o clarificaciones) son `PATCH`, adiciones no rompientes son `MINOR`, y cambios que re-definen principios o eliminan garantías son `MAJOR`.

**Version**: 1.0.0 | **Ratified**: 2026-05-26 | **Last Amended**: 2026-05-26
