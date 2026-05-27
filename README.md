# AcademixTask (TaskCampus) - Sistema de Control Embebido para Tareas Estudiantiles

AcademixTask es una plataforma web modular diseñada para la optimización, indexación y seguimiento cronológico de asignaciones académicas universitarias. Este ecosistema de software aplica la metodología **Spec Driven Development (SDD)** junto con **GitHub Spec Kit**, asegurando un ciclo de vida del desarrollo de software ordenado, estructurado y basado en requerimientos formales antes de la fase de codificación.

---

## Arquitectura y Distribución del Repositorio

El proyecto mantiene un desacoplamiento estricto entre los componentes de software de cliente, servidor y la documentación técnica de especificaciones de diseño:

```text
taskcampus/
│
├── specs/
│   └── taskcampus-spec.md      # Especificación formal funcional del sistema (SDD)
│
├── frontend/
│   ├── src/                    # Código fuente e interfaces en TypeScript
│   ├── index.html              # Interfaz de usuario (Tailwind CSS)
│   └── package.json            # Dependencias del lado del cliente
│
├── backend/
│   ├── app.py                  # Servidor API REST en Python
│   └── database/
│       └── tasks.json          # Persistencia relacional simple en JSON
│
├── README.md                   # Documentación principal del ecosistema
└── .gitignore                  # Exclusiones del control de versiones