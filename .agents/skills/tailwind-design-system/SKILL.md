---
name: tailwind-design-system
description: Sistema de diseño con Tailwind CSS
---

# Tailwind Design System Skill

Instrucciones para mantener y expandir el sistema de diseño basado en Tailwind CSS (v4) para el proyecto.

## Reglas Principales:
1. **CSS First Configuration:** En Tailwind v4, toda la configuración de tokens se realiza en los archivos CSS mediante directivas `@theme`. No añadir configuraciones en archivos JavaScript.
2. **Variables CSS:** Utilizar variables nativas en el `:root` o dentro de `@theme` (ej. `--color-navy-deep`, `--color-cyan`) y referenciarlas de manera consistente (`bg-[var(--color-navy-deep)]` o sus equivalentes en clases utilitarias si están mapeadas).
3. **Clases Útiles (Utility-First):** Priorizar siempre las clases utilitarias, pero usar hojas de estilo globales para componentes muy repetitivos (ej. `.btn-primary`, `.glass-card`) para mantener el HTML limpio.
4. **Clases Condicionales:** Al combinar clases dinámicas en React/Next.js, siempre utilizar una herramienta robusta como `cn()` (Tailwind Merge + clsx) para evitar conflictos de especificidad (sobre todo en márgenes y padding).
