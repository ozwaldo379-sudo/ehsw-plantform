"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Facebook, Linkedin, Instagram } from "lucide-react";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { footerNavigation } from "@/config/navigation";
import type { SectionProps } from "@/types";
import { useState } from "react";

const newsletterSchema = z.object({
    email: z.string().email("Ingresa un email válido"),
});

type NewsletterForm = z.infer<typeof newsletterSchema>;

interface FooterMainProps extends SectionProps {
    showNewsletter?: boolean;
}

export default function FooterMain({
    showNewsletter = true,
    className,
}: FooterMainProps) {
    const [submitted, setSubmitted] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<NewsletterForm>({
        resolver: zodResolver(newsletterSchema),
    });

    const onSubmit = (data: NewsletterForm) => {
        console.log("Newsletter signup:", data);
        setSubmitted(true);
        reset();
        setTimeout(() => setSubmitted(false), 3000);
    };

    const socialIcons = [
        { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
        { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
        { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
    ];

    return (
        <footer
            className={cn(
                "border-t border-[var(--color-glass-border)] bg-[var(--color-bg-dark)]",
                className
            )}
        >
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                className="max-w-7xl mx-auto px-6 pt-16 pb-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <motion.div variants={fadeInUp} className="lg:col-span-1">
                        <h4 className="text-xl font-bold text-white flex items-center gap-1 mb-3">
                            {siteConfig.name.replace("²", "")}
                            <span className="text-[var(--color-primary)]">²</span>
                        </h4>
                        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">
                            {siteConfig.description.slice(0, 120)}...
                        </p>
                        <div className="flex gap-4">
                            {socialIcons.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                                    aria-label={s.label}
                                >
                                    <s.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Services Column */}
                    <motion.div variants={fadeInUp}>
                        <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            Servicios
                        </h5>
                        <ul className="space-y-3">
                            {footerNavigation.services.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-[var(--color-text-muted)] text-sm hover:text-white transition-colors no-underline"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Company Column */}
                    <motion.div variants={fadeInUp}>
                        <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                            Empresa
                        </h5>
                        <ul className="space-y-3">
                            {footerNavigation.company.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-[var(--color-text-muted)] text-sm hover:text-white transition-colors no-underline"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Newsletter Column */}
                    <motion.div variants={fadeInUp}>
                        {showNewsletter && (
                            <>
                                <h5 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                                    Boletín
                                </h5>
                                <p className="text-[var(--color-text-muted)] text-sm mb-4">
                                    Recibe noticias sobre normatividad y seguridad industrial.
                                </p>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="flex gap-2"
                                >
                                    <div className="flex-1 relative">
                                        <input
                                            {...register("email")}
                                            type="email"
                                            placeholder="tu@email.com"
                                            className="w-full px-4 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-glass-border)] rounded-lg text-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                                        />
                                        {errors.email && (
                                            <p className="text-[var(--color-danger)] text-xs mt-1 absolute">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn-primary px-3 py-2.5 shrink-0"
                                        aria-label="Suscribirse"
                                    >
                                        <Send size={16} />
                                    </button>
                                </form>
                                {submitted && (
                                    <p className="text-[var(--color-success)] text-xs mt-2">
                                        ¡Gracias por suscribirte!
                                    </p>
                                )}
                            </>
                        )}
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-[rgba(255,255,255,0.05)]">
                    <p className="text-[rgba(255,255,255,0.2)] text-xs">
                        © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
                        reservados.
                    </p>
                    <div className="flex gap-6">
                        {footerNavigation.legal.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-[rgba(255,255,255,0.2)] text-xs hover:text-[var(--color-text-muted)] transition-colors no-underline"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>
        </footer>
    );
}
