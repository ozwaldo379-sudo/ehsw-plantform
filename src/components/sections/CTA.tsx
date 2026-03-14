"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, defaultViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { SectionProps, CTAConfig, CountdownTarget } from "@/types";

interface CTASectionProps extends SectionProps {
    headline: string;
    subheadline?: string;
    ctas?: CTAConfig[];
    countdown?: CountdownTarget;
}

function useCountdown(target: Date) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const tick = () => {
            const now = new Date().getTime();
            const diff = target.getTime() - now;
            if (diff <= 0) return;
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000),
            });
        };
        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [target]);

    return timeLeft;
}

export default function CTASection({
    headline,
    subheadline,
    ctas = [],
    countdown,
    className,
    id = "cta",
}: CTASectionProps) {
    const timeLeft = countdown ? useCountdown(countdown.date) : null;

    return (
        <section
            id={id}
            className={cn(
                "py-24 px-6 relative overflow-hidden",
                className
            )}
        >
            {/* Animated gradient background */}
            <div
                className="absolute inset-0 animate-gradient-shift"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(45,212,191,0.1) 25%, rgba(56,189,248,0.12) 50%, rgba(45,212,191,0.08) 75%, rgba(14,165,233,0.15) 100%)",
                    backgroundSize: "200% 200%",
                }}
            />

            {/* Glow orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[rgba(56,189,248,0.08)] rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[rgba(45,212,191,0.06)] rounded-full blur-[60px] pointer-events-none" />

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={defaultViewport}
                className="relative z-10 max-w-3xl mx-auto text-center"
            >
                <motion.h2
                    variants={fadeInUp}
                    className="text-[length:var(--text-4xl)] md:text-[length:var(--text-5xl)] font-bold text-white mb-6 leading-tight"
                >
                    {headline}
                </motion.h2>

                {subheadline && (
                    <motion.p
                        variants={fadeInUp}
                        className="text-[length:var(--text-lg)] text-[var(--color-text-muted)] mb-10 max-w-xl mx-auto"
                    >
                        {subheadline}
                    </motion.p>
                )}

                {/* Countdown Timer */}
                {timeLeft && (
                    <motion.div
                        variants={fadeInUp}
                        className="flex justify-center gap-4 mb-10"
                    >
                        {(
                            [
                                ["days", "Días"],
                                ["hours", "Hrs"],
                                ["minutes", "Min"],
                                ["seconds", "Seg"],
                            ] as const
                        ).map(([key, label]) => (
                            <div key={key} className="glass-card px-5 py-4 min-w-[72px]">
                                <div className="text-2xl md:text-3xl font-bold text-white tabular-nums">
                                    {String(timeLeft[key]).padStart(2, "0")}
                                </div>
                                <div className="text-xs text-[var(--color-text-subtle)] uppercase tracking-wider mt-1">
                                    {label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
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
                                    i === 0 ? "btn-primary text-lg px-8 py-4" : "btn-secondary",
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
