import { Metadata } from "next";
import Link from "next/link";

interface CertificateData {
    folio: string;
    clientName: string;
    company: string;
    serviceType: string;
    chemicalUsed: string;
    issueDate: string;
    expirationDate: string;
    status: string;
    qrCodeUrl: string;
}

async function getCertificate(folio: string): Promise<CertificateData | null> {
    try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const res = await fetch(`${siteUrl}/api/certificados/${encodeURIComponent(folio)}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ folio: string }>;
}): Promise<Metadata> {
    const { folio } = await params;
    return {
        title: `Verificación Folio ${folio} — EHSW²`,
        description: `Sistema de validación oficial para el certificado ${folio} de EHSW².`,
    };
}

export default async function CertificadoPage({
    params,
}: {
    params: Promise<{ folio: string }>;
}) {
    const { folio } = await params;
    const data = await getCertificate(folio);
    const now = new Date();
    const isValid = data ? new Date(data.expirationDate) > now : false;
    const isExpired = data ? new Date(data.expirationDate) <= now : false;

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20"
            style={{
                backgroundImage:
                    "radial-gradient(circle at 10% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(45, 212, 191, 0.05) 0%, transparent 40%)",
            }}
        >
            <div className="max-w-lg w-full">
                {/* Logo Header */}
                <div className="text-center mb-8">
                    <Link
                        href="/"
                        className="text-3xl font-bold text-white no-underline inline-flex items-center gap-2"
                    >
                        <i className="fa-solid fa-layer-group text-[var(--color-accent)]"></i>
                        EHSW<span className="text-[var(--color-primary)]">²</span>
                    </Link>
                    <p className="text-[var(--color-text-muted)] text-sm mt-2">
                        Sistema de Verificación Digital
                    </p>
                </div>

                {data ? (
                    /* Certificate Found */
                    <div className="glass-card overflow-hidden border border-white/10 shadow-2xl">
                        {/* Status Banner */}
                        <div
                            className={`p-8 text-center ${isValid
                                ? "bg-gradient-to-r from-emerald-600/20 to-emerald-500/10 border-b border-emerald-500/30"
                                : "bg-gradient-to-r from-orange-600/20 to-orange-500/10 border-b border-orange-500/30"
                                }`}
                        >
                            <i
                                className={`fa-solid text-6xl mb-4 block ${isValid
                                    ? "fa-circle-check text-emerald-400"
                                    : "fa-triangle-exclamation text-orange-400"
                                    }`}
                            ></i>
                            <h1
                                className={`text-2xl font-bold tracking-widest ${isValid
                                    ? "text-emerald-400"
                                    : "text-orange-400"
                                    }`}
                            >
                                {isValid ? "CERTIFICADO VÁLIDO" : "CERTIFICADO EXPIRADO"}
                            </h1>
                            <p className="text-white/70 text-sm mt-2 font-medium">
                                {isValid
                                    ? "Este documento es auténtico y se encuentra vigente."
                                    : "Este certificado es auténtico pero ha cumplido su periodo de vigencia."}
                            </p>
                        </div>

                        {/* Certificate Details */}
                        <div className="p-8 space-y-4">
                            {[
                                {
                                    icon: "fa-hashtag",
                                    label: "Folio de Certificado",
                                    value: data.folio,
                                    mono: true
                                },
                                {
                                    icon: "fa-user",
                                    label: "Nombre del Cliente / Responsable",
                                    value: data.clientName,
                                },
                                {
                                    icon: "fa-building",
                                    label: "Empresa / Establecimiento",
                                    value: data.company,
                                },
                                {
                                    icon: "fa-vial",
                                    label: "Servicio Realizado",
                                    value: data.serviceType,
                                },
                                {
                                    icon: "fa-flask",
                                    label: "Producto Químico Utilizado",
                                    value: data.chemicalUsed,
                                },
                                {
                                    icon: "fa-calendar-check",
                                    label: "Fecha de Emisión",
                                    value: new Date(data.issueDate).toLocaleDateString("es-MX", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }),
                                },
                                {
                                    icon: "fa-clock",
                                    label: "Válido hasta",
                                    value: new Date(data.expirationDate).toLocaleDateString("es-MX", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }),
                                },
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0">
                                        <i className={`fa-solid ${item.icon} text-[var(--color-primary)]`}></i>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-[var(--color-text-muted)] tracking-wider mb-0.5">
                                            {item.label}
                                        </p>
                                        <p className={`text-white font-medium ${item.mono ? "font-mono" : ""}`}>{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer QR Branding */}
                        <div className="p-8 bg-white/5 border-t border-white/10 flex items-center gap-4">
                            <img
                                src={data.qrCodeUrl}
                                alt="QR verification"
                                className="w-20 h-20 rounded-lg bg-white p-1"
                            />
                            <div className="text-left">
                                <p className="text-xs font-bold text-white mb-1 uppercase tracking-tight">EHSW² Verification Service</p>
                                <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed">
                                    Este sello digital confirma que la información mostrada coincide con nuestros registros internos.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Certificate Not Found */
                    <div className="glass-card overflow-hidden">
                        <div className="p-8 text-center bg-gradient-to-r from-red-600/20 to-red-500/10 border-b border-red-500/30">
                            <i className="fa-solid fa-shield-xmark text-5xl text-red-400 mb-3 block"></i>
                            <h1 className="text-2xl font-bold text-red-400">
                                CERTIFICADO NO VÁLIDO
                            </h1>
                            <p className="text-[var(--color-text-muted)] text-sm mt-2">
                                No encontramos un certificado con el folio:
                            </p>
                            <code className="text-white bg-[rgba(15,23,42,0.6)] px-3 py-1 rounded mt-2 inline-block">
                                {decodeURIComponent(folio)}
                            </code>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-[var(--color-text-muted)] text-sm mb-4">
                                Si cree que esto es un error, verifique el folio e intente
                                nuevamente, o contáctenos directamente.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link href="/#certificados" className="btn-primary text-sm justify-center">
                                    <i className="fa-solid fa-magnifying-glass"></i> Buscar
                                    Certificado
                                </Link>
                                <Link
                                    href="/#contacto"
                                    className="btn-secondary text-sm justify-center"
                                >
                                    <i className="fa-solid fa-phone"></i> Contactar
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Info */}
                <div className="text-center mt-6">
                    <p className="text-xs text-[var(--color-text-muted)] flex items-center justify-center gap-2">
                        <i className="fa-solid fa-shield-halved"></i>
                        Verificación oficial de EHSW² — Higiene y Seguridad Ambiental
                    </p>
                    <Link
                        href="/"
                        className="text-[var(--color-primary)] text-sm no-underline hover:underline mt-2 inline-block"
                    >
                        ← Volver al sitio principal
                    </Link>
                </div>
            </div>
        </div>
    );
}
