"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const stats = [
  { value: "15+", label: "Anos de experiencia" },
  { value: "500+", label: "Empresas atendidas" },
  { value: "5", label: "Zonas nacionales" },
];

export default function AboutSection() {
  return (
    <section id="nosotros" className="relative py-12 lg:py-20">
      <div className="absolute inset-0 pattern-dots opacity-60" />
      <div className="section-divider mb-16" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        className="relative max-w-7xl mx-auto px-6"
      >
        <div className="grid lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-center">
          <motion.div variants={fadeUp} className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-cyan/20 shadow-[0_0_40px_rgba(0,188,212,0.08)] bg-[linear-gradient(180deg,rgba(30,58,79,0.92),rgba(13,31,45,0.98))] p-8 md:p-10 min-h-[360px] flex flex-col justify-between">
              <div className="absolute inset-0 pattern-dots opacity-70" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 border border-cyan/25 bg-cyan/10 text-cyan text-xs font-semibold uppercase tracking-[0.18em] px-4 py-2 rounded-full">
                  Operacion certificada
                </div>
              </div>

              <div className="relative grid gap-4">
                <div className="rounded-2xl border border-white/8 bg-white/4 p-5">
                  <p className="text-cyan text-sm font-semibold uppercase tracking-[0.16em] mb-2">
                    Cobertura
                  </p>
                  <p className="text-white text-2xl font-bold leading-tight">
                    Seguridad, higiene y medio ambiente en una sola operacion.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/8 bg-navy-light/60 p-5">
                    <p className="text-cyan text-sm font-semibold mb-1">
                      Prevencion
                    </p>
                    <p className="text-silver text-sm leading-relaxed">
                      Riesgo controlado con evidencia tecnica y ejecucion en campo.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-navy-light/60 p-5">
                    <p className="text-cyan text-sm font-semibold mb-1">
                      Cumplimiento
                    </p>
                    <p className="text-silver text-sm leading-relaxed">
                      Documentacion clara para auditorias, clientes e inspecciones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-navy-deep/90 border border-cyan/40 text-white text-sm font-semibold px-4 py-2 rounded-lg backdrop-blur-md">
                15+ anos de experiencia
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="order-1 lg:order-2 text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.15em] text-cyan font-semibold mb-4">
              SOBRE NOSOTROS
            </p>
            <h2 className="font-heading font-bold text-white text-4xl mb-6">
              ¿Quienes somos?
            </h2>
            <p className="text-silver text-base leading-relaxed mb-4 max-w-2xl mx-auto lg:mx-0">
              Somos profesionales especializados en brindar servicios para la
              conservacion del medio ambiente y la Seguridad e Higiene en los
              centros de trabajo.
            </p>
            <p className="text-silver text-base leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              Nos especializamos en el control de plagas, pero nuestra amplia
              experiencia en el campo laboral nos permite asesorarte en temas de
              seguridad, higiene industrial y gestion ambiental con el mas alto
              nivel de cumplimiento.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8 max-w-xl mx-auto lg:mx-0">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-navy-light rounded-xl p-5 border border-white/5"
                >
                  <div className="text-cyan font-heading font-bold text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-silver text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <a
              href="#servicios"
              className="inline-flex items-center justify-center lg:justify-start text-cyan font-semibold hover:underline hover:text-cyan-dark transition-colors"
            >
              Conocer nuestros servicios →
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
