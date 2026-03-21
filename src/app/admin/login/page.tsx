"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@ehsw2.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Credenciales inválidas");
        return;
      }

      const nextPath =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("next") || "/admin"
          : "/admin";
      router.push(nextPath);
      router.refresh();
    } catch {
      setError("No se pudo iniciar sesión. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-5 inline-flex items-center justify-center rounded-3xl border border-cyan/20 bg-cyan/8 p-5 shadow-[0_0_40px_rgba(0,188,212,0.08)]">
            <Image
              src="/logo-ehsw2-white-transparent.png"
              alt="Logo EHSW²"
              width={164}
              height={52}
              className="h-11 w-auto"
              priority
            />
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Acceso Administrativo</span>
          </div>
          <h1 className="font-heading text-3xl font-bold text-white">
            Panel de Administración EHSW²
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
            Inicie sesión para gestionar certificados, validar emisiones y
            generar nuevos folios operativos.
          </p>
        </div>

        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 block text-sm font-medium text-silver"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="contact-input pl-11"
                  placeholder="admin@ehsw2.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 block text-sm font-medium text-silver"
              >
                Contraseña
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="contact-input pl-11"
                  placeholder="Ingrese su contraseña"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            {error ? (
              <div className="flex items-start gap-3 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                <p>{error}</p>
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center"
            >
              <span>{loading ? "Ingresando..." : "Acceder al panel"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
