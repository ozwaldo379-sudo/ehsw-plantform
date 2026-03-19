"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const featuredServices = [
  {
    title: "Control Integral de Plagas",
    desc: "Intervención técnica con evidencia fotográfica, cobertura comercial e industrial y respaldo documental para auditoría.",
    image: "/Images/Servicios/control-integral-de-plagas.png",
  },
  {
    title: "Extintores (NOM-154)",
    desc: "Venta, revisión, mantenimiento y recarga con seguimiento claro para seguridad operativa y cumplimiento normativo.",
    image: "/Images/Servicios/extintores.png",
  },
  {
    title: "Desinfección",
    desc: "Procesos de sanitización y desinfección para espacios sensibles, de alto tránsito y operación continua.",
    image: "/Images/Servicios/desinfeccion.png",
  },
  {
    title: "Gestión Ambiental",
    desc: "Acompañamiento en cumplimiento ambiental, reportes y procesos alineados con requerimientos regulatorios.",
    image: "/Images/Servicios/gestion-ambiental.png",
  },
  {
    title: "Seguridad Industrial",
    desc: "Diagnóstico, prevención y ejecución de medidas para riesgos operativos, personal y cumplimiento interno.",
    image: "/Images/Servicios/seguridad-industrial.png",
  },
];

const otherServices = [
  {
    title: "Protección Civil",
    desc: "Programas internos, brigadas y atención de requisitos operativos para centros de trabajo.",
    image: "/Images/Servicios/proteccion-civil.png",
  },
  {
    title: "Impacto Ambiental",
    desc: "Soporte técnico para levantamientos, análisis y documentación asociada a proyectos con impacto regulatorio.",
    image: "/Images/Servicios/impacto-ambiental.png",
  },
  {
    title: "Otros Servicios",
    desc: "Soluciones complementarias en higiene, seguridad y medio ambiente adaptadas al giro y nivel de riesgo del cliente.",
    image: "/Images/Servicios/otros-servicios.png",
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
    <section id="servicios" className="py-12 lg:py-20 relative">
      <div className="section-divider mb-16" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
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
            Soluciones <span className="text-gradient">especializadas</span>{" "}
            para su empresa
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-silver leading-relaxed"
          >
            Cubrimos necesidades operativas, de cumplimiento y prevención con
            una ejecución visualmente clara y documentación lista para entregar.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.06 } },
          }}
        >
          {featuredServices.map((service) => (
            <motion.article
              key={service.title}
              variants={fadeUp}
              whileHover={{
                y: -6,
                transition: { duration: 0.22, ease: "easeOut" },
              }}
              className="service-card group relative overflow-hidden flex flex-col"
            >
              <div className="relative overflow-hidden rounded-lg h-[220px] mb-5">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={720}
                  height={440}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-primary)] mb-3">
                Servicio principal
              </div>
              <h3 className="relative z-10 text-xl font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="relative z-10 text-sm text-silver leading-relaxed">
                {service.desc}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-14"
        >
          <motion.div variants={fadeUp} className="max-w-2xl mb-8">
            <p className="section-label mb-3">Otros Servicios</p>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Cobertura complementaria para operación, cumplimiento y respuesta
            </h3>
            <p className="text-silver leading-relaxed">
              Integramos soluciones complementarias cuando el proyecto requiere
              soporte adicional en prevención, impacto ambiental o continuidad
              de operación.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {otherServices.map((service) => (
              <motion.article
                key={service.title}
                variants={fadeUp}
                className="glass-card-glow p-4 rounded-[20px]"
              >
                <div className="relative overflow-hidden rounded-lg h-[220px] mb-5">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={720}
                    height={440}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h4>
                <p className="text-sm text-silver leading-relaxed">
                  {service.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
