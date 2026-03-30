"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const columns = [
  {
    id: "sanidad",
    title: "Sanidad y Desinfección",
    items: [
      {
        title: "Desinfección",
        description: "Contamos con el alta en el padrón de proveedores y cumplimiento de todos los estándares sanitarios.",
        image: "/images/servicios/desinfeccion.png",
      },
      {
        title: "Control Integral de Plagas",
        description: "Manejo Integrado de Plagas (MIP) para industrias, hospitales, hoteles y comercio. Licencia COFEPRIS.",
        image: "/images/servicios/control-integral-de-plagas.png",
      },
      {
        title: "Fumigación Especializada",
        description: "Servicios especializados de aspersión y nebulización para asegurar espacios libres de vectores.",
        image: "/images/servicios/fumigacion_2.jpeg",
      },
    ],
  },
  {
    id: "seguridad",
    title: "Seguridad y Protección Civil",
    items: [
      {
        title: "Protección Civil",
        description: "Elaboración de Programas Internos y formación de brigadas de emergencia.",
        image: "/images/servicios/proteccion-civil.png",
      },
      {
        title: "Seguridad Industrial",
        description: "Consultoría STPS, análisis de riesgos (NOM-002, NOM-017) y estrategias corporativas.",
        image: "/images/servicios/seguridad-industrial.png",
      },
      {
        title: "Capacitación DC-3",
        description: "Capacitación especializada con emisión de constancias de habilidades DC-3 STPS.",
        image: "/images/servicios/capacitacion_ehsw2.jpeg",
      },
      {
        title: "Extintores y Equipos",
        description: "Mantenimiento, recarga y pruebas hidrostáticas certificadas. Collarín y holograma oficial.",
        image: "/images/servicios/extintores.png",
      },
    ],
  },
  {
    id: "medio-ambiente",
    title: "Medio Ambiente",
    items: [
      {
        title: "Impacto Ambiental",
        description: "Manifestación de impacto ambiental, estudio de riesgo, ruido perimetral y flora silvestre.",
        image: "/images/servicios/impacto-ambiental.png",
      },
      {
        title: "Gestión Ambiental",
        description: "Asesoría ISO 14001, estudios de medio ambiente y trámites ante SEMARNAT y PROFEPA.",
        image: "/images/servicios/gestion-ambiental.png",
      },
    ],
  },
];

export default function PillarsSection() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-20 lg:py-28" id="servicios">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex rounded-full border border-cyan/50 bg-cyan/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan mb-4"
          >
            Nuestros Servicios
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl font-bold text-white md:text-5xl"
          >
            Soluciones profesionales
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-silver text-sm md:text-base leading-relaxed"
          >
            Respondemos con operación técnica, documentación clara y cumplimiento normativo para sectores industriales, comerciales y corporativos.
          </motion.p>
        </div>

        {/* 3 Columns Layout */}
        <div className="grid gap-8 md:grid-cols-3 items-start">
          {columns.map((column, colIndex) => (
            <div key={column.id} className="flex flex-col gap-6">
              {/* Optional: Column Title */}
              <div className="hidden">
                 <h3 className="text-xl items-center font-bold text-cyan tracking-wide">{column.title}</h3>
              </div>
              
              {column.items.map((item, itemIndex) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: colIndex * 0.1 + itemIndex * 0.15 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_12px_32px_-18px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-cyan/40 hover:bg-white/10 hover:shadow-[0_20px_40px_-20px_rgba(0,188,212,0.2)] hover:-translate-y-1"
                >
                  <div className="relative aspect-16/10 w-full overflow-hidden bg-black/20">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-navy-deep/80 via-transparent to-transparent opacity-80" />
                  </div>
                  <div className="p-6 relative">
                    <h4 className="mb-2 text-[1.1rem] font-bold text-white leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-sm text-silver/90 leading-relaxed font-light">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
