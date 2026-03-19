"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`glass-nav fixed w-full z-50 transition-all duration-300 ${scrolled ? "py-2 shadow-lg" : "py-0"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
                <Link href="/" className="flex gap-2 items-center text-2xl font-bold text-white no-underline tracking-tight">
                    <img src="/logo-ehsw.png" alt="EHSW²" className="h-[40px] md:h-[52px] w-auto object-contain" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:block">
                    <ul className="flex gap-8 list-none">
                        {[
                            { href: "#inicio", label: "Inicio" },
                            { href: "#quienes-somos", label: "Quiénes Somos" },
                            { href: "#servicios", label: "Servicios" },
                            { href: "#normatividad", label: "Normatividad" },
                            { href: "#cobertura", label: "Cobertura" },
                            { href: "#contacto", label: "Contacto" },
                        ].map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className="text-[var(--color-text-muted)] no-underline font-medium text-sm hover:text-white transition-colors"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex gap-3 items-center">
                    <Link href="/admin/login" className="btn-secondary text-sm">
                        <i className="fa-solid fa-user-lock"></i> Portal Admin
                    </Link>
                    <a href="https://wa.me/522213050039?text=Hola,%20me%20interesa%20conocer%20sus%20servicios%20EHS" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
                        <i className="fa-brands fa-whatsapp"></i> Cotizar Ahora
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white text-xl bg-transparent border-none cursor-pointer"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"}`}></i>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden px-6 pb-6 animate-fade-in-up">
                    <nav>
                        <ul className="flex flex-col gap-4 list-none">
                            {[
                                { href: "#inicio", label: "Inicio" },
                                { href: "#quienes-somos", label: "Quiénes Somos" },
                                { href: "#servicios", label: "Servicios" },
                                { href: "#normatividad", label: "Normatividad" },
                                { href: "#cobertura", label: "Cobertura" },
                                { href: "#contacto", label: "Contacto" }
                            ].map(
                                (item) => (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            className="text-[var(--color-text-muted)] no-underline font-medium text-base hover:text-white transition-colors"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                )
                            )}
                        </ul>
                    </nav>
                    <div className="flex flex-col gap-3 mt-4">
                        <Link href="/admin/login" className="btn-secondary text-sm justify-center">
                            <i className="fa-solid fa-user-lock"></i> Portal Admin
                        </Link>
                        <a href="https://wa.me/522213050039?text=Hola,%20me%20interesa%20conocer%20sus%20servicios%20EHS" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm justify-center">
                            <i className="fa-brands fa-whatsapp"></i> Cotizar Ahora
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}
