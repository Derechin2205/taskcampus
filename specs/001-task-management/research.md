# Investigación: Decisiones de arquitectura de TaskCampus

## Decisión: Persistencia local frontend-only

**Qué se eligió**: `localStorage` del navegador para toda la persistencia.

**Justificación**: Cumple el requisito de la constitución de no usar backend, mantiene el proyecto ligero y preserva los datos tras recargar la página.

**Alternativas consideradas**:
- IndexedDB: más potente pero añade complejidad y no es necesaria para conjuntos de tareas académicas pequeñas.
- APIs remotas/backend: rechazada por las restricciones explícitas del proyecto.

## Decisión: Vite + TypeScript + TailwindCSS

**Qué se eligió**: Vite para el tooling de compilación, TypeScript para tipado estricto y TailwindCSS para estilos.

**Justificación**: Vite es rápido y adecuado para aplicaciones frontend modernas; TypeScript refuerza la regla de tipado estricto del proyecto; TailwindCSS permite un diseño minimalista y responsive sin librerías de componentes.

## Decisión: Diseño modular del código fuente

**Qué se eligió**: Módulos separados para tareas, filtros, resumen, servicios, tipos y utilidades.

**Justificación**: Apoya la mantenibilidad, la capacidad de prueba y la separación clara de responsabilidades. Esto coincide con las restricciones de arquitectura del usuario y facilita una base de código accesible para principiantes.
