# Modelo de datos: TaskCampus

## Entidad: Tarea

Representa una tarea académica gestionada por el usuario.

```ts
interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  asignatura: string;
  fecha_entrega: string; // cadena de fecha ISO
  prioridad: "baja" | "media" | "alta";
  estado: "pendiente" | "en proceso" | "finalizada";
  activo: boolean;
}
```

## Modelo de almacenamiento

- `taskcampus_tasks` en `localStorage` contiene el array serializado de objetos `Tarea`.
- La aplicación inicializa esta clave con tareas predeterminadas si no está presente.

## Modelo de filtros

El estado de los filtros puede representarse como:

```ts
interface Filtros {
  asignatura: string;
  prioridad: "baja" | "media" | "alta" | "";
  estado: "pendiente" | "en proceso" | "finalizada" | "";
}
```

## Modelo de resumen

Métricas derivadas:
- total de tareas
- tareas pendientes
- tareas finalizadas
- tareas de prioridad alta

Estos valores se calculan a partir de la lista activa de tareas y no requieren persistencia separada.
