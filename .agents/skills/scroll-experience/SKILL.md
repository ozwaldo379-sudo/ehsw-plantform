---
name: scroll-experience
description: Animaciones e interacciones de scroll
---

# Scroll Experience Skill

Guía de implementación para animaciones basadas en el scroll y transiciones de página fluidas.

## Reglas Principales:
1. **Librería Core:** Utilizar **Framer Motion** para todas las animaciones de elementos revelándose al hacer scroll (`whileInView`, `viewport={{ once: true }}`).
2. **Smooth Scrolling:** Utilizar **Lenis** para lograr un "smooth scroll" global a nivel de aplicación que no rompa la accesibilidad ni las anclas (`href="#id"`). 
3. **Parallax y Micro-Interacciones:** Implementar efectos parallax sutiles en secciones de Hero o fondos. Usar el hook `useScroll` de Framer Motion para vincular transformaciones y opacidades al progreso del scroll de la página.
4. **Rendimiento:** Asegurar que las animaciones de scroll no disparen reflows constantes (animar siempre `transform` y `opacity`). Respetar la preferencia de medios del usuario (`prefers-reduced-motion`) desactivando animaciones cuando esté activa.
