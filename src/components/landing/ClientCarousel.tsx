"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
  { src: "/Images/Arkema.png", alt: "Arkema" },
  { src: "/Images/bostik.png", alt: "Bostik" },
  { src: "/Images/global%20denim.png", alt: "Global Denim" },
  { src: "/Images/imesa.png", alt: "IMESA" },
  { src: "/Images/inovatitive%20group.png", alt: "Inovatitive Group" },
  { src: "/Images/las%20migas.png", alt: "Las Migas" },
  { src: "/Images/sushiroll.png", alt: "Sushi Roll" },
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
    <section id="clientes" className="bg-navy py-12 lg:py-20 relative overflow-hidden">
      <div className="section-divider mb-16" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="max-w-7xl mx-auto px-6"
      >
        <motion.div variants={fadeUp} className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.15em] text-cyan font-semibold mb-4">
            NUESTROS CLIENTES
          </p>
          <h2 className="font-heading font-bold text-white text-3xl md:text-4xl">
            Empresas que confian en EHSW<sup>2</sup>
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} className="client-carousel-mask overflow-hidden relative">
          <div className="flex w-max animate-scroll">
            {loopedLogos.map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="flex-shrink-0 w-[180px] h-[90px] mx-3 bg-navy-light rounded-xl border border-white/5 flex items-center justify-center p-5"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={50}
                  className="object-contain max-h-[50px] w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 border-2 border-dashed border-cyan/30 rounded-2xl p-8 text-center bg-navy-light/30 backdrop-blur-sm"
        >
          <p className="text-silver text-lg mb-4">
            ¿Tu empresa podria ser la siguiente?
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center justify-center bg-cyan text-white px-6 py-3 rounded-lg hover:bg-cyan-dark transition-all duration-300"
          >
            Contactanos →
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
