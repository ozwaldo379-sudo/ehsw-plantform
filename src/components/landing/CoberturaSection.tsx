"use client";

import { motion } from "framer-motion";
import { MapPin, CheckCircle } from "lucide-react";

const cities = [
  "CDMX",
  "Toluca",
  "Puebla",
  "Querétaro",
  "Cuernavaca",
  "Pachuca",
  "Tlaxcala",
  "Estado de México",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function CoberturaSection() {
  return (
    <section id="cobertura" className="py-12 lg:py-20 relative">
      <div className="section-divider mb-16" />
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <div className="text-center mb-14">
            <motion.p variants={fadeUp} className="section-label mb-4">
              Cobertura
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-extrabold leading-tight mb-4"
            >
              Servicio en toda la{" "}
              <span className="text-gradient">Zona Centro</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-silver max-w-xl mx-auto leading-relaxed"
            >
              Cubrimos CDMX y estados del centro de México con atención
              personalizada y tiempos de respuesta rápidos.
            </motion.p>
          </div>

          <motion.div
            variants={fadeUp}
            className="glass-card-glow p-8 md:p-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-6 h-6 text-cyan" />
              <h3 className="text-xl font-bold text-white">
                Áreas de Servicio
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {cities.map((city) => (
                <div
                  key={city}
                  className="flex items-center gap-2 rounded-xl border border-white/10 bg-navy-card p-3"
                >
                  <CheckCircle className="w-4 h-4 text-valid flex-shrink-0" />
                  <span className="text-sm font-medium text-white">
                    {city}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
