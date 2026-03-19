"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Award, Leaf, HardHat, FileText, CheckCircle2 } from "lucide-react";

const norms = [
  {
    id: "NOM-154",
    label: "NOM-154-SCFI-2005",
    title: "Control de Plagas",
    desc: "Requisitos para prestadores de servicios en control de plagas.",
    icon: ShieldCheck,
    color: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  {
    id: "NOM-002",
    label: "NOM-002-STPS",
    title: "Prevención de Incendios",
    desc: "Condiciones de seguridad contra incendio en centros de trabajo.",
    icon: HardHat,
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30",
    dot: "bg-orange-400",
  },
  {
    id: "NOM-017",
    label: "NOM-017-STPS",
    title: "Equipo de Protección",
    desc: "Selección, uso y manejo de equipo de protección personal.",
    icon: Award,
    color: "from-blue-500/20 to-indigo-500/20",
    border: "border-blue-500/30",
    dot: "bg-blue-400",
  },
  {
    id: "NOM-030",
    label: "NOM-030-STPS",
    title: "Servicios Preventivos",
    desc: "Servicios preventivos de seguridad y salud en el trabajo.",
    icon: FileText,
    color: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/30",
    dot: "bg-violet-400",
  },
  {
    id: "ISO14001",
    label: "ISO 14001:2015",
    title: "Gestión Ambiental",
    desc: "Sistema de gestión ambiental para reducir impactos negativos.",
    icon: Leaf,
    color: "from-green-500/20 to-lime-500/20",
    border: "border-green-500/30",
    dot: "bg-green-400",
  },
  {
    id: "COFEPRIS",
    label: "Registro COFEPRIS",
    title: "Licencia Sanitaria",
    desc: "Licencia sanitaria vigente emitida por COFEPRIS para operar.",
    icon: CheckCircle2,
    color: "from-cyan-500/20 to-sky-500/20",
    border: "border-cyan-500/30",
    dot: "bg-cyan-400",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function NormsSection() {
  return (
    <section
      id="normatividad"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary)]/[0.03] to-transparent pointer-events-none" />
      <div className="section-divider mb-20" />

      <div className="max-w-7xl mx-auto px-6">
        {/* ─── Header ─── */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.p variants={cardVariants} className="section-label mb-4">
            Cumplimiento Legal
          </motion.p>
          <motion.h2
            variants={cardVariants}
            className="text-3xl md:text-4xl font-extrabold leading-tight mb-4"
          >
            Normas y{" "}
            <span className="text-gradient">Certificaciones</span>
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-[var(--color-text-muted)] leading-relaxed"
          >
            Operamos bajo los marcos regulatorios más exigentes de México,
            garantizando cumplimiento total en cada servicio.
          </motion.p>
        </motion.div>

        {/* ─── Norm Cards ─── */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {norms.map((norm) => (
            <motion.div
              key={norm.id}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl border ${norm.border} bg-gradient-to-br ${norm.color} backdrop-blur-sm p-6 cursor-default group overflow-hidden`}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="relative z-10">
                {/* Icon + dot */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">
                    <norm.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`w-2.5 h-2.5 rounded-full ${norm.dot} mt-1 animate-pulse`} />
                </div>

                {/* Norm badge */}
                <div className="inline-block text-xs font-mono font-bold text-white/60 tracking-widest uppercase mb-2">
                  {norm.label}
                </div>

                <h3 className="text-base font-bold text-white mb-1.5">
                  {norm.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {norm.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Bottom trust strip ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-14 glass-card-glow p-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left"
        >
          <CheckCircle2 className="w-8 h-8 text-[var(--color-primary)] flex-shrink-0" />
          <div>
            <p className="text-white font-semibold">
              Documentación disponible en todo momento
            </p>
            <p className="text-sm text-[var(--color-text-muted)]">
              Todas nuestras licencias y certificaciones pueden ser verificadas
              con las autoridades correspondientes.
            </p>
          </div>
          <a href="/verificar-certificado" className="btn-ghost flex-shrink-0 text-sm">
            Verificar ahora
          </a>
        </motion.div>
      </div>
    </section>
  );
}
