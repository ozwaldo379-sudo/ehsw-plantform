"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeInUp, defaultViewport } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { SectionProps, Feature } from "@/types";

interface FeaturesProps extends SectionProps {
    badge?: string;
    title: string;
    subtitle?: string;
    features: Feature[];
    columns?: 2 | 3 | 4;
}

export default function Features({
    badge,
    title,
    subtitle,
    features,
    columns = 3,
    className,
    id = "features",
}: FeaturesProps) {
    const gridCols = {
        2: "sm:grid-cols-2",
        3: "sm:grid-cols-2 lg:grid-cols-3",
        4: "sm:grid-cols-2 lg:grid-cols-4",
    };

    return (
        <section id={id} className={cn("py-24 px-6", className)}>
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

                {/* Feature Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                    className={cn("grid grid-cols-1 gap-8", gridCols[columns])}
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={fadeInUp}
                            className="group glass-card p-8 hover:border-[rgba(56,189,248,0.2)] transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="w-14 h-14 bg-[rgba(56,189,248,0.1)] text-[var(--color-primary)] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[rgba(56,189,248,0.15)] transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
