"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CertBadge from "@/components/landing/CertBadge";

const topServices = [
  {
    title: "Desinfección",
    description:
      "Contamos con el alta en el padrón de proveedores. Registro 871.",
    image: "/Images/Servicios/desinfeccion.png",
    alt: "Servicio de desinfección industrial realizado por técnico especializado",
  },
  {
    title: "Impacto Ambiental",
    description:
      "Manifestación de impacto ambiental, estudio de riesgo, ruido perimetral y flora silvestre.",
    image: "/Images/Servicios/impacto-ambiental.png",
    alt: "Especialista realizando evaluación de impacto ambiental en campo",
  },
  {
    title: "Protección Civil",
    description:
      "Elaboración de Programas Internos y formación de brigadas de emergencia.",
    image: "/Images/Servicios/proteccion-civil.png",
    alt: "Brigada de protección civil en capacitación operativa",
  },
];

const largeService = {
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
  techniques: [
    "Nebulizaciones en frío y termonebulización",
    "Aspersión de alta y baja presión",
    "Micro-inyección y aplicación de gel",
    "Control de roedores (cebado táctico)",
  ],
};

const supportServices = [
  {
    title: "Extintores",
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
    title: "Gestión Ambiental",
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
  {
    title: "Protección Civil",
    description:
      "Elaboración de Programas Internos y formación de brigadas de emergencia.",
    image: "/Images/Servicios/proteccion-civil.png",
    alt: "Equipo de protección civil coordinando respuesta de emergencia",
    badge: {
      label: "PC",
      tooltip:
        "Programa Interno de Protección Civil — Formación de brigadas y simulacros",
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

function ServiceCard({
  title,
  description,
  image,
  alt,
}: (typeof topServices)[number]) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-xl border border-transparent bg-navy-card transition-all duration-300 ease-out hover:border-cyan/40 hover:shadow-[0_20px_40px_-24px_rgba(0,188,212,0.28)]"
    >
      <div className="relative h-[200px] overflow-hidden">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-silver">{description}</p>
      </div>
    </motion.article>
  );
}

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

        <div className="mb-5 grid gap-5 lg:grid-cols-3">
          {topServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:auto-rows-[260px]">
          <motion.article
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-transparent bg-navy-card transition-all duration-300 ease-out hover:border-cyan/40 hover:shadow-[0_24px_44px_-24px_rgba(0,188,212,0.3)] lg:row-span-2"
          >
            <div className="relative h-[240px] overflow-hidden lg:flex-1">
              <Image
                src={largeService.image}
                alt={largeService.alt}
                fill
                className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              />
              <div className="absolute right-3 top-3">
                <CertBadge
                  label={largeService.badge.label}
                  tooltip={largeService.badge.tooltip}
                />
              </div>
            </div>

            <div className="p-4">
              <h3 className="mb-3 text-2xl font-bold text-white">
                {largeService.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-silver">
                {largeService.description}
              </p>
              <ul className="space-y-2 text-sm leading-relaxed text-silver">
                {largeService.techniques.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>

          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-2 lg:grid-rows-2">
            {supportServices.map((service) => (
              <motion.article
                key={service.title + service.badge.label}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-transparent bg-navy-card transition-all duration-300 ease-out hover:border-cyan/40 hover:shadow-[0_20px_40px_-24px_rgba(0,188,212,0.28)]"
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

                <div className="p-4">
                  <h4 className="mb-2 text-xl font-bold text-white">
                    {service.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-silver">
                    {service.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
