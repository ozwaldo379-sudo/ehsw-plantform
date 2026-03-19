"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function NewCertificatePage() {
    const [formData, setFormData] = useState({
        clientName: "",
        company: "",
        address: "",
        serviceType: "",
        chemicalUsed: "",
        issueDate: "",
        expirationDate: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successData, setSuccessData] = useState<any>(null);
    const certificateRef = useRef<HTMLDivElement>(null);
    const stickerRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/certificados", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Error al crear certificado");

            setSuccessData(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = async () => {
        if (!certificateRef.current) return;
        try {
            const canvas = await html2canvas(certificateRef.current, { 
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#ffffff"
            });
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Certificado-${successData.folio}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Error al generar el PDF. Por favor, intente de nuevo.");
        }
    };

    const downloadSticker = async () => {
        if (!stickerRef.current) return;
        try {
            const canvas = await html2canvas(stickerRef.current, { 
                scale: 3,
                useCORS: true,
                allowTaint: true,
                backgroundColor: "#ffffff"
            });
            const link = document.createElement("a");
            link.download = `${successData.folio}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        } catch (error) {
            console.error("Error generating image:", error);
            alert("Error al generar la imagen. Por favor, intente de nuevo.");
        }
    };

    if (successData) {
        return (
            <div className="flex flex-col lg:flex-row min-h-screen">
                <AdminSidebar />
                <main className="flex-1 p-6 lg:p-10 flex flex-col items-center">
                    <div className="max-w-4xl w-full">
                        <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-white">¡Certificado Creado!</h1>
                        <div className="flex gap-3">
                            <button onClick={downloadSticker} className="btn-secondary text-sm bg-indigo-600/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-600/40">
                                <i className="fa-solid fa-qrcode"></i> Descargar Etiqueta QR
                            </button>
                            <button onClick={downloadPDF} className="btn-secondary text-sm">
                                <i className="fa-solid fa-file-pdf"></i> Descargar PDF
                            </button>
                            <button
                                onClick={() => {
                                    setSuccessData(null);
                                    setFormData({
                                        clientName: "",
                                        company: "",
                                        address: "",
                                        serviceType: "",
                                        chemicalUsed: "",
                                        issueDate: "",
                                        expirationDate: "",
                                    });
                                }}
                                className="btn-primary text-sm"
                            >
                                <i className="fa-solid fa-plus"></i> Crear Otro
                            </button>
                        </div>
                        </div>
                    </div>

                    {/* PDF Preview / Certificate Design */}
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-10 text-slate-800" ref={certificateRef}>
                        <div className="p-12 relative border-[16px] border-slate-50 min-h-[600px] flex flex-col items-center">
                            {/* Decorative elements */}
                            <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-slate-200"></div>
                            <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-slate-200"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-slate-200"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-slate-200"></div>

                            {/* Header */}
                            <div className="text-center mb-12 z-10">
                                <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-widest uppercase mb-2">Constancia de Servicio</h1>
                                <div className="h-1 w-24 bg-slate-800 mx-auto"></div>
                                <p className="mt-4 text-slate-500 font-medium italic">EHSW² — Higiene y Seguridad Ambiental</p>
                            </div>

                            <div className="text-center space-y-4 max-w-3xl z-10 text-lg">
                                <p className="text-slate-600">Por medio de la presente se certifica que:</p>
                                <p className="text-3xl font-bold text-slate-800 py-4 border-b-2 border-slate-200">{successData.clientName}</p>
                                <p className="text-slate-600">Representante de:</p>
                                <p className="text-2xl font-bold text-slate-800">{successData.company}</p>
                                <p className="text-slate-600">Ha completado satisfactoriamente el servicio de:</p>
                                <p className="text-2xl font-bold text-slate-800">{successData.serviceType}</p>
                                <p className="text-slate-600 mt-2">Producto Químico Utilizado:</p>
                                <p className="text-xl font-bold text-slate-800">{successData.chemicalUsed}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-x-20 gap-y-6 mt-12 text-left z-10 w-full max-w-3xl">
                                <div>
                                    <p className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">Folio</p>
                                    <p className="text-lg font-mono font-medium text-slate-800">{successData.folio}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">Estado</p>
                                    <p className="text-lg font-bold text-emerald-600 font-mono tracking-tight">{successData.status}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">Fecha de Emisión</p>
                                    <p className="text-lg text-slate-800">{new Date(successData.issueDate).toLocaleDateString("es-MX")}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">Vigencia Hasta</p>
                                    <p className="text-lg text-slate-800">{new Date(successData.expirationDate).toLocaleDateString("es-MX")}</p>
                                </div>
                            </div>

                            {/* Footer with QR */}
                            <div className="mt-auto pt-12 flex justify-between items-end w-full max-w-3xl z-10">
                                <div className="text-left">
                                    <div className="w-48 h-px bg-slate-400 mb-2"></div>
                                    <p className="text-sm font-bold text-slate-800">Firma Autorizada</p>
                                    <p className="text-xs text-slate-500">Dirección Técnica EHSW²</p>
                                </div>
                                <div className="text-center">
                                    <img src={successData.qrCodeUrl} alt="QR Code" className="w-24 h-24 mb-2 border border-slate-100 p-1" />
                                    <p className="text-[10px] text-slate-400 font-mono">VALIDACIÓN DIGITAL</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hidden Sticker Template for html2canvas */}
                    <div className="absolute top-[-9999px] left-[-9999px]">
                        <div ref={stickerRef} className="w-[800px] h-[450px] bg-white text-slate-900 p-8 flex items-center border-[12px] border-slate-900">
                            <div className="w-1/3 flex flex-col items-center justify-center border-r-4 border-slate-200 pr-8">
                                <img src={successData.qrCodeUrl} alt="QR Code" className="w-full h-auto mb-4" />
                                <h2 className="text-3xl font-black tracking-widest text-center">EHSW²</h2>
                                <p className="text-sm font-bold mt-2 tracking-widest text-center">VALIDACIÓN OFICIAL</p>
                            </div>
                            <div className="w-2/3 pl-8 flex flex-col justify-center space-y-6">
                                <div>
                                    <p className="text-sm font-bold uppercase text-slate-500 tracking-wider">Folio</p>
                                    <p className="text-4xl font-black font-mono">{successData.folio}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold uppercase text-slate-500 tracking-wider">Razón Social</p>
                                    <p className="text-2xl font-bold uppercase">{successData.company}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold uppercase text-slate-500 tracking-wider">Dirección</p>
                                    <p className="text-xl font-medium uppercase">{successData.address || "N/A"}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase text-slate-500 tracking-wider">Fecha Servicio</p>
                                        <p className="text-xl font-bold">{new Date(successData.issueDate).toLocaleDateString("es-MX")}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase text-slate-500 tracking-wider">Vigencia</p>
                                        <p className="text-xl font-bold">{new Date(successData.expirationDate).toLocaleDateString("es-MX")}</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t-2 border-slate-200">
                                    <p className="text-xs font-bold uppercase text-slate-500 tracking-wider">Producto Químico Utilizado</p>
                                    <p className="text-lg font-medium text-slate-800 uppercase">{successData.chemicalUsed}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-6 lg:p-10">
                <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link href="/admin/certificados" className="text-[var(--color-primary)] no-underline hover:underline text-sm mb-4 inline-block font-medium">
                        ← Volver a la lista
                    </Link>
                    <h1 className="text-2xl font-bold text-white">Nuevo Certificado</h1>
                    <p className="text-[var(--color-text-muted)] text-sm">Complete la información para generar el certificado y su código QR.</p>
                </div>

                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                    <div>
                        <label className="text-sm text-[var(--color-text-muted)] block mb-2 font-medium">
                            Nombre del Cliente / Responsable
                        </label>
                        <input
                            type="text"
                            value={formData.clientName}
                            onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                            className="w-full p-3 bg-[rgba(15,23,42,0.6)] border border-[var(--color-glass-border)] rounded-lg text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                            placeholder="Ej: Juan Pérez"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-[var(--color-text-muted)] block mb-2 font-medium">
                            Empresa / Establecimiento
                        </label>
                        <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full p-3 bg-[rgba(15,23,42,0.6)] border border-[var(--color-glass-border)] rounded-lg text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                            placeholder="Nombre de la empresa"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-[var(--color-text-muted)] block mb-2 font-medium">
                            Dirección del Establecimiento
                        </label>
                        <input
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full p-3 bg-[rgba(15,23,42,0.6)] border border-[var(--color-glass-border)] rounded-lg text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                            placeholder="Ej: Av. Juárez 123, Col. Centro"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-[var(--color-text-muted)] block mb-2 font-medium">
                            Tipo de Servicio
                        </label>
                        <input
                            type="text"
                            value={formData.serviceType}
                            onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                            className="w-full p-3 bg-[rgba(15,23,42,0.6)] border border-[var(--color-glass-border)] rounded-lg text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                            placeholder="Ej: Control de Plagas"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm text-[var(--color-text-muted)] block mb-2 font-medium">
                            Producto Químico Utilizado
                        </label>
                        <input
                            type="text"
                            value={formData.chemicalUsed}
                            onChange={(e) => setFormData({ ...formData, chemicalUsed: e.target.value })}
                            className="w-full p-3 bg-[rgba(15,23,42,0.6)] border border-[var(--color-glass-border)] rounded-lg text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                            placeholder="Ej: Deltametrina 2.5%"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-sm text-[var(--color-text-muted)] block mb-2 font-medium">
                                Fecha de Emisión
                            </label>
                            <input
                                type="date"
                                value={formData.issueDate}
                                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                                className="w-full p-3 bg-[rgba(15,23,42,0.6)] border border-[var(--color-glass-border)] rounded-lg text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm text-[var(--color-text-muted)] block mb-2 font-medium">
                                Fecha de Vencimiento
                            </label>
                            <input
                                type="date"
                                value={formData.expirationDate}
                                onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                                className="w-full p-3 bg-[rgba(15,23,42,0.6)] border border-[var(--color-glass-border)] rounded-lg text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/30 p-4 rounded-lg flex items-center gap-3">
                            <i className="fa-solid fa-circle-exclamation text-lg"></i>
                            {error}
                        </div>
                    )}

                    <div className="pt-4 border-t border-[var(--color-glass-border)]">
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full justify-center text-lg py-3"
                        >
                            {loading ? (
                                <i className="fa-solid fa-circle-notch fa-spin"></i>
                            ) : (
                                <>
                                    <i className="fa-solid fa-file-signature"></i> Generar Certificado y QR
                                </>
                            )}
                        </button>
                    </div>
                </form>
                </div>
            </main>
        </div>
    );
}
