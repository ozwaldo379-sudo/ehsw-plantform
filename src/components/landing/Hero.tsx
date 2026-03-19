"use client";

import { motion } from "framer-motion";
import {
  ChevronDown,
  ShieldCheck,
  Award,
  Building2,
} from "lucide-react";

const trustBadges = [
  { icon: ShieldCheck, label: "COFEPRIS" },
  { icon: Award, label: "STPS" },
  { icon: Building2, label: "Protección Civil" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ─── Background Layers ─── */}
      <div className="gradient-radial-hero" />
      <div className="dot-grid-bg" />

      {/* Floating orbs */}
      <div
        className="orb orb-primary animate-float"
        style={{ width: 400, height: 400, top: "-10%", left: "-8%" }}
      />
      <div
        className="orb orb-accent animate-float"
        style={{
          width: 300,
          height: 300,
          bottom: "5%",
          right: "-5%",
          animationDelay: "2s",
        }}
      />
      <div
        className="orb orb-violet animate-pulse-glow"
        style={{
          width: 200,
          height: 200,
          top: "25%",
          right: "15%",
          animationDelay: "1s",
        }}
      />

      {/* ─── Content ─── */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Tagline */}
        <motion.p variants={itemVariants} className="section-label mb-6">
          Especialistas en EHS desde 2015
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6"
        >
          Higiene, Seguridad{" "}
          <br className="hidden sm:block" />
          <span className="text-gradient">& Medio Ambiente</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Control de plagas, gestión ambiental y seguridad industrial con
          certificaciones COFEPRIS, STPS y Protección Civil.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <a href="#contacto" className="btn-primary">
            Solicitar Cotización
          </a>
          <a href="/verificar-certificado" className="btn-ghost">
            <ShieldCheck className="w-4 h-4" />
            Verificar Certificado
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-8 flex-wrap"
        >
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 text-[var(--color-text-subtle)] text-sm"
            >
              <badge.icon className="w-4 h-4 text-[var(--color-primary)]" />
              <span>{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ─── Scroll Indicator ─── */}
      <div className="absolute bottom-8 left-1/2 animate-scroll-bounce">
        <ChevronDown className="w-6 h-6 text-[var(--color-text-subtle)]" />
      </div>
    </section>
  );
}
