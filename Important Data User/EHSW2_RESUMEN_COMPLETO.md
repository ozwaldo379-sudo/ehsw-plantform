# 🛰️ EHSW2 — RESUMEN COMPLETO DEL PROYECTO

*Documento generado: 23 de marzo de 2026*
*Fuente: Mission Control — Historial completo de sesiones*

---

## 🔑 DATOS DE ACCESO CRÍTICOS

### ⭐ LOGIN ADMINISTRADOR
| Campo | Valor |
|---|---|
| **URL Login** | **https://ehsw-plantform.vercel.app/admin/login** |
| **Email** | **admin@ehsw2.com** |
| **Contraseña** | **Ehsw2Admin2025!** |

> ⚠️ Puedes cambiar email y contraseña editando `ADMIN_EMAIL` y `ADMIN_PASSWORD` en dos lugares: tu archivo `.env` local Y en Vercel → Settings → Environment Variables. Después haz Redeploy en Vercel.

### ⭐ FOLIOS DE CERTIFICADOS DEMO (para probar QR y validación)

| Folio | Empresa | Servicio | Estado |
|---|---|---|---|
| **EHSW-2026-FUM-001** | CLIENTE DEMO S.A. DE C.V. | Control de Plagas | ✅ Vigente |
| **EHSW-2026-FUM-002** | INDUSTRIAS EJEMPLO S.A. DE C.V. | Control de Plagas | ✅ Vigente |
| **EHSW-2026-FUM-003** | RESTAURANTE MUESTRA S.A. DE C.V. | Desinfección | ❌ Vencido |
| **EHSW-2026-EXT-001** | FÁBRICA MODELO S.A. DE C.V. | Extintores | ⚠️ Por vencer |
| **EHSW-2026-SEG-001** | CORPORATIVO CENTRO S.A. DE C.V. | Seguridad Industrial | ✅ Vigente |
| **DEMO-2213050039** | Folio demo alternativo | — | Para validación |

**Cómo probar la validación de certificados:**
1. Ve a https://ehsw-plantform.vercel.app/
2. En el módulo "Validación de Certificados", escribe: `EHSW-2026-FUM-001`
3. Dale "Buscar" → debe mostrar "Certificado Válido"
4. O accede directo: https://ehsw-plantform.vercel.app/certificado/EHSW-2026-FUM-001

### ⭐ VARIABLES DE ENTORNO (.env local)

```
DATABASE_URL="postgresql://neondb_owner:[PASSWORD]@ep-fancy-star-an30dgh7.us-east-1.aws.neon.tech/neondb?sslmode=require"
ADMIN_EMAIL="admin@ehsw2.com"
ADMIN_USERNAME="admin@ehsw2.com"
ADMIN_PASSWORD="Ehsw2Admin2025!"
SESSION_SECRET="474b430a986d01c048b981ee558751eea1c32ca44e9084d9c997c13049753ed9"
NEXT_PUBLIC_SITE_URL="https://ehsw-plantform.vercel.app"
```

> ⚠️ **PENDIENTE CRÍTICO:** Rotar el password de Neon en console.neon.tech → Settings → Reset branch password. Luego actualizar `DATABASE_URL` en `.env` local y en Vercel.

### ⭐ CONTACTO EHSW2 (datos del cliente)
| Campo | Valor |
|---|---|
| WhatsApp | **+52 221 305 0039** |
| Email | contacto@ehsw2.com |
| Dominio actual | www.ehsw2.com (en Canva) |

---

## 📦 INFRAESTRUCTURA

| Recurso | Detalle |
|---|---|
| **Repositorio GitHub** | **github.com/ozwaldo379-sudo/ehsw-plantform** |
| **Proyecto Vercel** | **ehsw-plantform** |
| **URL producción** | **https://ehsw-plantform.vercel.app/** |
| **Base de datos** | Neon PostgreSQL (console.neon.tech) |
| **Branch** | main |
| **Build command** | `prisma db push && next build` |
| **Auto-deploy** | Sí, cada `git push` a main |
| **Carpeta local** | `C:\Users\otro\Projects\ehsw-platform` |

> ⚠️ Nota: el repo se llama "plantform" (no "platform") — es un typo original que se mantuvo.

---

## 🛠️ STACK TÉCNICO

