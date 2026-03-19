"use client";

import { motion } from "framer-motion";
import { Users, CalendarDays, Briefcase, ShieldCheck, Award, Building2 } from "lucide-react";

const stats = [
  { value: "10+", label: "Años de Experiencia", icon: CalendarDays },
  { value: "500+", label: "Clientes Atendidos", icon: Users },
  { value: "15+", label: "Servicios Activos", icon: Briefcase },
];

const trustCards = [
  {
    icon: ShieldCheck,
    title: "Certificados COFEPRIS",
    desc: "Licencia sanitaria vigente para control de plagas y gestión ambiental.",
  },
  {
    icon: Award,
    title: "Cumplimiento STPS",
    desc: "Capacitaciones y servicios alineados a las normas de seguridad laboral.",
  },
  {
    icon: Building2,
    title: "Protección Civil",
    desc: "Programas internos y capacitación para brigadas de emergencia.",
  },
];

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-24 md:py-32 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid md:grid-cols-2 gap-16 items-start"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* ─── Left Column ─── */}
          <div>
            <motion.p variants={fadeUp} className="section-label mb-4">
              Sobre Nosotros
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-extrabold leading-tight mb-6"
            >
              Protegemos su empresa con{" "}
              <span className="text-gradient">soluciones integrales</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[var(--color-text-muted)] leading-relaxed mb-10"
            >
              En EHSW² nos especializamos en servicios de higiene, seguridad y
              medio ambiente. Desde control de plagas certificado hasta programas
              de protección civil, ayudamos a su empresa a cumplir con toda la
              normatividad aplicable.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="text-center p-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-glass-border)]"
                >
                  <s.icon className="w-5 h-5 text-[var(--color-primary)] mx-auto mb-2" />
                  <div className="text-2xl font-extrabold text-white">
                    {s.value}
                  </div>
                  <div className="text-xs text-[var(--color-text-subtle)] mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── Right Column: Trust Cards ─── */}
          <div className="flex flex-col gap-4">
            {trustCards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className="glass-card-glow p-6 flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-xl gradient-main flex items-center justify-center">
                  <card.icon className="w-5 h-5 text-[var(--color-bg-dark)]" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{card.title}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
