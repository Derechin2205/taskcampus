# Inicio rápido: TaskCampus

## Configuración

1. Instalar dependencias:

```bash
cd frontend
npm install
```

2. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

3. Abrir la URL local que muestra el terminal.

## Desarrollo

- `frontend/src/main.ts` es el punto de entrada de la aplicación.
- `frontend/src/services/` contiene los servicios de almacenamiento y tareas.
- `frontend/src/modules/` contiene los módulos de UI de tareas, filtros y resumen.
- `frontend/src/types/` contiene la interfaz `Tarea`.

### Compilación y previsualización

```bash
cd frontend
npm run build
npm run preview
```

Usa la URL local que muestre el terminal para abrir la app en el navegador.

## Local Storage

- La aplicación usa la clave `taskcampus_tasks` en `localStorage`.
- Si la clave falta, la app inicializa tareas de ejemplo automáticamente.
- Todas las acciones CRUD actualizan `localStorage` de inmediato.

## Validación

La UI valida:
- título, asignatura y fecha de entrega obligatorios
- `fecha_entrega` válida
- valores permitidos para prioridad y estado
- título de tarea no vacío
