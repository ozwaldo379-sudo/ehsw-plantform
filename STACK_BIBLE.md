# STACK BIBLE — EHSW² Platform

> Complete reference for the stack, architecture, and contribution guidelines.

---

## Stack Versions

| Package | Version | Purpose |
|---|---|---|
| Next.js | 16.1.6 | Framework (App Router, Server Components) |
| React | 19.2.4 | UI library (Actions, useOptimistic) |
| TypeScript | 5.9.3 | Strict type safety |
| Tailwind CSS | 4.2.1 | Utility-first CSS (v4 PostCSS approach) |
| Prisma | 6.19.2 | ORM → SQLite (dev) / PostgreSQL (prod) |
| Framer Motion | latest | Declarative animations & transitions |
| Lenis | latest | Smooth scrolling |
| Embla Carousel | latest | Touch-friendly carousels |
| Lucide React | latest | Icon library (tree-shakeable) |
| zod | latest | Schema validation |
| react-hook-form | latest | Performant form handling |
| sharp | latest | Image optimization (build-time) |
| @vercel/analytics | latest | Real User Metrics |
| @vercel/speed-insights | latest | Core Web Vitals monitoring |
| next-sitemap | latest | Automatic sitemap/robots.txt |

---

## Architecture Overview

```
src/
├── app/           → Next.js App Router (pages, layouts, API routes)
├── components/
│   ├── landing/   → Original EHSW² landing components
│   ├── sections/  → Reusable section templates (Hero ×3, Features, Testimonials, CTA, Footer)
│   └── admin/     → Componentes del panel de administración (sidebar, header)
├── lib/
│   ├── utils.ts       → cn() class merging utility
│   ├── fonts.ts       → Google Fonts config (Inter, Outfit, Playfair Display)
│   ├── animations.ts  → Framer Motion variant library
│   ├── metadata.ts    → OG/Twitter metadata factory
│   ├── prisma.ts      → Prisma client singleton
│   ├── auth.ts        → Auth utilities
│   ├── folio.ts       → Folio ID generation
│   └── qr.ts          → QR code generation
├── styles/
│   ├── tokens.css     → CSS custom properties (spacing, radius, shadows)
│   └── animations.css → Global keyframe animations
├── hooks/
│   └── use-scroll-position.ts → Scroll tracking hook
├── types/
│   └── index.ts       → Global TypeScript interfaces
└── config/
    ├── site.ts        → Site name, URLs, contact info
    └── navigation.ts  → Navigation structure (header + footer)
```

---

## Design Decisions

### Why Tailwind v4 without tailwind.config.ts?
Tailwind v4 moved to a CSS-first configuration using `@theme` blocks inside CSS files. All design tokens (colors, typography, spacing) live in `globals.css`. No JavaScript config file needed.

### Why Framer Motion over GSAP?
- GSAP requires a commercial license for some use cases
- GSAP adds ~60KB to the bundle
- Framer Motion's `whileInView`, `useScroll`, and `AnimatePresence` cover 95% of needs
- First-class React integration without refs/imperative code

### Why Lucide React over Font Awesome?
- Tree-shakeable (only imported icons are bundled)
- No external CDN dependency
- TypeScript-native with size/color props
- Existing components keep Font Awesome CDN for backward compatibility

### Why no Storybook/Playwright/Husky yet?
These tools add substantial configuration overhead. They're documented as Phase 2 work to avoid impacting the build pipeline during the core upgrade.

---

## Contributing Conventions

| Item | Convention |
|---|---|
| Components | `PascalCase.tsx` |
| Utilities / libs | `camelCase.ts` |
| Route files | `kebab-case/page.tsx` |
| CSS | CSS custom properties in `:root` or `@theme` |
| Animations | Framer Motion variants from `@/lib/animations` |
| Icons | Import from `lucide-react` |
| Class merging | Always use `cn()` from `@/lib/utils` |
| Metadata | Use `createMetadata()` from `@/lib/metadata` |
| Forms | `react-hook-form` + `zod` schema |
