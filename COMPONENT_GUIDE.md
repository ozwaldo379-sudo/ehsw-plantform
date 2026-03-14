# COMPONENT GUIDE — EHSW² Section Templates

> Usage guide for every reusable section component in `src/components/sections/`.

---

## HeroCentered

Full-viewport hero with centered text, gradient background, and stagger animation.

```tsx
import HeroCentered from "@/components/sections/HeroCentered";

<HeroCentered
  badge="COBERTURA NACIONAL"
  headline="Soluciones Integrales en"
  highlightedText="Seguridad & Medio Ambiente"
  subheadline="Especialistas en Control de Plagas, Gestión Ambiental y Seguridad Industrial."
  ctas={[
    { label: "Explorar Servicios", href: "#servicios" },
    { label: "Validar Certificado", href: "#certificados" },
  ]}
  backgroundVideo="/videos/hero-bg.mp4" // optional
/>
```

**Props:** `badge?`, `headline`, `highlightedText?`, `subheadline`, `ctas?`, `backgroundVideo?`, `backgroundImage?`, `className?`, `id?`

---

## HeroSplit

Text left, image right (reversible), with slide-in animation.

```tsx
import HeroSplit from "@/components/sections/HeroSplit";

<HeroSplit
  badge="NUEVA PLATAFORMA"
  headline="Certificación Digital"
  highlightedText="de Clase Mundial"
  subheadline="Genera y valida certificados con QR en segundos."
  imageSrc="/images/dashboard-preview.png"
  imageAlt="Dashboard preview"
  ctas={[{ label: "Comenzar", href: "/admin" }]}
  reversed={false}
/>
```

**Props:** All HeroCentered props + `imageSrc`, `imageAlt`, `reversed?`

---

## HeroMinimal

Typography-only hero with maximum whitespace and elegant serif display font.

```tsx
import HeroMinimal from "@/components/sections/HeroMinimal";

<HeroMinimal
  headline="Protegemos lo que importa."
  highlightedText="Con excelencia."
  subheadline="20 años liderando la industria de higiene y seguridad ambiental."
  ctas={[{ label: "Conocer más", href: "#about" }]}
/>
```

---

## Features

Responsive grid with Lucide icons and scroll-triggered stagger animation.

```tsx
import Features from "@/components/sections/Features";
import { Shield, Zap, BarChart3 } from "lucide-react";

<Features
  badge="Catálogo de Soluciones"
  title="¿Por qué elegirnos?"
  subtitle="Tecnología y experiencia al servicio de su empresa."
  columns={3}
  features={[
    {
      icon: <Shield size={28} />,
      title: "Cumplimiento Normativo",
      description: "Certificaciones COFEPRIS, STPS y Protección Civil.",
    },
    {
      icon: <Zap size={28} />,
      title: "Respuesta Inmediata",
      description: "Atención en menos de 24 horas en toda la república.",
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Reportes Digitales",
      description: "Dashboards en tiempo real con métricas de servicio.",
    },
  ]}
/>
```

**Props:** `badge?`, `title`, `subtitle?`, `features[]`, `columns? (2|3|4)`

---

## Testimonials

Embla Carousel with auto-scrolling, star ratings, and dot navigation.

```tsx
import Testimonials from "@/components/sections/Testimonials";

<Testimonials
  badge="Testimonios"
  title="Lo que nuestros clientes dicen"
  autoplay={true}
  autoplayInterval={5000}
  testimonials={[
    {
      name: "María López",
      role: "Directora de Operaciones",
      company: "Hotel Grand",
      content: "EHSW² nos ayudó a pasar la auditoría COFEPRIS sin observaciones.",
      rating: 5,
      avatar: "/avatars/maria.jpg", // optional
    },
  ]}
/>
```

---

## CTA

Animated gradient background with optional countdown timer.

```tsx
import CTASection from "@/components/sections/CTA";

<CTASection
  headline="¿Listo para proteger su empresa?"
  subheadline="Solicite una cotización sin compromiso."
  ctas={[
    { label: "Cotizar Ahora", href: "#contacto" },
    { label: "Ver Servicios", href: "#servicios" },
  ]}
  countdown={{ date: new Date("2026-04-01"), label: "Promoción" }} // optional
/>
```

---

## FooterMain

4-column footer with newsletter signup (zod validated) and social icons.

```tsx
import FooterMain from "@/components/sections/FooterMain";

<FooterMain showNewsletter={true} />
```

Links and content are driven by `config/site.ts` and `config/navigation.ts`.
