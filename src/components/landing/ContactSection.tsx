"use client";

import { useState } from "react";

export default function ContactSection() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    }

    return (
        <section id="contacto" className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="glass-card overflow-hidden">
                    {/* Header */}
                    <div className="gradient-main p-10 text-center text-[var(--color-bg-dark)]">
                        <h2 className="text-3xl font-bold mb-2">Contáctanos</h2>
                        <p className="font-medium text-lg opacity-90">
                            Solicita una visita técnica o cotización sin compromiso.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-12 p-10">
                        {/* Contact Details */}
                        <div className="flex flex-col gap-6 justify-center">
                            <div className="flex items-center gap-4 text-lg">
                                <div className="w-12 h-12 bg-[rgba(255,255,255,0.1)] text-[var(--color-primary)] rounded-full flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <span>(55) 6379-2273</span>
                            </div>
                            <div className="flex items-center gap-4 text-lg">
                                <div className="w-12 h-12 bg-[rgba(255,255,255,0.1)] text-[var(--color-primary)] rounded-full flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <span>contacto@ehsw2.com</span>
                            </div>
                            <div className="flex items-center gap-4 text-lg">
                                <div className="w-12 h-12 bg-[rgba(255,255,255,0.1)] text-[var(--color-primary)] rounded-full flex items-center justify-center shrink-0">
                                    <i className="fa-brands fa-whatsapp"></i>
                                </div>
                                <span>WhatsApp Directo</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form
                            className="contact-form flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                placeholder="Nombre completo"
                                required
                                className="w-full"
                            />
                            <input
                                type="email"
                                placeholder="Correo corporativo"
                                required
                                className="w-full"
                            />
                            <select className="w-full" required>
                                <option value="">Interés principal...</option>
                                <option>Control de Plagas</option>
                                <option>Extintores</option>
                                <option>Seguridad Industrial</option>
                                <option>Gestión Ambiental</option>
                                <option>Otro</option>
                            </select>
                            <textarea
                                placeholder="Mensaje (opcional)"
                                rows={3}
                                className="w-full resize-none"
                            ></textarea>
                            <button
                                type="submit"
                                className="btn-primary w-full justify-center"
                            >
                                {submitted ? (
                                    <>
                                        <i className="fa-solid fa-check"></i> ¡Mensaje Enviado!
                                    </>
                                ) : (
                                    <>Enviar Mensaje</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
