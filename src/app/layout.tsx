import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { inter, spaceGrotesk } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
    title: "EHSW² - Higiene y Seguridad Ambiental",
    description:
        "Especialistas en Control de Plagas, Gestión Ambiental y Seguridad Industrial. Protegemos su empresa cumpliendo con COFEPRIS, STPS y Protección Civil.",
    keywords: [
        "fumigación",
        "control de plagas",
        "extintores",
        "seguridad industrial",
        "CDMX",
        "COFEPRIS",
        "certificados",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="es"
            className={`${spaceGrotesk.variable} ${inter.variable}`}
        >
            <head />
            <body className="antialiased">
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
