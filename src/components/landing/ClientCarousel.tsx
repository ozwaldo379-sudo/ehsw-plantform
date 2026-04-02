"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: "/Images/Arkema.png", alt: "Logo de Arkema" },
  { src: "/Images/bostik.png", alt: "Logo de Bostik" },
  { src: "/Images/global%20denim.png", alt: "Logo de Global Denim" },
  { src: "/Images/imesa.png", alt: "Logo de IMESA" },
  { src: "/Images/inovatitive%20group.png", alt: "Logo de Inovatitive Group" },
  { src: "/Images/las%20migas.png", alt: "Logo de Las Migas" },
  { src: "/Images/sushiroll.png", alt: "Logo de Sushi Roll" },
  { src: "/Images/INDITEX.svg", alt: "Logo de Inditex" },
  { src: "/Images/autoplastic.png", alt: "Logo de Autoplastic" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ClientCarousel() {
  const loopedLogos = [...logos, ...logos];

  return (
    <section id="clientes" className="bg-[#FEFEFE] py-12 lg:py-20 relative overflow-hidden">
      <div className="section-divider mb-16" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-7xl mx-auto px-6"
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.15em] text-[#0078B0] font-semibold mb-4">
            NUESTROS CLIENTES
          </p>
          <h2 className="font-heading font-bold text-[#28232A] text-3xl md:text-4xl">
            Empresas que confían en nosotros
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} className="client-carousel-mask overflow-hidden relative">
          <div className="carousel-track">
            {loopedLogos.map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="flex min-w-[150px] h-[70px] flex-shrink-0 items-center justify-center rounded-lg border border-[#28232A]/8 bg-white px-5 py-3 shadow-sm"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={50}
                  className="max-h-[45px] w-auto object-contain grayscale-[30%] opacity-80 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 rounded-2xl border-2 border-dashed border-[#0078B0]/25 bg-[#F5F5F5] p-8 text-center"
        >
          <p className="text-[#9EA1A0] text-lg mb-4">
            ¿Tu empresa podría ser la siguiente?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center bg-[#0078B0] text-white px-6 py-3 rounded-lg hover:bg-[#0A6DA8] transition-all duration-300 font-semibold"
          >
            Contáctanos →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
