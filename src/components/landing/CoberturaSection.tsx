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
  "Mérida",
  "Veracruz",
  "Oaxaca",
  "Guanajuato",
];

// Approximate percentage coordinates for the interactive map pins
const pinLocations = [
  { name: "CDMX", left: "54%", top: "72.5%" },
  { name: "Toluca", left: "52%", top: "71%" },
  { name: "Estado de México", left: "52%", top: "69.5%" },
  { name: "Cuernavaca", left: "54.5%", top: "75%" },
  { name: "Pachuca", left: "55%", top: "67%" },
  { name: "Tlaxcala", left: "57.5%", top: "71.5%" },
  { name: "Puebla", left: "58%", top: "73.5%" },
  { name: "Querétaro", left: "51%", top: "66%" },
  { name: "Guanajuato", left: "48%", top: "64%" },
  { name: "Veracruz", left: "64%", top: "70%" },
  { name: "Oaxaca", left: "65%", top: "82%" },
  { name: "Mérida", left: "88%", top: "56%" },
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
              <span className="text-gradient">Cobertura Nacional</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-silver max-w-xl mx-auto leading-relaxed"
            >
              Operamos en las principales ciudades de México con atención
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
                  <CheckCircle className="w-4 h-4 text-valid shrink-0" />
                  <span className="text-sm font-medium text-white">
                    {city}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
             variants={fadeUp}
             className="relative mt-12 w-full max-w-5xl mx-auto"
          >
             {/* Map container holding aspect ratio of the SVG (1600 / 1058 ≈ 1.51) */}
             <div className="relative w-full aspect-1600/1058 sm:aspect-1600/1058 rounded-3xl bg-navy-card/30 p-2 sm:p-6 border border-white/5 shadow-2xl overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,188,212,0.05)_0%,transparent_100%)] pointer-events-none" />
               <img 
                 src="/Images/mapa-mexico.svg" 
                 alt="Mapa de México con Estados de Cobertura"
                 className="relative z-10 w-full h-full object-contain pointer-events-none drop-shadow-lg opacity-90"
                 draggable="false"
               />
               
               {/* Interactive Pins specific to the requested areas */}
               {pinLocations.map((pin, i) => (
                 <div
                   key={pin.name}
                   className="absolute z-20 group"
                   style={{ left: pin.left, top: pin.top, transform: "translate(-50%, -100%)" }}
                 >
                   <div className="relative flex flex-col items-center">
                     {/* Pulse effect */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                       <span className="relative flex h-3 w-3 sm:h-4 sm:w-4">
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-80 decoration-slice"></span>
                         <span className="relative inline-flex rounded-full h-3 w-3 sm:h-4 sm:w-4 bg-cyan/90 border border-navy-deep"></span>
                       </span>
                     </div>
                     {/* Tooltip on Hover */}
                     <div className="absolute bottom-full mb-2 sm:mb-3 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                       <div className="bg-navy-deep text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg border border-cyan/40 shadow-[0_4px_20px_rgba(0,188,212,0.3)] whitespace-nowrap truncate">
                         {pin.name}
                         <div className="absolute top-full left-1/2 -translate-x-1/2 border-solid border-t-navy-deep border-t-8 border-x-transparent border-x-8 border-b-0"></div>
                       </div>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
