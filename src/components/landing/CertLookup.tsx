"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        const s = status?.toUpperCase();
        switch (s) {
            case "VALID":
                return {
                    label: "CERTIFICADO VÁLIDO",
                    icon: "fa-check-circle",
                    className: "cert-valid",
                };
            case "EXPIRED":
                return {
                    label: "CERTIFICADO VENCIDO",
                    icon: "fa-triangle-exclamation",
                    className: "cert-expired",
                };
            default:
                return {
                    label: "NO ENCONTRADO",
                    icon: "fa-xmark-circle",
                    className: "cert-invalid",
                };
        }
    }

    return (
        <div id="certificados" className="glass-card p-8 relative overflow-hidden">
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 gradient-main"></div>

            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold flex gap-3 items-center text-white">
                    <i className="fa-solid fa-shield-halved"></i> Validación de
                    Certificados
                </h3>
                <span className="text-xs text-[var(--color-accent)] bg-[rgba(45,212,191,0.1)] px-2 py-1 rounded-md font-semibold animate-pulse-glow">
                    Sistema Online
                </span>
            </div>

            <p className="text-sm text-[var(--color-text-muted)] mb-6 font-[var(--font-body)]">
                Garantice la autenticidad de sus servicios. Ingrese el folio o escanee
                el código QR de su constancia.
            </p>

            {/* Search Input */}
            <div className="flex gap-3 bg-[rgba(15,23,42,0.6)] p-2 rounded-xl border border-[var(--color-glass-border)]">
                <input
                    type="text"
                    value={folio}
                    onChange={(e) => setFolio(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ej: EHSW-2026-FUM-001"
                    className="bg-transparent border-none text-white px-3 py-2 text-base w-full outline-none"
                />
                <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="bg-[var(--color-primary)] text-[var(--color-bg-dark)] w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer border-none transition-all hover:brightness-110 shrink-0"
                >
                    <i
                        className={`fa-solid ${loading ? "fa-circle-notch fa-spin" : "fa-arrow-right"
                            }`}
                    ></i>
                </button>
                <button className="bg-[var(--color-bg-card)] border border-[var(--color-glass-border)] text-white w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:bg-[rgba(255,255,255,0.1)] shrink-0">
                    <i className="fa-solid fa-qrcode"></i>
                </button>
            </div>

            {/* Results */}
            {result && (
                <div className="mt-4 p-4 bg-[rgba(15,23,42,0.5)] rounded-lg animate-fade-in-up">
                    <div
                        className={`${getStatusConfig(result.status).className
                            } px-4 py-2 rounded-lg font-bold flex items-center gap-2 mb-3`}
                    >
                        <i
                            className={`fa-solid ${getStatusConfig(result.status).icon}`}
                        ></i>
                        {getStatusConfig(result.status).label}
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <strong className="text-[var(--color-text-muted)]">Folio:</strong>{" "}
                            <span className="text-white font-mono">{result.folio}</span>
                        </div>
                        <div className="flex justify-between">
                            <strong className="text-[var(--color-text-muted)]"> Empresa:</strong>{" "}
                            <span className="text-white text-right">{result.company}</span>
                        </div>
                        <div className="flex justify-between">
                            <strong className="text-[var(--color-text-muted)]"> Servicio:</strong>{" "}
                            <span className="text-white text-right">{result.serviceType}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                            <strong className="text-[var(--color-text-muted)] whitespace-nowrap">Producto:</strong>{" "}
                            <span className="text-white text-right break-words">{result.chemicalUsed}</span>
                        </div>
                        <div className="flex justify-between">
                            <strong className="text-[var(--color-text-muted)]"> Vigencia:</strong>{" "}
                            <span className="text-[var(--color-accent)]">
                                {new Date(result.expirationDate).toLocaleDateString("es-MX")}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => router.push(`/certificado/${result.folio}`)}
                        className="btn-primary w-full justify-center mt-4 text-sm"
                    >
                        <i className="fa-solid fa-expand"></i> Ver Detalle Completo
                    </button>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-4 bg-[rgba(15,23,42,0.5)] rounded-lg animate-fade-in-up border border-red-500/20">
                    <div className="text-red-400 px-2 py-1.5 rounded-lg font-bold flex items-center gap-2 mb-1">
                        <i className="fa-solid fa-xmark-circle"></i> NO ENCONTRADO
                    </div>
                    <p className="text-[var(--color-text-muted)] text-xs ml-8">
                        {error}. Verifique el folio e intente nuevamente.
                    </p>
                </div>
            )}

            {/* Demo QR */}
            <div className="mt-6 pt-6 border-t border-[var(--color-glass-border)] flex flex-col items-center gap-2">
                <p className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-[0.2em] mb-2">
                    Ejemplo de Validación
                </p>
                <Link href="/certificado/EHSW-2026-FUM-001" className="block p-2 bg-white rounded-lg hover:scale-105 transition-transform duration-300 shadow-glow-accent">
                    <img
                        src="/qrcodes/EHSW-2026-FUM-001.png"
                        alt="QR Certificado Demo"
                        className="w-24 h-24 block"
                    />
                </Link>
                <p className="text-[10px] text-[var(--color-text-muted)] font-mono mt-1">
                    EHSW-2026-FUM-001
                </p>
            </div>

            <div className="mt-4 text-xs text-[var(--color-text-muted)] flex items-center gap-2">
                <i className="fa-solid fa-lock"></i> Datos encriptados y verificados en
                tiempo real.
            </div>
        </div>
    );
}
