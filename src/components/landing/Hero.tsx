"use client";

import Image from "next/image";

const trustBadges = [
  "🏛️ COFEPRIS Reg. 871",
  "✓ ISO 14001",
  "⚡ STPS Certificado",
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[80vh] lg:min-h-[90vh] overflow-hidden bg-navy-deep"
    >
      <div className="gradient-radial-hero" />
      <div className="dot-grid-bg opacity-70" />

      <div className="absolute inset-0 md:hidden">
        <Image
          src="/Images/Servicios/empleado-plagas-ehsw2.png"
          alt="Tecnico EHSW2"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,45,0.75)_0%,rgba(13,31,45,0.58)_40%,rgba(13,31,45,0.88)_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[80vh] lg:min-h-[90vh] flex items-center py-12 lg:py-20">
        <div className="grid lg:grid-cols-[55%_45%] items-center gap-8 lg:gap-12 w-full">
          <div className="text-center lg:text-left max-w-2xl lg:max-w-3xl mx-auto lg:mx-0">
            <p
              className="hero-reveal text-xs uppercase tracking-[0.15em] text-cyan font-semibold mb-4"
              style={{ animationDelay: "0.1s" }}
            >
              CERTIFICACION INDUSTRIAL PROFESIONAL
            </p>

            <h1
              className="hero-reveal font-heading font-bold text-white text-[1.8rem] md:text-[2.2rem] lg:text-[3.5rem] leading-tight mb-6"
              style={{ animationDelay: "0.2s" }}
            >
              Protegemos tu empresa del riesgo industrial
            </h1>

            <p
              className="hero-reveal text-silver text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              style={{ animationDelay: "0.3s" }}
            >
              Especialistas en Control de Plagas, Seguridad Industrial y
              Gestion Ambiental. Cumplimiento estricto con COFEPRIS · STPS ·
              ISO 14001 · Proteccion Civil.
            </p>

            <div
              className="hero-reveal flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
              style={{ animationDelay: "0.4s" }}
            >
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="border border-cyan/40 bg-navy/50 text-cyan text-xs font-semibold px-4 py-2 rounded-full backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div
              className="hero-reveal flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              style={{ animationDelay: "0.5s" }}
            >
              <a
                href="#servicios"
                className="w-full sm:w-auto bg-cyan text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-cyan-dark transition-all duration-300 shadow-lg shadow-cyan/20 inline-flex items-center justify-center"
              >
                Explorar Servicios
              </a>
              <a
                href="#certificados"
                className="w-full sm:w-auto border-2 border-cyan text-cyan font-semibold px-7 py-3 rounded-lg bg-transparent hover:bg-cyan/10 transition-all duration-300 inline-flex items-center justify-center"
              >
                Validar Certificado
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-[28px] overflow-hidden min-h-[680px] border border-white/10 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.6)] hero-image-panel">
              <Image
                src="/Images/Servicios/empleado-plagas-ehsw2.png"
                alt="Tecnico EHSW2"
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute bottom-6 left-6 bg-navy-deep/90 border border-cyan text-cyan font-bold text-sm px-4 py-2 rounded-md backdrop-blur-md">
                COFEPRIS REG. 871
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
