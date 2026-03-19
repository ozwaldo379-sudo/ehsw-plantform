"use client";

import { motion } from "framer-motion";
import { MapPin, Globe2, Zap, ArrowRight } from "lucide-react";

const locations = [
  {
    zone: "Zona Centro",
    cities: "CDMX / Estado de México",
    flag: "🏙️",
    primary: true,
  },
  {
    zone: "Bajío",
    cities: "León / Querétaro / Pachuca",
    flag: "🏭",
    primary: false,
  },
  {
    zone: "Zona Norte",
    cities: "Monterrey",
    flag: "⛰️",
    primary: false,
  },
  {
    zone: "Zona Oriente",
    cities: "Puebla",
    flag: "🌄",
    primary: false,
  },
  {
    zone: "Península",
    cities: "Cancún",
    flag: "🌊",
    primary: false,
  },
];

const stats = [
  { value: "5", label: "Zonas estratégicas" },
  { value: "12+", label: "Ciudades cubiertas" },
  { value: "48h", label: "Respuesta máxima" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function CoverageSection() {
  return (
    <section id="cobertura" className="py-24 md:py-32 relative overflow-hidden">
      {/* bg gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--color-navy-deep) 0%, var(--color-navy) 60%, var(--color-navy-deep) 100%)",
        }}
      />
      <div className="section-divider mb-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* ─── Left: Text content ─── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            <motion.p variants={fadeUp} className="section-label mb-4">
              Alcance Nacional
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-extrabold leading-tight mb-5"
            >
              Donde tu empresa{" "}
              <span className="text-gradient">nos necesite</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mb-10 leading-relaxed text-silver"
            >
              Contamos con ubicaciones estratégicas en toda la República para
              brindar respuesta rápida y servicio consistente sin importar dónde
              esté su operación.
            </motion.p>

            {/* Location list */}
            <motion.div
              variants={containerVariants}
              className="space-y-3"
            >
              {locations.map((loc) => (
                <motion.div
                  key={loc.zone}
                  variants={fadeUp}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-colors duration-200 cursor-default group
                    ${
                      loc.primary
                        ? "bg-[var(--color-primary)]/10 border-[var(--color-primary)]/30"
                        : "bg-navy-card border-white/10 hover:border-cyan/30"
                    }`}
                >
                  <span className="text-xl flex-shrink-0">{loc.flag}</span>
                  <MapPin
                    className={`w-4 h-4 flex-shrink-0 ${
                      loc.primary
                        ? "text-cyan"
                        : "text-silver/70 group-hover:text-cyan transition-colors"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-white text-sm">
                      {loc.zone}
                    </span>
                    <span className="ml-2 text-sm text-silver/80">
                      — {loc.cities}
                    </span>
                  </div>
                  {loc.primary && (
                    <span className="flex-shrink-0 rounded-full bg-cyan/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-cyan">
                      Principal
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─── Right: Map visual + stats ─── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-6"
          >
            {/* Map placeholder */}
            <div className="relative h-72 overflow-hidden rounded-3xl border border-white/10 bg-navy-card lg:h-80">
              {/* Dot grid */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,188,212,0.15) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              {/* Centered map icon */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <Globe2 className="mb-3 h-16 w-16 text-cyan/40" />
                <p className="text-white/60 text-sm font-medium">República Mexicana</p>
              </motion.div>

              {/* Pulse dots for cities */}
              {[
                { top: "38%", left: "42%", delay: 0 },
                { top: "28%", left: "25%", delay: 0.5 },
                { top: "25%", left: "55%", delay: 1 },
                { top: "55%", left: "55%", delay: 1.5 },
                { top: "45%", left: "75%", delay: 0.8 },
              ].map((dot, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3"
                  style={{ top: dot.top, left: dot.left }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0.3, 0.8] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: dot.delay,
                    ease: "easeInOut",
                  }}
                >
                  <div className="h-full w-full rounded-full bg-cyan" />
                  <div className="absolute inset-0 rounded-full bg-cyan/30 animate-ping" />
                </motion.div>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                  className="glass-card-glow p-4 text-center"
                >
                  <div className="text-2xl font-extrabold text-gradient leading-none mb-1">
                    {s.value}
                  </div>
                  <div className="text-xs leading-tight text-silver/70">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Fast response callout */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 rounded-2xl border border-cyan/20 bg-cyan/10 p-5"
            >
              <Zap className="h-7 w-7 flex-shrink-0 text-cyan" />
              <div className="flex-1">
                <p className="text-white font-semibold text-sm">
                  Respuesta rápida garantizada
                </p>
                <p className="text-xs text-silver/80">
                  Cotización en menos de 24 h, servicio en 48 h.
                </p>
              </div>
              <a
                href="#contacto"
                className="flex flex-shrink-0 items-center gap-1 text-sm font-semibold text-cyan transition-all duration-200 hover:gap-2"
              >
                Contactar <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
