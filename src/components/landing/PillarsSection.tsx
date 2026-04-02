"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
 * "Fumigación Especializada" y "Capacitación DC-3" integrados en sus servicios padre.
 */

const services = [
  {
    title: "Protección Civil",
    description:
      "Elaboración de Programas Internos y formación de brigadas de emergencia.",
    image: "/Images/Servicios/proteccion-civil.png",
    badge: "PC",
  },
  {
    title: "Control Integral de Plagas",
    description:
      "Manejo Integrado de Plagas (MIP) para industrias, hospitales, hoteles y comercio. Licencia COFEPRIS.",
    image: "/Images/Servicios/control-integral-de-plagas.png",
    badge: "COFEPRIS",
  },
  {
    title: "Desinfección",
    description:
      "Contamos con el alta en el padrón de proveedores. Registro 871.",
    image: "/Images/Servicios/desinfeccion.png",
    badge: "COFEPRIS",
  },
  {
    title: "Recarga de Extintores",
    description:
      "Mantenimiento, recarga y pruebas hidrostáticas certificadas. Collarín y holograma oficial.",
    image: "/Images/Servicios/extintores.png",
    badge: "NOM-154",
  },
  {
    title: "Seguridad Industrial",
    description:
      "Consultoría STPS, análisis de riesgos (NOM-002, NOM-017) y capacitación DC-3.",
    image: "/Images/Servicios/seguridad-industrial.png",
    badge: "STPS",
  },
  {
    title: "Estudios de Medio Ambiente",
    description:
      "Estudios de Impacto Ambiental, Ruido Perimetral y trámites ante SEMARNAT y PROFEPA.",
    image: "/Images/Servicios/gestion-ambiental.png",
    badge: "ISO 14001",
  },
];

export default function PillarsSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#F5F5F5] py-20 lg:py-28"
      id="servicios"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(40,35,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(40,35,42,0.04)_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex rounded-full border border-[#0078B0]/40 bg-[#0078B0]/6 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#0078B0] mb-4"
          >
            Nuestros Servicios
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl font-bold text-[#28232A] md:text-5xl"
          >
            Soluciones profesionales
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-[#9EA1A0] text-sm md:text-base leading-relaxed"
          >
            Respondemos con operación técnica, documentación clara y
            cumplimiento normativo para sectores industriales, comerciales y
            corporativos.
          </motion.p>
        </div>

        {/* Grid simétrico: 1 col mobile → 2 cols tablet → 3 cols desktop */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#28232A]/8 bg-white shadow-[0_2px_12px_rgba(40,35,42,0.07)] transition-all duration-300 hover:border-[#0078B0]/35 hover:shadow-[0_8px_32px_rgba(0,120,176,0.12)] hover:-translate-y-1"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden bg-[#F5F5F5]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#28232A]/50 via-transparent to-transparent opacity-70" />
                {/* Badge de certificación */}
                <div className="absolute right-3 top-3">
                  <span className="inline-flex items-center rounded-md border border-[#A8B02D]/50 bg-[#A8B02D]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A8B02D] backdrop-blur-sm">
                    {service.badge}
                  </span>
                </div>
              </div>
              <div className="p-6 relative flex-1 flex flex-col">
                <h4 className="mb-2 text-[1.1rem] font-bold text-[#28232A] leading-tight">
                  {service.title}
                </h4>
                <p className="text-sm text-[#9EA1A0] leading-relaxed font-light flex-1">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
