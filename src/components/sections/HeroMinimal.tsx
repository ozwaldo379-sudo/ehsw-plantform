"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { SectionProps, CTAConfig } from "@/types";

interface HeroMinimalProps extends SectionProps {
    headline: string;
    highlightedText?: string;
    subheadline?: string;
    ctas?: CTAConfig[];
}

export default function HeroMinimal({
    headline,
    highlightedText,
    subheadline,
    ctas = [],
    className,
    id = "hero",
}: HeroMinimalProps) {
    return (
        <section
            id={id}
            className={cn(
                "relative min-h-screen flex items-center justify-center px-6",
                className
            )}
        >
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="max-w-3xl mx-auto text-center"
            >
                <motion.h1
                    variants={fadeInUp}
                    className="font-[var(--font-display)] text-[length:var(--text-5xl)] md:text-[length:var(--text-6xl)] lg:text-[length:var(--text-7xl)] font-bold leading-[1.05] tracking-tight text-white mb-8"
                >
                    {headline}
                    {highlightedText && (
                        <>
                            <br />
                            <span className="text-gradient">{highlightedText}</span>
                        </>
                    )}
                </motion.h1>

                {subheadline && (
                    <motion.p
                        variants={fadeInUp}
                        className="text-[length:var(--text-xl)] text-[var(--color-text-muted)] max-w-xl mx-auto leading-relaxed mb-10"
                    >
                        {subheadline}
                    </motion.p>
                )}

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
