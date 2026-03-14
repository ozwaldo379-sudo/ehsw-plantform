"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, fadeIn } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { SectionProps, CTAConfig } from "@/types";

interface HeroCenteredProps extends SectionProps {
    badge?: string;
    headline: string;
    highlightedText?: string;
    subheadline: string;
    ctas?: CTAConfig[];
    backgroundVideo?: string;
    backgroundImage?: string;
}

export default function HeroCentered({
    badge,
    headline,
    highlightedText,
    subheadline,
    ctas = [],
    backgroundVideo,
    backgroundImage,
    className,
    id = "hero",
}: HeroCenteredProps) {
    return (
        <section
            id={id}
            className={cn(
                "relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden",
                className
            )}
        >
            {/* Background Video */}
            {backgroundVideo && (
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                >
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            )}

            {/* Background Image */}
            {backgroundImage && !backgroundVideo && (
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-15"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                />
            )}

            {/* Gradient Overlay */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 30% 20%, rgba(56, 189, 248, 0.12) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(45, 212, 191, 0.08) 0%, transparent 50%)",
                }}
            />

            {/* Grid Pattern */}
            <div className="hero-grid-bg" />

            {/* Content */}
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-4xl mx-auto text-center"
            >
                {badge && (
                    <motion.div variants={fadeIn} className="mb-6">
                        <span className="inline-block bg-primary-muted text-[var(--color-primary)] border border-[rgba(56,189,248,0.2)] px-4 py-2 rounded-full text-sm font-semibold tracking-wider uppercase">
                            {badge}
                        </span>
                    </motion.div>
                )}

                <motion.h1
                    variants={fadeInUp}
                    className="text-[length:var(--text-5xl)] md:text-[length:var(--text-6xl)] lg:text-[length:var(--text-7xl)] font-bold leading-[1.1] mb-6 text-white"
                >
                    {headline}{" "}
                    {highlightedText && (
                        <>
                            <br />
                            <span className="text-gradient">{highlightedText}</span>
                        </>
                    )}
                </motion.h1>

                <motion.p
                    variants={fadeInUp}
                    className="text-[length:var(--text-lg)] md:text-[length:var(--text-xl)] text-[var(--color-text-muted)] mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    {subheadline}
                </motion.p>

                {ctas.length > 0 && (
                    <motion.div
                        variants={fadeInUp}
                        className="flex gap-4 items-center justify-center flex-wrap"
                    >
                        {ctas.map((cta, i) => (
                            <a
                                key={i}
                                href={cta.href}
                                className={cn(
                                    i === 0 ? "btn-primary" : "btn-secondary",
                                    "text-base"
                                )}
                                {...(cta.external
                                    ? { target: "_blank", rel: "noopener noreferrer" }
                                    : {})}
                            >
                                {cta.icon}
                                {cta.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </section>
    );
}
