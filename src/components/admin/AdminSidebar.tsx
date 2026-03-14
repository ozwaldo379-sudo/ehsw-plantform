"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="admin-sidebar w-64 p-6 hidden lg:block shrink-0">
            <div className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <img src="/logo-ehsw.png" alt="EHSW²" style={{ height: 32 }} />
            </div>
            <nav className="space-y-1">
                <Link
                    href="/admin"
                    className={`${pathname === "/admin" ? "active" : ""
                        } flex items-center gap-3 px-4 py-3 rounded-lg text-white no-underline text-sm font-medium`}
                >
                    <i className="fa-solid fa-house w-5 text-center"></i> Dashboard
                </Link>
                <Link
                    href="/admin/certificados"
                    className={`${pathname?.startsWith("/admin/certificados") && pathname !== "/admin/certificados/nuevo" ? "active" : ""
                        } flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-muted)] no-underline text-sm font-medium hover:text-white transition-colors`}
                >
                    <i className="fa-solid fa-certificate w-5 text-center"></i>{" "}
                    Certificados
                </Link>
                <Link
                    href="/admin/certificados/nuevo"
                    className={`${pathname === "/admin/certificados/nuevo" ? "active" : ""
                        } flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-muted)] no-underline text-sm font-medium hover:text-white transition-colors`}
                >
                    <i className="fa-solid fa-plus w-5 text-center"></i> Nuevo
                    Certificado
                </Link>
                <div className="border-t border-[var(--color-glass-border)] my-4"></div>
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--color-text-muted)] no-underline text-sm font-medium hover:text-white transition-colors"
                >
                    <i className="fa-solid fa-globe w-5 text-center"></i> Ver Sitio
                </Link>
            </nav>
        </aside>
    );
}
