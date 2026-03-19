"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "15+", label: "Años" },
  { value: "500+", label: "Empresas" },
  { value: "5", label: "Zonas" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function AboutSection() {
  return (
    <section id="nosotros" className="relative py-12 lg:py-20">
      <div className="absolute inset-0 pattern-dots opacity-50" />
      <div className="section-divider mb-16" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="relative mx-auto max-w-7xl px-6"
      >
        <div className="grid items-center gap-8 lg:grid-cols-[45%_55%] lg:gap-12">
          <motion.div variants={fadeUp} className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl border border-cyan/20 bg-[linear-gradient(180deg,rgba(26,47,69,0.95),rgba(13,31,45,0.98))] p-6 shadow-[0_8px_40px_rgba(0,188,212,0.1)] md:p-8">
              <div className="absolute inset-0 pattern-dots opacity-60" />
              <div className="relative space-y-4">
                <div className="inline-flex rounded-full border border-cyan/25 bg-cyan/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
                  Operación certificada
                </div>

                <div className="rounded-2xl border border-white/8 bg-navy-card/85 p-5">
                  <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-cyan">
                    Cobertura
                  </p>
                  <p className="text-2xl font-bold leading-tight text-white">
                    Seguridad, higiene y medio ambiente en una sola operación.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/8 bg-navy-deep/65 p-5">
                    <p className="mb-1 text-sm font-semibold text-cyan">
                      Prevención
                    </p>
                    <p className="text-sm leading-relaxed text-silver">
                      Riesgo controlado con evidencia técnica y ejecución en
                      campo.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-navy-deep/65 p-5">
                    <p className="mb-1 text-sm font-semibold text-cyan">
                      Cumplimiento
                    </p>
                    <p className="text-sm leading-relaxed text-silver">
                      Documentación clara para auditorías, clientes e
                      inspecciones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 rounded-lg border border-cyan/50 bg-navy-deep/90 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
                15+ años de experiencia
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="order-1 text-center lg:order-2 lg:text-left">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
              Sobre Nosotros
            </p>
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              ¿Quiénes Somos?
            </h2>
            <p className="mb-4 max-w-2xl text-base leading-relaxed text-silver lg:mx-0">
              Profesionales especializados en brindar servicios para la
              conservación del medio ambiente y Seguridad e Higiene en los
              centros de trabajo.
            </p>
            <p className="mb-8 max-w-2xl text-base leading-relaxed text-silver lg:mx-0">
              Nos especializamos en el control de plagas, pero nuestra
              experiencia en el campo laboral nos permite ayudarte en otros
              temas de seguridad, higiene y medio ambiente.
            </p>

            <div className="mb-8 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-white/5 bg-navy-card p-5"
                >
                  <div className="font-heading text-3xl font-bold text-cyan">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-silver">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
