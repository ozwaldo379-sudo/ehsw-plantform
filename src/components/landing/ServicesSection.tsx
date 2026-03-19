"use client";

import { motion } from "framer-motion";
import {
  Bug,
  Flame,
  Leaf,
  HardHat,
  Truck,
  FileCheck,
  Droplets,
  SprayCan,
  Activity,
} from "lucide-react";

const services = [
  {
    icon: Bug,
    title: "Control de Plagas",
    desc: "Fumigación certificada COFEPRIS para áreas comerciales, industriales y residenciales.",
    accent: "#10b981",
  },
  {
    icon: Flame,
    title: "Extintores y Recarga",
    desc: "Venta, recarga y mantenimiento de extintores con certificación NOM.",
    accent: "#f97316",
  },
  {
    icon: Leaf,
    title: "Gestión Ambiental",
    desc: "Manejo de residuos peligrosos, manifiestos y cumplimiento SEMARNAT.",
    accent: "#22c55e",
  },
  {
    icon: HardHat,
    title: "Seguridad Industrial",
    desc: "Programas de seguridad, señalización y equipo de protección personal.",
    accent: "#eab308",
  },
  {
    icon: Droplets,
    title: "Limpieza de Cisternas",
    desc: "Desinfección y limpieza de cisternas y tinacos con certificado.",
    accent: "#38bdf8",
  },
  {
    icon: SprayCan,
    title: "Sanitización",
    desc: "Desinfección de espacios con productos biodegradables certificados.",
    accent: "#a78bfa",
  },
  {
    icon: FileCheck,
    title: "Protección Civil",
    desc: "Elaboración de programas internos y capacitación de brigadas.",
    accent: "#f472b6",
  },
  {
    icon: Activity,
    title: "Capacitación STPS",
    desc: "Cursos normativos DC-3 para seguridad e higiene laboral.",
    accent: "#fb923c",
  },
  {
    icon: Truck,
    title: "Residuos Peligrosos",
    desc: "Recolección, transporte y disposición final conforme a NOM-052.",
    accent: "#94a3b8",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ServicesSection() {
  return (
    <section id="servicios" className="py-24 md:py-32 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto px-6">
        {/* ─── Header ─── */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.p variants={fadeUp} className="section-label mb-4">
            Nuestros Servicios
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-extrabold leading-tight mb-4"
          >
            Soluciones{" "}
            <span className="text-gradient">especializadas</span> para su
            empresa
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[var(--color-text-muted)] leading-relaxed"
          >
            Cubrimos todas las necesidades en higiene, seguridad industrial y
            medio ambiente bajo un mismo techo.
          </motion.p>
        </motion.div>

        {/* ─── Grid ─── */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              whileHover={{
                y: -6,
                transition: { duration: 0.22, ease: "easeOut" },
              }}
              className="service-card group relative overflow-hidden"
              style={
                {
                  "--accent": s.accent,
                } as React.CSSProperties
              }
            >
              {/* Subtle accent glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                style={{
                  background: `radial-gradient(80% 60% at 30% 20%, ${s.accent}12, transparent)`,
                }}
              />

              {/* Icon */}
              <div
                className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${s.accent}22`, border: `1px solid ${s.accent}44` }}
              >
                <s.icon
                  className="w-5 h-5"
                  style={{ color: s.accent }}
                />
              </div>

              <h3 className="relative z-10 text-lg font-bold text-white mb-2">
                {s.title}
              </h3>
              <p className="relative z-10 text-sm text-[var(--color-text-muted)] leading-relaxed">
                {s.desc}
              </p>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-400 ease-out"
                style={{ background: `linear-gradient(90deg, ${s.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
