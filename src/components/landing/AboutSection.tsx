"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Building2 } from "lucide-react";

const logos = [
  { src: "/Images/Arkema.png", alt: "Arkema" },
  { src: "/Images/bostik.png", alt: "Bostik" },
  { src: "/Images/global denim.png", alt: "Global Denim" },
  { src: "/Images/imesa.png", alt: "IMESA" },
  { src: "/Images/inovatitive group.png", alt: "Inovatitive Group" },
  { src: "/Images/las migas.png", alt: "Las Migas" },
  { src: "/Images/sushiroll.png", alt: "Sushi Roll" },
];

const trustCards = [
  {
    icon: ShieldCheck,
    title: "Certificados COFEPRIS",
    desc: "Licencia sanitaria vigente para control de plagas y servicios asociados.",
  },
  {
    icon: Award,
    title: "Cumplimiento STPS",
    desc: "Procesos alineados a normas de seguridad laboral y soporte documental.",
  },
  {
    icon: Building2,
    title: "Protección Civil",
    desc: "Atención técnica y operativa para programas internos y brigadas de emergencia.",
  },
];

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-24 md:py-32 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUp} className="relative">
            <div className="absolute -inset-3 rounded-[30px] bg-[radial-gradient(circle_at_top,rgba(0,188,212,0.2),transparent_60%)] blur-2xl" />
            <div className="relative glass-card-glow p-3 rounded-[28px]">
              <div className="overflow-hidden rounded-[22px]">
                <Image
                  src="/Images/Servicios/quienes-somos.png"
                  alt="Equipo EHSW2"
                  width={920}
                  height={740}
                  className="w-full h-[420px] md:h-[520px] object-cover"
                />
              </div>
            </div>
          </motion.div>

          <div>
            <motion.p variants={fadeUp} className="section-label mb-4">
              ¿Quiénes Somos?
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-extrabold leading-tight mb-6"
            >
              Operación técnica, atención cercana y{" "}
              <span className="text-gradient">evidencia certificable</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[var(--color-text-muted)] leading-relaxed mb-5"
            >
              En EHSW2 acompañamos a industrias, comercios y centros de trabajo
              con servicios de higiene, seguridad y medio ambiente orientados a
              cumplimiento, prevención y trazabilidad.
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
              {[
                { value: "10+", label: "Años de experiencia" },
                { value: "500+", label: "Clientes atendidos" },
                { value: "24h", label: "Tiempo de respuesta" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[var(--color-glass-border)]"
                >
                  <div className="text-2xl font-extrabold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--color-text-subtle)] mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-[var(--color-text-muted)] leading-relaxed mt-6 mb-6"
            >
              Integramos levantamiento en sitio, ejecución técnica, QR de
              validación y documentación para que cada servicio tenga sustento
              operativo y una presentación profesional frente a auditorías,
              clientes o inspecciones.
            </motion.p>

            {trustCards.map((card, index) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className={`glass-card-glow p-6 flex items-start gap-4 ${
                  index < trustCards.length - 1 ? "mb-4" : ""
                }`}
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

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="mt-16 glass-card px-6 py-8 logo-strip"
        >
          <motion.p variants={fadeUp} className="section-label text-center mb-6">
            Empresas que han confiado en EHSW2
          </motion.p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 items-center">
            {logos.map((logo) => (
              <motion.div
                key={logo.alt}
                variants={fadeUp}
                className="h-20 rounded-2xl bg-white/90 flex items-center justify-center px-4 py-3"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={64}
                  className="max-h-10 w-auto object-contain"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
