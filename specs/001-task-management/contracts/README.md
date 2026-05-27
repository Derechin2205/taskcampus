# Contratos: TaskCampus

Esta funcionalidad no expone APIs externas ni contratos backend. El contrato interno se define mediante las interfaces de los módulos y las firmas de las funciones de servicio.

## Contratos internos

- `services/storage.service.ts`: lee y escribe la clave `taskcampus_tasks` en `localStorage`.
- `services/tareas.service.ts`: provee operaciones CRUD para objetos `Tarea`.
- `types/tarea.interface.ts`: define el contrato de datos de `Tarea`.
- Los módulos de UI en `modules/` consumen tareas y estado de filtros mediante funciones claramente definidas.

## Notas

Como es una aplicación frontend-only, todos los contratos son internos y basados en módulos en lugar de red.
