"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeInUp, defaultViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { SectionProps, Testimonial } from "@/types";

interface TestimonialsProps extends SectionProps {
    badge?: string;
    title: string;
    subtitle?: string;
    testimonials: Testimonial[];
    autoplay?: boolean;
    autoplayInterval?: number;
}

export default function Testimonials({
    badge,
    title,
    subtitle,
    testimonials,
    autoplay = true,
    autoplayInterval = 4000,
    className,
    id = "testimonials",
}: TestimonialsProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
        slidesToScroll: 1,
    });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    // Autoplay
    useEffect(() => {
        if (!emblaApi || !autoplay) return;
        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, autoplayInterval);
        return () => clearInterval(interval);
    }, [emblaApi, autoplay, autoplayInterval]);

    return (
        <section id={id} className={cn("py-24 px-6 overflow-hidden", className)}>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={defaultViewport}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    {badge && (
                        <span className="text-[var(--color-primary)] font-bold uppercase tracking-widest text-sm block mb-3">
                            {badge}
                        </span>
                    )}
                    <h2 className="text-[length:var(--text-4xl)] font-bold text-white mb-4">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-[var(--color-text-muted)] text-[length:var(--text-lg)] max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </motion.div>

                {/* Carousel */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                >
                    <div ref={emblaRef} className="overflow-hidden">
                        <div className="flex gap-6">
                            {testimonials.map((t, i) => (
                                <div
                                    key={i}
                                    className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
                                >
                                    <div className="glass-card p-8 h-full flex flex-col">
                                        {/* Stars */}
                                        {t.rating && (
                                            <div className="flex gap-1 mb-4">
                                                {Array.from({ length: 5 }).map((_, s) => (
                                                    <Star
                                                        key={s}
                                                        size={16}
                                                        className={cn(
                                                            s < t.rating!
                                                                ? "text-yellow-400 fill-yellow-400"
                                                                : "text-[var(--color-text-subtle)]"
                                                        )}
                                                    />
                                                ))}
                                            </div>
                                        )}

                                        {/* Content */}
                                        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6 flex-1">
                                            &ldquo;{t.content}&rdquo;
                                        </p>

                                        {/* Author */}
                                        <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-glass-border)]">
                                            {t.avatar ? (
                                                <img
                                                    src={t.avatar}
                                                    alt={t.name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-[rgba(56,189,248,0.1)] flex items-center justify-center text-[var(--color-primary)] font-bold text-sm">
                                                    {t.name.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-white font-semibold text-sm">
                                                    {t.name}
                                                </p>
                                                <p className="text-[var(--color-text-subtle)] text-xs">
                                                    {t.role}, {t.company}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => emblaApi?.scrollTo(i)}
                                className={cn(
                                    "w-2 h-2 rounded-full transition-all duration-300",
                                    i === selectedIndex
                                        ? "bg-[var(--color-primary)] w-6"
                                        : "bg-[var(--color-text-subtle)] hover:bg-[var(--color-text-muted)]"
                                )}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
