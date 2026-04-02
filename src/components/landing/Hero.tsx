"use client";

import Image from "next/image";
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
    <section id="inicio" className="relative overflow-hidden bg-[#FEFEFE]">
      <div className="hero-grid-bg" />
      <div className="gradient-radial-hero" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-6 pt-24 pb-12 md:gap-8 lg:grid-cols-[55%_45%] lg:gap-12 lg:pt-28 lg:pb-20 md:grid-cols-[50%_50%]">
        {/* ─── Columna izquierda: Logo + CTAs ─── */}
        <div className="flex flex-col items-center md:items-start">
          {/* Badge Cobertura Nacional */}
          <div
            className="hero-reveal mb-8 inline-flex whitespace-nowrap rounded-full border border-[#0078B0]/40 bg-[#0078B0]/6 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#0078B0]"
            style={{ animationDelay: "0.08s" }}
          >
            🇲🇽 Cobertura Nacional
          </div>

          {/* Logo EHSW² — FULL WIDTH, protagonista absoluto */}
          <div
            className="hero-reveal mb-6 w-full"
            style={{ animationDelay: "0.16s" }}
          >
            <Image
              src="/logo-ehsw2-transparent.png"
              alt="EHSW² — Higiene & Seguridad Ambiental"
              width={900}
              height={300}
              priority
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Descriptor de servicios */}
          <p
            className="hero-reveal mb-8 text-center text-base leading-relaxed text-[#9EA1A0] md:text-left md:text-lg"
            style={{ animationDelay: "0.24s" }}
          >
            Control de Plagas · Gestión Ambiental · Seguridad Industrial · Extintores NOM-154
          </p>

          {/* CTAs */}
          <div
            className="hero-reveal flex flex-wrap justify-center gap-4 md:justify-start"
            style={{ animationDelay: "0.32s" }}
          >
            <a href="#servicios" className="btn-primary">
              Explorar Servicios
            </a>
            <a
              href="#certificados"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#0078B0] px-7 py-3 font-semibold text-[#0078B0] transition-all duration-300 ease-out hover:bg-[#0078B0]/6"
            >
              🔍 Validar Certificado
            </a>
          </div>

          {/* Trust badges */}
          <div
            className="hero-reveal mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start md:gap-4"
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

        {/* ─── Columna derecha: CertLookup ─── */}
        <div
          id="certificados"
          className="hero-reveal rounded-2xl border border-[#0078B0]/15 bg-white p-7 shadow-[0_4px_32px_rgba(0,120,176,0.10)]"
          style={{ animationDelay: "0.2s" }}
        >
          <CertLookup />
        </div>
      </div>
    </section>
  );
}
