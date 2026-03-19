"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ShieldCheck, Search, CircleCheckBig, CircleAlert, QrCode } from "lucide-react";

export default function CertLookup() {
  const [folio, setFolio] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSearch() {
    const value = folio.trim().toUpperCase();
    if (!value) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/certificados/${encodeURIComponent(value)}`);
      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || "Certificado no encontrado");
      }
    } catch {
      setError("Error al consultar. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  function getStatusConfig(status: string) {
    const normalizedStatus = status?.toUpperCase();

    switch (normalizedStatus) {
      case "VALID":
        return {
          title: "Certificado valido",
          icon: CircleCheckBig,
          containerClass: "cert-valid",
          iconClass: "text-valid",
          stateLabel: "Vigente",
        };
      case "EXPIRED":
        return {
          title: "Certificado vencido",
          icon: CircleAlert,
          containerClass:
            "bg-gradient-to-r from-amber-500/8 to-navy-light border-l-4 border-amber-400 rounded-xl p-6 mt-6",
          iconClass: "text-amber-400",
          stateLabel: "Vencido",
        };
      default:
        return {
          title: "Certificado no encontrado",
          icon: CircleAlert,
          containerClass: "cert-invalid",
          iconClass: "text-invalid",
          stateLabel: "No encontrado",
        };
    }
  }

  const resultConfig = result ? getStatusConfig(result.status) : null;

  return (
    <section id="certificados" className="relative py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-b from-navy to-navy-deep border border-cyan/20 rounded-2xl shadow-[0_0_60px_rgba(0,188,212,0.06)] p-6 md:p-10">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7 text-cyan" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-white text-center">
              Validacion de Certificados
            </h2>
            <p className="text-muted text-center mt-2">
              Verifique la autenticidad de los servicios
            </p>
            <div className="inline-flex items-center gap-2 bg-valid/10 text-valid text-xs font-semibold px-3 py-1 rounded-full mt-4">
              <span className="w-2 h-2 bg-valid rounded-full animate-pulse"></span>
              Sistema en Linea
            </div>
          </div>

          <div className="border border-white/10 rounded-xl overflow-hidden focus-within:border-cyan/60 focus-within:ring-1 focus-within:ring-cyan/30 transition-all bg-navy-light/80">
            <div className="flex flex-col sm:flex-row">
              <input
                type="text"
                value={folio}
                onChange={(e) => setFolio(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ingrese el folio del certificado..."
                className="h-14 flex-1 bg-navy-light text-white px-5 placeholder:text-muted text-base outline-none border-none"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-cyan text-white px-6 h-14 hover:bg-cyan-dark transition-colors flex items-center justify-center gap-2 shrink-0"
              >
                <Search className="w-4 h-4" />
                <span className="font-semibold">
                  {loading ? "Buscando..." : "Buscar"}
                </span>
              </button>
            </div>
          </div>

          {result && resultConfig ? (
            <div className={`${resultConfig.containerClass} rounded-xl p-6 mt-6 animate-fade-in-up`}>
              <div className="flex items-start gap-4 mb-5">
                <resultConfig.icon className={`w-8 h-8 ${resultConfig.iconClass} shrink-0`} />
                <div>
                  <p className="text-white font-semibold text-lg">
                    {resultConfig.title}
                  </p>
                  <p className="text-muted text-sm">
                    La informacion coincide con nuestros registros operativos.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "Folio", value: result.folio },
                  { label: "Empresa", value: result.company },
                  { label: "Servicio", value: result.serviceType },
                  {
                    label: "Fecha de emision",
                    value: new Date(result.issueDate).toLocaleDateString("es-MX"),
                  },
                  {
                    label: "Vigencia",
                    value: new Date(result.expirationDate).toLocaleDateString("es-MX"),
                  },
                  { label: "Estado", value: resultConfig.stateLabel },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-navy-light/70 border border-white/5 p-4">
                    <p className="text-muted text-xs uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-white text-sm font-semibold mt-1 break-words">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push(`/certificado/${result.folio}`)}
                className="btn-primary w-full justify-center mt-5 text-sm"
              >
                Ver detalle completo
              </button>
            </div>
          ) : null}

          {error ? (
            <div className="bg-gradient-to-r from-invalid/5 to-navy-light border-l-4 border-invalid rounded-xl p-6 mt-6 animate-fade-in-up">
              <div className="flex items-start gap-4">
                <CircleAlert className="w-8 h-8 text-invalid shrink-0" />
                <div>
                  <p className="text-white font-semibold text-lg">
                    Certificado no encontrado
                  </p>
                  <p className="text-muted text-sm">
                    {error}. Verifique el folio e intente nuevamente.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center gap-2">
            <div className="bg-white rounded-xl p-3 shadow-lg">
              <Link href="/certificado/EHSW-2026-FUM-001" className="block">
                <Image
                  src="/qrcodes/EHSW-2026-FUM-001.png"
                  alt="QR Certificado Demo"
                  width={120}
                  height={120}
                  className="w-full max-w-[120px] h-auto block"
                />
              </Link>
            </div>
            <div className="flex items-center gap-2 text-muted text-xs text-center mt-2">
              <QrCode className="w-3.5 h-3.5" />
              Escanea para validar
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
