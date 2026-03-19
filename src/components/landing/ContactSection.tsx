"use client";

import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState, FormEvent } from "react";

const contactInfo = [
  { icon: Phone, label: "Teléfono", value: "+52 55 1234 5678" },
  { icon: Mail, label: "Email", value: "contacto@ehsw2.com" },
  { icon: MapPin, label: "Ubicación", value: "CDMX, México" },
  { icon: Clock, label: "Horario", value: "Lun–Vie 8:00–18:00" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section id="contacto" className="py-24 md:py-32 relative">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {/* ─── Header ─── */}
          <div className="text-center mb-16">
            <motion.p variants={fadeUp} className="section-label mb-4">
              Contacto
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-4xl font-extrabold leading-tight mb-4"
            >
              ¿Listo para <span className="text-gradient">proteger</span> su
              empresa?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-[var(--color-text-muted)] max-w-xl mx-auto"
            >
              Contáctenos para una cotización sin compromiso. Respondemos en
              menos de 24 horas.
            </motion.p>
          </div>

          {/* ─── Grid ─── */}
          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact Info */}
            <motion.div
              variants={fadeUp}
              className="md:col-span-2 flex flex-col gap-4"
            >
              {contactInfo.map((c) => (
                <div
                  key={c.label}
                  className="glass-card-glow p-5 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-lg gradient-main flex items-center justify-center flex-shrink-0">
                    <c.icon className="w-4 h-4 text-[var(--color-bg-dark)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--color-text-subtle)] mb-0.5">
                      {c.label}
                    </div>
                    <div className="text-sm font-semibold text-white">
                      {c.value}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeUp} className="md:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="glass-card-glow p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-[var(--color-text-subtle)] mb-2"
                    >
                      Nombre
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Su nombre"
                      className="contact-input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-xs font-medium text-[var(--color-text-subtle)] mb-2"
                    >
                      Empresa
                    </label>
                    <input
                      id="company"
                      type="text"
                      placeholder="Su empresa"
                      className="contact-input"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-[var(--color-text-subtle)] mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="correo@ejemplo.com"
                      className="contact-input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-medium text-[var(--color-text-subtle)] mb-2"
                    >
                      Teléfono
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+52 55..."
                      className="contact-input"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="service"
                    className="block text-xs font-medium text-[var(--color-text-subtle)] mb-2"
                  >
                    Servicio de Interés
                  </label>
                  <select id="service" className="contact-input" required>
                    <option value="">Seleccione un servicio</option>
                    <option>Control de Plagas</option>
                    <option>Extintores</option>
                    <option>Gestión Ambiental</option>
                    <option>Seguridad Industrial</option>
                    <option>Protección Civil</option>
                    <option>Capacitación STPS</option>
                    <option>Sanitización</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-[var(--color-text-subtle)] mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Describa sus necesidades..."
                    className="contact-input resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {status === "sending" ? (
                    <span className="animate-spin-slow inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  ) : status === "sent" ? (
                    "¡Enviado con éxito!"
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar Solicitud
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
