"use client";

import { useState } from "react";

export default function ContactSection() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const form = e.currentTarget;
        const data = {
            name: (form.elements.namedItem("name") as HTMLInputElement).value,
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            interest: (form.elements.namedItem("interest") as HTMLSelectElement).value,
            message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) throw new Error("Error al enviar");

            setSubmitted(true);
            form.reset();
            setTimeout(() => setSubmitted(false), 5000);
        } catch {
            setError("Hubo un problema al enviar. Contáctanos directamente por WhatsApp.");
        } finally {
            setLoading(false);
        }
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
                            <a
                                href="tel:+525563792273"
                                className="flex items-center gap-4 text-lg hover:text-[var(--color-primary)] transition-colors no-underline text-white"
                            >
                                <div className="w-12 h-12 bg-[rgba(255,255,255,0.1)] text-[var(--color-primary)] rounded-full flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <span>(55) 6379-2273</span>
                            </a>
                            <a
                                href="mailto:contacto@ehsw2.com"
                                className="flex items-center gap-4 text-lg hover:text-[var(--color-primary)] transition-colors no-underline text-white"
                            >
                                <div className="w-12 h-12 bg-[rgba(255,255,255,0.1)] text-[var(--color-primary)] rounded-full flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <span>contacto@ehsw2.com</span>
                            </a>
                            <a
                                href="https://wa.me/522213050039?text=Hola,%20me%20interesa%20conocer%20sus%20servicios%20EHS"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 text-lg hover:text-[var(--color-primary)] transition-colors cursor-pointer no-underline text-white"
                            >
                                <div className="w-12 h-12 bg-[rgba(255,255,255,0.1)] text-[var(--color-primary)] rounded-full flex items-center justify-center shrink-0">
                                    <i className="fa-brands fa-whatsapp"></i>
                                </div>
                                <span>WhatsApp Directo</span>
                            </a>
                        </div>

                        {/* Form */}
                        <form
                            className="contact-form flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre completo"
                                required
                                className="w-full"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo corporativo"
                                required
                                className="w-full"
                            />
                            <select name="interest" className="w-full" required>
                                <option value="">Interés principal...</option>
                                <option>Control de Plagas</option>
                                <option>Extintores</option>
                                <option>Seguridad Industrial</option>
                                <option>Gestión Ambiental</option>
                                <option>Protección Civil</option>
                                <option>Desinfección</option>
                                <option>Otro</option>
                            </select>
                            <textarea
                                name="message"
                                placeholder="Mensaje (opcional)"
                                rows={3}
                                className="w-full resize-none"
                            ></textarea>

                            {error && (
                                <p className="text-red-400 text-sm flex items-center gap-2">
                                    <i className="fa-solid fa-circle-exclamation"></i>
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading || submitted}
                                className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {submitted ? (
                                    <>
                                        <i className="fa-solid fa-check"></i> ¡Mensaje Enviado!
                                    </>
                                ) : loading ? (
                                    <>
                                        <i className="fa-solid fa-spinner fa-spin"></i> Enviando…
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
