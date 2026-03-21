# QUICK START — Create a New Landing Page

> 5 steps to go from zero to a production-ready landing page using the EHSW² design system.

---

## Step 1: Create the Route

```bash
# Create folder for your page
mkdir -p src/app/my-campaign
```

> **Nota:** El proyecto no usa un grupo de rutas `(marketing)/`. Las páginas públicas van directamente bajo `src/app/`.

Create `src/app/my-campaign/page.tsx`:

```tsx
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Mi Campaña",
  description: "Landing page de campaña especial.",
  path: "/my-campaign",
});

export default function MyCampaignPage() {
  return <main>{/* Sections go here */}</main>;
}
```

---

## Step 2: Pick and Import Sections

```tsx
import HeroCentered from "@/components/sections/HeroCentered";
import Features from "@/components/sections/Features";
import Testimonials from "@/components/sections/Testimonials";
import CTASection from "@/components/sections/CTA";
import FooterMain from "@/components/sections/FooterMain";
```

---

## Step 3: Compose the Page

```tsx
import { Shield, Zap, BarChart3 } from "lucide-react";

export default function MyCampaignPage() {
  return (
    <main>
      <HeroCentered
        badge="OFERTA ESPECIAL"
        headline="Protección Total para"
        highlightedText="su Empresa"
        subheadline="Servicios integrales de higiene y seguridad."
        ctas={[
          { label: "Cotizar", href: "#contacto" },
          { label: "Ver Servicios", href: "#features" },
        ]}
      />

      <Features
        id="features"
        title="Nuestras Fortalezas"
        columns={3}
        features={[
          { icon: <Shield size={28} />, title: "Cumplimiento", description: "..." },
          { icon: <Zap size={28} />, title: "Velocidad", description: "..." },
          { icon: <BarChart3 size={28} />, title: "Reportes", description: "..." },
        ]}
      />

      <CTASection
        headline="¿Listo para empezar?"
        ctas={[{ label: "Contactar", href: "#contacto" }]}
      />

      <FooterMain />
    </main>
  );
}
```

---

## Step 4: Run Dev Server

```bash
npm run dev
```

Visita `http://localhost:3000/my-campaign`

---

## Step 5: Deploy

```bash
git add .
git commit -m "feat: add campaign landing page"
git push origin main
```

Vercel deploys automatically from your main branch.

---

## Available Sections

| Component | Import Path |
|---|---|
| `HeroCentered` | `@/components/sections/HeroCentered` |
| `HeroSplit` | `@/components/sections/HeroSplit` |
| `HeroMinimal` | `@/components/sections/HeroMinimal` |
| `Features` | `@/components/sections/Features` |
| `Testimonials` | `@/components/sections/Testimonials` |
| `CTASection` | `@/components/sections/CTA` |
| `FooterMain` | `@/components/sections/FooterMain` |

See [COMPONENT_GUIDE.md](./COMPONENT_GUIDE.md) for full props reference.
