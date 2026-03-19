"use client";

import CertBadge from "@/components/landing/CertBadge";
import CertLookup from "@/components/landing/CertLookup";

const trustBadges = [
  {
    label: "COFEPRIS",
    tooltip:
      "Comisión Federal para la Protección contra Riesgos Sanitarios — Registro de proveedor autorizado",
  },
  {
    label: "STPS",
    tooltip:
      "Secretaría del Trabajo y Previsión Social — Norma de equipo de protección personal",
  },
  {
    label: "Protección Civil",
    tooltip:
      "Programa Interno de Protección Civil — Formación de brigadas y simulacros",
  },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-navy-deep"
    >
      <div className="hero-grid-bg" />
      <div className="gradient-radial-hero" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-6 py-12 md:gap-8 lg:grid-cols-[55%_45%] lg:gap-12 lg:py-20 md:grid-cols-[50%_50%]">
        <div className="max-w-2xl text-center md:text-left">
          <div
            className="hero-reveal inline-flex rounded-full border border-cyan/50 bg-transparent px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan mb-6"
            style={{ animationDelay: "0.08s" }}
          >
            Cobertura Nacional
          </div>

          <h1
            className="hero-reveal mb-6 font-heading text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
            style={{ animationDelay: "0.16s" }}
          >
            Soluciones Integrales en
            <span className="block text-cyan">Seguridad &amp; Medio Ambiente</span>
          </h1>

          <p
            className="hero-reveal mb-8 max-w-xl text-base leading-relaxed text-silver"
            style={{ animationDelay: "0.24s" }}
          >
            Especialistas en <strong>Control de Plagas</strong>, Gestión
            Ambiental y Seguridad Industrial. Protegemos su empresa cumpliendo
            estrictamente con COFEPRIS, STPS y Protección Civil.
          </p>

          <div
            className="hero-reveal flex flex-wrap justify-center gap-4 md:justify-start"
            style={{ animationDelay: "0.32s" }}
          >
            <a href="#servicios" className="btn-primary">
              Explorar Servicios
            </a>
            <a
              href="#certificados"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/50 px-7 py-3 font-semibold text-white transition-all duration-300 ease-out hover:border-white hover:bg-white/5"
            >
              🔍 Validar Certificado
            </a>
          </div>

          <div
            className="hero-reveal mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-silver md:justify-start md:gap-4"
            style={{ animationDelay: "0.4s" }}
          >
            {trustBadges.map((badge) => (
              <CertBadge
                key={badge.label}
                label={badge.label}
                tooltip={badge.tooltip}
              />
            ))}
          </div>
        </div>

        <div
          id="certificados"
          className="hero-reveal rounded-2xl border border-cyan/30 bg-navy-card p-7 shadow-[0_0_40px_rgba(0,188,212,0.12)]"
          style={{ animationDelay: "0.2s" }}
        >
          <CertLookup />
        </div>
      </div>
    </section>
  );
}
