"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ShieldCheck,
  Award,
  Building2,
  ArrowRight,
} from "lucide-react";
import { siteConfig } from "@/config/site";

const trustBadges = [
  { icon: ShieldCheck, label: "COFEPRIS" },
  { icon: Award, label: "STPS" },
  { icon: Building2, label: "Protección Civil" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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
      className="relative min-h-screen flex items-center overflow-hidden pt-28 md:pt-32"
    >
      <div className="gradient-radial-hero" />
      <div className="dot-grid-bg" />

      <div
        className="orb orb-primary animate-float"
        style={{ width: 420, height: 420, top: "-8%", left: "-8%" }}
      />
      <div
        className="orb orb-accent animate-float"
        style={{
          width: 320,
          height: 320,
          bottom: "5%",
          right: "-3%",
          animationDelay: "2s",
        }}
      />

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-12 xl:gap-16 items-center">
          <div className="max-w-3xl">
            <motion.p variants={itemVariants} className="section-label mb-6">
              Certificación digital y cumplimiento normativo
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight mb-6"
            >
              Servicios EHS con respaldo
              <span className="text-gradient"> real en campo</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mb-10 leading-relaxed"
            >
              Control integral de plagas, extintores, gestión ambiental y
              seguridad industrial para empresas mexicanas que necesitan
              atención rápida, evidencia clara y cumplimiento verificable.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
            >
              <a
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Solicitar cotización
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#certificados" className="btn-ghost">
                <ShieldCheck className="w-4 h-4" />
                Verificar certificado
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-8 flex-wrap"
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
          </div>

          <motion.div
            variants={itemVariants}
            className="relative lg:justify-self-end w-full max-w-xl"
          >
            <div className="absolute -inset-3 rounded-[32px] bg-[radial-gradient(circle_at_top,rgba(0,188,212,0.24),transparent_58%)] blur-2xl" />
            <div className="relative glass-card-glow p-3 md:p-4 rounded-[28px]">
              <div className="relative overflow-hidden rounded-[22px] min-h-[420px] md:min-h-[560px]">
                <Image
                  src="/Images/Servicios/empleado-plagas-ehsw2.png"
                  alt="Técnico EHSW2"
                  width={600}
                  height={700}
                  priority
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 animate-scroll-bounce">
        <ChevronDown className="w-6 h-6 text-[var(--color-text-subtle)]" />
      </div>
    </section>
  );
}
