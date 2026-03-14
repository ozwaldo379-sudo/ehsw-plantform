/* ============================================
   Global TypeScript Types
   ============================================ */

/** Props shared by all section components */
export interface SectionProps {
    className?: string;
    id?: string;
}

/** CTA button configuration */
export interface CTAConfig {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "ghost";
    external?: boolean;
    icon?: React.ReactNode;
}

/** Testimonial data */
export interface Testimonial {
    name: string;
    role: string;
    company: string;
    content: string;
    avatar?: string;
    rating?: number;
}

/** Feature card data */
export interface Feature {
    title: string;
    description: string;
    icon: React.ReactNode;
}

/** Countdown target */
export interface CountdownTarget {
    date: Date;
    label?: string;
}
