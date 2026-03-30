"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  AlertTriangle,
  CircleAlert,
  CircleCheckBig,
  LockKeyhole,
  QrCode,
  Search,
  ShieldCheck,
} from "lucide-react";
import type { SerializedCertificate } from "@/lib/certificates";

export default function CertLookup() {
  const [folio, setFolio] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SerializedCertificate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSearch() {
    const value = folio.trim().toUpperCase();
    if (!value) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`/api/certificados/${encodeURIComponent(value)}`);
      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            "El folio ingresado no existe en nuestro sistema. Verifique el número e intente nuevamente."
        );
        return;
      }

      setResult(data);
    } catch {
      setError("No fue posible consultar el certificado en este momento.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  const isExpired = result?.status === "EXPIRED";
  const isValid = result && result.status !== "EXPIRED";

  return (
    <div className="relative">
      <div className="mb-6 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan/20 bg-cyan/10">
            <ShieldCheck className="h-6 w-6 text-cyan" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-white">
              Validación de Certificados
            </h2>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-valid/10 px-3 py-1 text-xs font-semibold text-valid">
              <span className="h-2 w-2 rounded-full bg-valid animate-pulse" />
              Sistema Online
            </div>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-silver">
          Garantice la autenticidad de sus servicios. Ingrese el folio o escanee
          el código QR.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-navy-deep/80 p-2 transition-all duration-300 ease-out focus-within:border-cyan focus-within:ring-2 focus-within:ring-cyan/30">
        <div className="flex flex-col gap-2 md:flex-row">
          <input
            type="text"
            value={folio}
            onChange={(event) => setFolio(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ej: EHSW-2026-FUM-001"
            className="h-12 flex-1 rounded-lg border border-white/10 bg-navy-deep px-4 text-sm text-white outline-none transition-all duration-300 ease-out placeholder:text-(--color-text-muted) focus:border-cyan"
          />

          <div className="flex gap-2 md:w-auto">
            <button
              type="button"
              onClick={handleSearch}
              disabled={loading}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-cyan px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:bg-cyan-dark md:flex-none"
            >
              <Search className="h-4 w-4" />
              <span>{loading ? "Buscando..." : "Buscar"}</span>
            </button>
            <Link
              href="/certificado/EHSW-2026-FUM-001"
              aria-label="Abrir ejemplo público"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/20 px-4 text-sm font-semibold text-white transition-all duration-300 ease-out hover:border-white hover:bg-white/5"
            >
              <QrCode className="h-5 w-5" />
              <span>QR</span>
            </Link>
          </div>
        </div>
      </div>

      {isValid && result ? (
        <div className="cert-valid mt-6 rounded-xl p-6 animate-fade-in-up">
          <div className="mb-5 flex items-start gap-4">
            <CircleCheckBig className="h-8 w-8 shrink-0 text-valid" />
            <div>
              <p className="text-lg font-semibold text-white">
                ✅ CERTIFICADO VÁLIDO
              </p>
              <p className="text-sm text-silver">
                La información coincide con nuestros registros operativos.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Folio", value: result.folio },
              { label: "Empresa", value: result.company },
              { label: "Servicio", value: result.serviceType },
              {
                label: "Producto",
                value: result.chemicalUsed || "No especificado",
              },
              {
                label: "Vigencia",
                value: new Date(result.expirationDate).toLocaleDateString("es-MX"),
              },
              { label: "Estado", value: result.statusLabel },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/5 bg-navy-card/80 p-4"
              >
                <p className="text-xs uppercase tracking-wider text-(--color-text-muted)">
                  {item.label}
                </p>
                <p className="mt-1 wrap-break-word text-sm font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => router.push(`/certificado/${result.folio}`)}
            className="btn-primary mt-5 w-full justify-center text-sm"
          >
            Ver detalle completo
          </button>
        </div>
      ) : null}

      {isExpired && result ? (
        <div className="mt-6 rounded-xl border-l-4 border-red-500 bg-[linear-gradient(90deg,rgba(239,68,68,0.08),rgba(26,47,69,0.95))] p-6 animate-fade-in-up">
          <div className="mb-5 flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 shrink-0 text-red-300" />
            <div>
              <p className="text-lg font-semibold text-white">
                ⚠️ CERTIFICADO VENCIDO
              </p>
              <p className="text-sm text-silver">
                El certificado existe, pero su vigencia ya expiró.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Folio", value: result.folio },
              { label: "Empresa", value: result.company },
              { label: "Servicio", value: result.serviceType },
              {
                label: "Producto",
                value: result.chemicalUsed || "No especificado",
              },
              {
                label: "Vigencia",
                value: new Date(result.expirationDate).toLocaleDateString("es-MX"),
              },
              { label: "Estado", value: result.statusLabel },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/5 bg-navy-card/80 p-4"
              >
                <p className="text-xs uppercase tracking-wider text-(--color-text-muted)">
                  {item.label}
                </p>
                <p
                  className={`mt-1 wrap-break-word text-sm font-semibold ${
                    item.label === "Vigencia" ? "text-red-200" : "text-white"
                  }`}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => router.push(`/certificado/${result.folio}`)}
            className="btn-primary mt-5 w-full justify-center text-sm"
          >
            Ver detalle completo
          </button>
        </div>
      ) : null}

      {error ? (
        <div className="cert-invalid mt-6 rounded-xl p-6 animate-fade-in-up">
          <div className="flex items-start gap-4">
            <CircleAlert className="h-8 w-8 shrink-0 text-silver" />
            <div>
              <p className="text-lg font-semibold text-white">
                ❌ CERTIFICADO NO ENCONTRADO
              </p>
              <p className="text-sm text-silver">
                {error}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-6 rounded-xl border border-white/10 bg-navy-deep/65 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-white p-3 shadow-lg">
              <Link href="/certificado/EHSW-2026-FUM-001" className="block">
                <Image
                  src="/qrcodes/EHSW-2026-FUM-001.png"
                  alt="Código QR de ejemplo para validar un certificado"
                  width={96}
                  height={96}
                  unoptimized
                  className="block h-auto w-full max-w-24"
                />
              </Link>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-cyan">
                Folio de ejemplo
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                EHSW-2026-FUM-001
              </p>
              <p className="mt-1 text-xs text-silver">Escanee para validar</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-silver/70">
            <LockKeyhole className="h-3.5 w-3.5 text-cyan" />
            Datos encriptados y verificados en tiempo real.
          </div>
        </div>
      </div>
    </div>
  );
}
