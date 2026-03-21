# PERFORMANCE GOALS — EHSW² Platform

> **Nota:** Este documento describe metas y optimizaciones aplicadas, **no métricas medidas en producción**. Para ver métricas reales, consulta el dashboard de Vercel Analytics y Speed Insights una vez desplegado.

---

## Lighthouse Scores Esperados (Objetivos)

| Category | Expected Score | Rationale |
|---|---|---|
| **Performance** | 90–95 | Static pages, optimized images (AVIF/WebP), tree-shaken icons, no render-blocking resources |
| **Accessibility** | 90+ | Semantic HTML, focus-visible outlines, ARIA labels, color contrast AAA |
| **Best Practices** | 95+ | HTTPS (Vercel), security headers (HSTS, CSP, X-Frame-Options), no console errors |
| **SEO** | 95–100 | Metadata API, canonical URLs, robots.txt, sitemap.xml, OG tags |

---

## Optimizations Applied

### 1. Image Optimization
- `next.config.ts` configured with `formats: ['image/avif', 'image/webp']`
- `sharp` installed for build-time image processing
- `remotePatterns` set for Unsplash and Cloudinary CDN
- All new components use `next/image` with proper `sizes` and `priority`

### 2. Font Loading
- Google Fonts loaded via `next/font` (no layout shift, `font-display: swap`)
- No external font stylesheet — fonts are self-hosted by Next.js
- Three font families: Inter (body), Outfit (headings), Playfair Display (display)

### 3. JavaScript Bundle
- **Framer Motion**: Only imported variants are tree-shaken
- **Lucide React**: Only used icons are bundled (vs Font Awesome CDN which loads 1400+ icons)
- **No GSAP/react-spring**: Avoided ~60KB unnecessary bundle weight
- Client components limited to interactive sections only

### 4. CSS
- Tailwind CSS v4 with PurgeCSS built-in — unused utilities removed at build time
- CSS custom properties for runtime theming (no JS required for theme changes)
- No external CSS dependencies (except legacy Font Awesome CDN for existing components)

### 5. Security Headers
Applied via `next.config.ts headers()`:
- `Strict-Transport-Security` (HSTS)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (camera, microphone, geolocation denied)

### 6. Monitoring
- `@vercel/analytics` — Real User Metrics (visitors, page views, referrers)
- `@vercel/speed-insights` — Core Web Vitals (LCP, FID, CLS) in production

### 7. SEO
- `next-sitemap` generates `sitemap.xml` and `robots.txt` automatically
- `createMetadata()` factory ensures consistent OG/Twitter cards on every page
- Admin and API routes excluded from crawling

---

## Build Performance

| Metric | Value |
|---|---|
| Build time | ~7.6s (Turbopack) |
| Static pages | 5 pages prerendered |
| Dynamic pages | 6 server-rendered routes |
| TypeScript check | ✅ Zero errors |

---

## Backlog de Mejoras Pendientes

1. **Remover Font Awesome CDN** — Migrar componentes de landing existentes a Lucide React
2. **Agregar Bundle Analyzer** — `npm install @next/bundle-analyzer` y revisar los 5 módulos más pesados
3. **Medir en producción** — Correr Lighthouse sobre la URL de Vercel para obtener scores reales
4. **Service Worker** — Soporte PWA para capacidades offline