| Componente | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router, Server Components) | 16.1.6 |
| UI Library | React | 19.2.4 |
| Lenguaje | TypeScript (strict) | 5.9.3 |
| CSS | **Tailwind CSS v4 (CSS-first, PostCSS)** | 4.2.1 |
| ORM | Prisma | 6.19.2 |
| DB (prod) | PostgreSQL (Neon) | — |
| Animaciones | Framer Motion | latest |
| Scroll | Lenis | latest |
| Carrusel | Embla Carousel | latest |
| Iconos | Lucide React | latest |
| Validación | Zod + react-hook-form | latest |
| Analytics | @vercel/analytics + @vercel/speed-insights | latest |

> ⚠️ **REGLA CRÍTICA DE TAILWIND V4:** Los colores se definen en `globals.css` con `@theme` / variables CSS. **NO existe `tailwind.config.ts` para colores.** Cualquier agente que intente crear o modificar tailwind.config.ts para definir colores ROMPE el proyecto.

---

## 🎨 SISTEMA DE COLORES (OBLIGATORIO)

```css
--color-navy-deep:  #0D1F2D   /* fondo más oscuro */
--color-navy:       #143249   /* fondo principal */
--color-navy-card:  #1A2F45   /* tarjetas */
--color-cyan:       #00BCD4   /* acento primario */
--color-cyan-dark:  #0097A7   /* hover states */
--color-silver:     #EFEDEE   /* texto secundario */
--color-white:      #FFFFFF   /* texto principal */
--color-valid:      #10B981   /* estado válido */
```

---

## 📁 ESTRUCTURA DE ARCHIVOS PRINCIPAL

```
src/
├── app/
│   ├── page.tsx                    → Landing principal
│   ├── globals.css                 → Variables de color + @theme Tailwind v4
│   ├── admin/
│   │   ├── login/page.tsx          → Login admin
│   │   ├── dashboard/              → Dashboard admin
│   │   └── certificados/           → CRUD certificados
│   │       ├── nuevo/page.tsx
│   │       └── [folio]/page.tsx
│   ├── certificado/[folio]/        → Página pública de verificación
│   └── api/                        → API routes (auth, certificados)
├── components/
│   ├── landing/                    → Hero, CertLookup, Services, About, etc.
│   └── ui/                         → shadcn/ui components
├── lib/
│   ├── prisma.ts                   → Prisma client singleton
│   ├── auth.ts                     → Auth utilities
│   ├── folio.ts                    → Generación de folios
│   └── qr.ts                      → Generación de QR
```

---

## 🖼️ IMÁGENES DISPONIBLES (en el repositorio)

```
public/Images/Servicios/
├── empleado-plagas-ehsw2.png       → Hero
├── control-integral-de-plagas.png  → Servicio principal
├── desinfeccion.png                → Desinfección
├── extintores.png                  → Extintores NOM-154
├── gestion-ambiental.png           → Gestión Ambiental
├── proteccion-civil.png            → Protección Civil
├── seguridad-industrial.png        → Seguridad Industrial
├── quienes-somos.png               → About Section
└── otros-servicios.png             → Fallback

public/Images/  (logos de clientes)
├── Arkema.png
├── bostik.png
├── global denim.png
├── imesa.png
├── inovatitve group.png
├── las migas.png
└── sushiroll.png

public/
├── logo-ehsw2-white-transparent.png → Logo con texto blanco (para fondo oscuro)
├── logo-ehsw2-transparent.png       → Logo con texto oscuro (para fondo claro)
└── logo-ehsw2-sinfondo.svg          → Logo SVG (tiene sombra gris, no ideal)
```

---

## ✅ LO QUE YA ESTÁ HECHO

