"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CertBadge from "@/components/landing/CertBadge";

/*
 * Orden estricto (definido por el negocio):
 *  1. Protección civil
 *  2. Control de plagas
 *  3. Desinfección
 *  4. Recarga de extintores
 *  5. Seguridad industrial
 *  6. Estudios de medio ambiente
 *
 * "Impacto ambiental" fue ELIMINADO.
 */

const services = [
  {
    title: "Protección Civil",
    description:
      "Elaboración de Programas Internos y formación de brigadas de emergencia.",
    image: "/Images/Servicios/proteccion-civil.png",
    alt: "Brigada de protección civil en capacitación operativa",
    badge: {
      label: "PC",
      tooltip:
        "Programa Interno de Protección Civil — Formación de brigadas y simulacros",
    },
  },
  {
    title: "Control Integral de Plagas",
    description:
      "Manejo Integrado de Plagas (MIP) para industrias, hospitales, hoteles y comercio. Licencia COFEPRIS.",
    image: "/Images/Servicios/control-integral-de-plagas.png",
    alt: "Panel informativo de control integral de plagas con técnico EHSW2",
    badge: {
      label: "COFEPRIS",
      tooltip:
        "Comisión Federal para la Protección contra Riesgos Sanitarios — Registro de proveedor autorizado",
    },
  },
  {
    title: "Desinfección",
    description:
      "Contamos con el alta en el padrón de proveedores. Registro 871.",
    image: "/Images/Servicios/desinfeccion.png",
    alt: "Servicio de desinfección industrial realizado por técnico especializado",
    badge: {
      label: "COFEPRIS",
      tooltip:
        "Comisión Federal para la Protección contra Riesgos Sanitarios — Registro de proveedor autorizado",
    },
  },
  {
    title: "Recarga de Extintores",
    description:
      "Mantenimiento, recarga y pruebas hidrostáticas certificadas. Collarín y holograma oficial.",
    image: "/Images/Servicios/extintores.png",
    alt: "Técnico revisando extintores con equipo de protección",
    badge: {
      label: "NOM-154",
      tooltip:
        "Norma Oficial Mexicana — Extintores contra incendio, mantenimiento y recarga",
    },
  },
  {
    title: "Seguridad Industrial",
    description:
      "Consultoría STPS, análisis de riesgos (NOM-002, NOM-017) y capacitación DC-3.",
    image: "/Images/Servicios/seguridad-industrial.png",
    alt: "Consultor de seguridad industrial realizando inspección técnica",
    badge: {
      label: "STPS",
      tooltip:
        "Secretaría del Trabajo y Previsión Social — Norma de equipo de protección personal",
    },
  },
  {
    title: "Estudios de Medio Ambiente",
    description:
      "Estudios de Impacto Ambiental, Ruido Perimetral y trámites ante dependencias.",
    image: "/Images/Servicios/gestion-ambiental.png",
    alt: "Consultora en gestión ambiental con documentación técnica",
    badge: {
      label: "ISO 14001",
      tooltip:
        "Sistema de Gestión Ambiental — Estándar internacional para cumplimiento ambiental",
    },
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ServicesSection() {
  return (
    <section id="servicios" className="relative py-12 lg:py-20">
      <div className="section-divider mb-16" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="mx-auto max-w-7xl px-6"
      >
        <motion.div variants={fadeUp} className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan">
            Nuestros Servicios
          </p>
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Soluciones profesionales
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-silver">
            Respondemos con operación técnica, documentación clara y cumplimiento
            normativo para sectores industriales, comerciales y corporativos.
          </p>
        </motion.div>

        {/* Grid simétrico: 1 col mobile → 2 cols tablet → 3 cols desktop */}
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group flex flex-col overflow-hidden rounded-xl border border-transparent bg-navy-card transition-all duration-300 ease-out hover:border-cyan/40 hover:shadow-[0_20px_40px_-24px_rgba(0,188,212,0.28)]"
            >
              <div className="relative h-[200px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <div className="absolute right-3 top-3">
                  <CertBadge
                    label={service.badge.label}
                    tooltip={service.badge.tooltip}
                  />
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="mb-2 text-xl font-bold text-white">{service.title}</h3>
                <p className="text-sm leading-relaxed text-silver flex-1">
                  {service.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
