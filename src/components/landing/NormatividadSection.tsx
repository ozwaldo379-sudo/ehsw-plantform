"use client";

import { motion } from "framer-motion";

const norms = [
  "NOM-256-SSA1-2012",
  "NOM-017-STPS-2008",
  "NOM-002-STPS-2010",
  "NOM-005-STPS-1998",
  "NOM-006-STPS-2014",
  "NOM-009-STPS-2011",
  "NOM-026-STPS-2008",
  "NOM-030-STPS-2009",
  "NOM-052-SEMARNAT-2005",
  "NOM-087-SEMARNAT-SSA1-2002",
  "LGPGIR",
  "Ley General de Protección Civil",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function NormatividadSection() {
  return (
    <section id="normatividad" className="py-24 md:py-32 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          className="text-center"
        >
          <motion.p variants={fadeUp} className="section-label mb-4">
            Normatividad
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl md:text-4xl font-extrabold leading-tight mb-4"
          >
            Cumplimiento <span className="text-gradient">normativo</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[var(--color-text-muted)] max-w-xl mx-auto mb-12 leading-relaxed"
          >
            Trabajamos bajo las normas oficiales mexicanas que regulan la
            seguridad, higiene y medio ambiente.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-3"
          >
            {norms.map((n) => (
              <span key={n} className="norm-chip">
                {n}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