- ✅ Definición del producto y branding
- ✅ Repo en GitHub (ozwaldo379-sudo/ehsw-plantform)
- ✅ Proyecto en Vercel (ehsw-plantform) — deploy automático funcionando
- ✅ Base de datos Neon PostgreSQL conectada
- ✅ Variables de entorno configuradas en Vercel
- ✅ **Prisma provider cambiado a "postgresql"** (antes era "sqlite", bloqueaba el build)
- ✅ **Proyecto duplicado `ehsw-platform` eliminado de Vercel** (solo queda `ehsw-plantform`)
- ✅ Landing completo: Hero, Services, About, Clientes, Normatividad, Cobertura, Contacto, Footer
- ✅ Sistema de certificados: modelo Prisma, API routes, generación de QR
- ✅ Módulo de validación de certificados en el landing (buscar por folio)
- ✅ Página pública de certificado (/certificado/[folio])
- ✅ Portal admin: login, dashboard, CRUD certificados
- ✅ Imágenes de servicios generadas y en el repo
- ✅ Logo actualizado a versión transparente con texto blanco
- ✅ Headline del Hero actualizado: "Protegemos tu empresa. Certificamos tu cumplimiento."
- ✅ Limpieza de Antigravity completada (reinstalación limpia)
- ✅ Skills de diseño creadas en `.agents/skills/`

---

## 🔴 PENDIENTES CONOCIDOS

1. **Rotar password de Neon** — Las credenciales se expusieron en conversaciones con GPT/Gemini
2. **Verificar seed en producción** — ¿Los 5 certificados demo existen en la DB de producción?
3. **Probar flujo completo de certificados** — Crear nuevo, generar QR, validar desde landing
4. **WhatsApp** — Verificar que los botones abren con el número correcto (+52 221 305 0039)
5. **Descarga de QR como PNG** — Pendiente de verificar
6. **Descarga de PDF** — Pendiente de verificar

---

## 🔵 PENDIENTES DE DISEÑO (Fase 2)

- Rediseño Hero Section (benchmarks: ehsinsight.com, ehs.com, vectorsolutions.com, rentokil.com)
- Rediseño ServicesSection con Bento Grid e imágenes
- Sección About + Carrusel de Clientes mejorado
- Responsive móvil completo
- Animaciones de scroll (Framer Motion + Lenis)
- SEO + Meta tags + Structured Data
- Formulario de contacto funcional
- Dominio personalizado (ehsw2.mx o plataforma.ehsw2.com)

---

## ❌ ERRORES QUE YA SE COMETIERON (NO REPETIR)

| Error | Lección |
|---|---|
| Ejecutar comandos en carpeta equivocada (G:\Mi unidad\) | SIEMPRE verificar `pwd` antes de ejecutar |
| Culpar al firewall o Neon cuando era Prisma con SQLite | Diagnosticar el error real, no síntomas |
| Obsesión con -pooler de Neon | Solo afecta operaciones de schema, no runtime |
| Dos proyectos en Vercel | Cada push disparaba 2 deploys — ya eliminado |
| Skills @xxx en prompts fuera de Antigravity | Los @skills solo funcionan dentro de Antigravity |
| Pedir screenshots a Codex | Codex no puede tomar screenshots |
| Un solo commit gigante | Un commit por tarea, para rollback parcial |

---

## 📚 DOCUMENTACIÓN DEL PROYECTO (archivos a conservar)

| Archivo | Contenido |
|---|---|
| `VERCEL_DEPLOYMENT.md` | Guía de deploy completa |
| `PERFORMANCE_REPORT.md` | Reporte de performance y madurez |
| `QUICK_START.md` | Guía de inicio rápido |
| `STACK_BIBLE.md` | Referencia completa del stack |
| `COMPONENT_GUIDE.md` | Guía de uso de componentes |
| `Plan Maestro EHSW2 — CLAUDE 19.03.26.MD` | Plan de 3 fases |
| `Conversaciones previas GPT y GEMINI.md` | Historial de decisiones |
| `PROMPTS_CLAUDE_OPUS_4_6.md` | Prompts optimizados para Codex/Claude |

---

## 🗺️ PLAN MAESTRO (3 FASES)

**Fase 1 — Estabilización funcional** ✅ COMPLETADA
- Prisma → PostgreSQL
- Vercel limpio (1 solo proyecto)
- Variables de entorno configuradas
- Build exitoso

**Fase 2 — Elevación de diseño** 🔵 EN PROCESO
- Hero, Servicios, About, Clientes
- Responsive, animaciones, SEO

**Fase 3 — Dominio propio** ⬜ PENDIENTE
- Comprar dominio (ehsw2.mx sugerido)
- Conectar a Vercel
- Actualizar NEXT_PUBLIC_SITE_URL
- Prueba end-to-end final

---

*Generado por Mission Control — Claude Opus 4.6*
*Proyecto EHSW2 — Oswaldo — 23 de marzo de 2026*
