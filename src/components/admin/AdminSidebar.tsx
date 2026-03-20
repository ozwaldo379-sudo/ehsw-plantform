"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Globe,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  ShieldCheck,
  Files,
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: pathname === "/admin",
    },
    {
      href: "/admin/certificados",
      label: "Certificados",
      icon: Files,
      active:
        pathname?.startsWith("/admin/certificados") &&
        pathname !== "/admin/certificados/nuevo",
    },
    {
      href: "/admin/certificados/nuevo",
      label: "Nuevo Certificado",
      icon: PlusCircle,
      active: pathname === "/admin/certificados/nuevo",
    },
  ];

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="admin-sidebar hidden min-h-screen w-72 shrink-0 flex-col p-6 lg:flex">
      <div className="mb-8 rounded-2xl border border-white/8 bg-white/4 p-5">
        <Link href="/admin" className="flex items-center gap-3 no-underline">
          <Image
            src="/logo-ehsw2.png"
            alt="Logo EHSW²"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <div>
            <p className="text-sm font-semibold text-white">Panel EHSW²</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              Administración certificada
            </p>
          </div>
        </Link>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium no-underline transition-all duration-200 ${
                link.active
                  ? "active text-cyan"
                  : "text-[var(--color-text-muted)] hover:text-white"
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{link.label}</span>
            </Link>
          );
        })}

        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[var(--color-text-muted)] no-underline transition-all duration-200 hover:bg-cyan/8 hover:text-white"
        >
          <Globe className="h-4.5 w-4.5" />
          <span>Ver Sitio</span>
        </Link>
      </nav>

      <div className="mt-auto rounded-2xl border border-cyan/15 bg-[var(--color-navy-card)]/80 p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
          <ShieldCheck className="h-4.5 w-4.5 text-cyan" />
          <span>Sesión protegida</span>
        </div>
        <p className="mb-4 text-xs leading-relaxed text-[var(--color-text-muted)]">
          El panel administrativo requiere una sesión válida para gestionar
          certificados y validaciones.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-cyan/30 hover:bg-cyan/10"
        >
          <LogOut className="h-4 w-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
