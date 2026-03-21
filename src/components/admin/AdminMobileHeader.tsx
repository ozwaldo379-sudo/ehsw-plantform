"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  ShieldCheck,
  Files,
  X,
} from "lucide-react";

export default function AdminMobileHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
    setMobileOpen(false);
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-navy-deep/95 p-4 backdrop-blur-md lg:hidden">
        <Link
          href="/admin"
          className="flex items-center gap-3 no-underline"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/logo-ehsw2-sinfondo.svg"
            alt="Logo EHSW²"
            width={112}
            height={36}
            className="h-8 w-auto"
            priority
          />
          <div>
            <p className="text-sm font-semibold text-white">Panel EHSW²</p>
            <p className="text-[11px] text-[var(--color-text-muted)]">
              Gestión certificada
            </p>
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-colors hover:border-cyan/30 hover:bg-cyan/10"
          onClick={() => setMobileOpen((current) => !current)}
          aria-label={mobileOpen ? "Cerrar navegación" : "Abrir navegación"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="absolute z-30 w-full border-b border-white/10 bg-navy-deep/95 shadow-2xl backdrop-blur-md lg:hidden">
          <nav className="space-y-2 p-4">
            {links.map((link) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium no-underline ${
                    link.active
                      ? "bg-cyan/10 text-cyan"
                      : "text-silver hover:text-white"
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
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-silver no-underline hover:text-white"
            >
              <Globe className="h-4.5 w-4.5" />
              <span>Ver Sitio</span>
            </Link>

            <div className="rounded-2xl border border-cyan/15 bg-[var(--color-navy-card)]/80 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                <ShieldCheck className="h-4.5 w-4.5 text-cyan" />
                <span>Sesión protegida</span>
              </div>
              <p className="mb-4 text-xs text-[var(--color-text-muted)]">
                Gestiona certificados con acceso validado.
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/30 hover:bg-cyan/10"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
