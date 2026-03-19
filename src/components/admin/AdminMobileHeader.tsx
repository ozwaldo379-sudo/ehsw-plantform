"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminMobileHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Header Bar */}
            <div className="lg:hidden flex justify-between items-center p-4 bg-navy-deep/95 border-b border-white/10 sticky top-0 z-40 backdrop-blur-md">
                <div className="flex items-center gap-2">
                    <img src="/logo-ehsw2.png" alt="EHSW²" style={{ height: 32 }} />
                </div>
                <button
                    className="text-white text-xl bg-transparent border-none cursor-pointer"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <i className={`fa-solid ${mobileOpen ? "fa-xmark" : "fa-bars"}`}></i>
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileOpen && (
                <div className="lg:hidden bg-navy-deep/95 border-b border-white/10 absolute w-full z-30 shadow-2xl animate-fade-in-up backdrop-blur-md">
                    <nav className="p-4 space-y-2">
                        <Link
                            href="/admin"
                            onClick={() => setMobileOpen(false)}
                            className={`${pathname === "/admin" ? "bg-cyan/10 text-cyan" : "text-silver"} flex items-center gap-3 px-4 py-3 rounded-lg no-underline text-sm font-medium`}
                        >
                            <i className="fa-solid fa-house w-5 text-center"></i> Dashboard
                        </Link>
                        <Link
                            href="/admin/certificados"
                            onClick={() => setMobileOpen(false)}
                            className={`${pathname?.startsWith("/admin/certificados") && pathname !== "/admin/certificados/nuevo" ? "bg-cyan/10 text-cyan" : "text-silver"} flex items-center gap-3 px-4 py-3 rounded-lg no-underline text-sm font-medium hover:text-white transition-colors`}
                        >
                            <i className="fa-solid fa-certificate w-5 text-center"></i>{" "}
                            Certificados
                        </Link>
                        <Link
                            href="/admin/certificados/nuevo"
                            onClick={() => setMobileOpen(false)}
                            className={`${pathname === "/admin/certificados/nuevo" ? "bg-cyan/10 text-cyan" : "text-silver"} flex items-center gap-3 px-4 py-3 rounded-lg no-underline text-sm font-medium hover:text-white transition-colors`}
                        >
                            <i className="fa-solid fa-plus w-5 text-center"></i> Nuevo
                            Certificado
                        </Link>
                        <div className="border-t border-[var(--color-glass-border)] my-2"></div>
                        <Link
                            href="/"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-muted)] no-underline text-sm font-medium hover:text-white transition-colors"
                        >
                            <i className="fa-solid fa-globe w-5 text-center"></i> Ver Sitio
                        </Link>
                    </nav>
                </div>
            )}
        </>
    );
}
