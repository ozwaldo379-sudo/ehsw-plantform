export const siteConfig = {
    name: "EHSW²",
    description:
        "Especialistas en Control de Plagas, Gestión Ambiental y Seguridad Industrial. Protegemos su empresa cumpliendo con COFEPRIS, STPS y Protección Civil.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://ehsw2.com",
    locale: "es_MX",
    contact: {
        phone: "+52 5616886384",
        email: "contacto@ehsw2.com",
        whatsapp: "https://wa.me/525616886384",
    },
    social: {
        facebook: "https://facebook.com/ehsw2",
        linkedin: "https://linkedin.com/company/ehsw2",
        instagram: "https://instagram.com/ehsw2",
    },
} as const;

export type SiteConfig = typeof siteConfig;
