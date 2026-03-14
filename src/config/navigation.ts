export interface NavItem {
    label: string;
    href: string;
    external?: boolean;
}

export const mainNavigation: NavItem[] = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicios", href: "#servicios" },
    { label: "Normatividad", href: "#normatividad" },
    { label: "Cobertura", href: "#cobertura" },
    { label: "Contacto", href: "#contacto" },
];

export const footerNavigation = {
    services: [
        { label: "Control de Plagas", href: "#servicios" },
        { label: "Extintores", href: "#servicios" },
        { label: "Seguridad Industrial", href: "#servicios" },
        { label: "Gestión Ambiental", href: "#servicios" },
        { label: "Protección Civil", href: "#servicios" },
    ],
    company: [
        { label: "Sobre Nosotros", href: "#inicio" },
        { label: "Normatividad", href: "#normatividad" },
        { label: "Cobertura", href: "#cobertura" },
        { label: "Contacto", href: "#contacto" },
    ],
    legal: [
        { label: "Aviso de Privacidad", href: "/privacidad" },
        { label: "Términos y Condiciones", href: "/terminos" },
    ],
} as const;
