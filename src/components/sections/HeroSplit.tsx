"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { SectionProps, CTAConfig } from "@/types";

interface HeroSplitProps extends SectionProps {
    badge?: string;
    headline: string;
    highlightedText?: string;
    subheadline: string;
    ctas?: CTAConfig[];
    imageSrc: string;
    imageAlt: string;
    reversed?: boolean;
}

export default function HeroSplit({
    badge,
    headline,
    highlightedText,
    subheadline,
    ctas = [],
    imageSrc,
    imageAlt,
    reversed = false,
    className,
    id = "hero",
}: HeroSplitProps) {
    return (
        <section
            id={id}
            className={cn(
                "relative min-h-screen flex items-center px-6 pt-32 pb-20 overflow-hidden",
                className
            )}
        >
            {/* Ambient gradients */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(45, 212, 191, 0.05) 0%, transparent 40%)",
                }}
            />

            <div className="hero-grid-bg" />

            <div
                className={cn(
                    "max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10",
                    reversed && "lg:grid-flow-col-dense"
                )}
            >
                {/* Text Side */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className={cn(
                        "lg:text-left text-center",
                        reversed && "lg:col-start-2"
                    )}
                >
                    {badge && (
                        <motion.div variants={fadeInUp} className="mb-6">
                            <span className="inline-block bg-[rgba(56,189,248,0.1)] text-[var(--color-primary)] border border-[rgba(56,189,248,0.2)] px-4 py-2 rounded-full text-sm font-semibold tracking-wider uppercase">
                                {badge}
                            </span>
                        </motion.div>
                    )}

                    <motion.h1
                        variants={fadeInUp}
                        className="text-[length:var(--text-4xl)] md:text-[length:var(--text-5xl)] lg:text-[length:var(--text-6xl)] font-bold leading-[1.1] mb-6 text-white"
                    >
                        {headline}{" "}
                        {highlightedText && (
                            <span className="text-gradient">{highlightedText}</span>
                        )}
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-[length:var(--text-lg)] text-[var(--color-text-muted)] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                    >
                        {subheadline}
                    </motion.p>

                    {ctas.length > 0 && (
                        <motion.div
                            variants={fadeInUp}
                            className="flex gap-4 items-center flex-wrap justify-center lg:justify-start"
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

                {/* Image Side */}
                <motion.div
                    variants={reversed ? slideInLeft : slideInRight}
                    initial="hidden"
                    animate="visible"
                    className={cn(
                        "relative w-full aspect-[4/3] lg:aspect-square",
                        reversed && "lg:col-start-1"
                    )}
                >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[var(--color-glass-border)]">
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        {/* Gradient overlay on image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)] via-transparent to-transparent opacity-40" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
