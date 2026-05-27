# Campus de Tareas — Sistema de Control de Pendientes Académicos

Campus de Tareas es una aplicación web con arquitectura cliente-servidor diseñada para que los estudiantes organicen sus deberes del ciclo, realicen búsquedas dinámicas en tiempo real y gestionen sus actividades pendientes con almacenamiento directo en una base de datos relacional.

Este proyecto aplica los principios de la metodología **Spec Driven Development (SDD)** apoyado por **GitHub Spec Kit**, lo que garantiza que todo el software fue planificado y estructurado a partir de requerimientos funcionales técnicos antes de iniciar la fase de codificación.

---

## 🛠️ Tecnologías y Lenguajes Utilizados

El ecosistema está completamente desacoplado en dos capas operativas independientes:
* **Frontend (Cliente):** TypeScript, HTML5 y Tailwind CSS (Compilado y servido de manera reactiva con Vite en el puerto `8000`).
* **Backend (Servidor API REST):** Python 3.14 estructurado sobre el micro-framework Flask (Ejecutándose en el puerto `5000`).
* **Base de Datos (Persistencia):** PostgreSQL utilizando el driver nativo de comunicación directa `pg8000`.

---

## Estructura de Carpetas del Repositorio

Tras realizar la depuración de la persistencia local previa, la arquitectura física limpia del proyecto se consolida de la siguiente manera:

```text
taskcampus/
│
├── backend/                    # CAPA DE SERVIDOR (API REST en Python)
│   ├── app.py                  # Servidor API de Flask y consultas SQL a Postgres
│   └── requirements.txt        # Librerías y dependencias necesarias (Flask, pg8000)
│
├── frontend/                   # CAPA DE CLIENTE (Interfaz de Usuario)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── filters/        # Componente encargado del buscador lateral
│   │   │   ├── summary/        # Lógica del cuadro de resumen estadístico
│   │   │   └── tasks/          # Manejadores del formulario de registro y listado
│   │   ├── services/
│   │   │   └── tareas.service.ts # Conexión asíncrona a la API de Python mediante fetch
│   │   ├── styles/
│   │   │   └── main.css        # Estilos visuales del sistema optimizados con Tailwind
│   │   ├── types/
│   │   │   └── tarea.interface.ts # Contratos de interfaces y tipado estricto
│   │   └── main.ts             # Controlador principal del ciclo de vida del cliente
│   ├── index.html              # Estructura semántica principal de la aplicación web
│   ├── package.json            # Scripts de automatización y paquetes de Node.js
│   ├── tsconfig.json           # Configuración del compilador de TypeScript
│   └── vite.config.ts          # Configuración de red y puerto de Vite
│
├── specs/                      # DOCUMENTACIÓN FUNCIONAL (SDD)
│   └── taskcampus-spec.md      # Especificación funcional de requerimientos del sistema
│
├── .gitignore                  # Exclusiones de control de versiones (node_modules, etc.)
└── README.md                   # Manual técnico principal del ecosistema