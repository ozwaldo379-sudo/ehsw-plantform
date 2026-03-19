"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function CertificateDetailPage() {
    const { folio } = useParams();
    const [certificate, setCertificate] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    const certificateRef = useRef<HTMLDivElement>(null);
    const stickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const res = await fetch(`/api/certificados/${folio}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Error al cargar el certificado");
                setCertificate(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (folio) fetchCertificate();
    }, [folio]);

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
            pdf.save(`Certificado-${certificate.folio}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Error al generar el PDF.");
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
            link.download = `${certificate.folio}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        } catch (error) {
            console.error("Error generating image:", error);
            alert("Error al generar la imagen.");
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col lg:flex-row min-h-screen">
                <AdminSidebar />
                <main className="flex-1 p-6 lg:p-10 flex items-center justify-center">
                    <div className="text-center">
                        <i className="fa-solid fa-circle-notch fa-spin text-4xl text-[var(--color-primary)] mb-4"></i>
                        <p className="text-white">Cargando certificado...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error || !certificate) {
        return (
            <div className="flex flex-col lg:flex-row min-h-screen">
                <AdminSidebar />
                <main className="flex-1 p-6 lg:p-10 flex items-center justify-center">
                    <div className="text-center bg-red-500/10 border border-red-500/20 p-10 rounded-2xl max-w-md">
                        <i className="fa-solid fa-circle-exclamation text-5xl text-red-500 mb-4"></i>
                        <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
                        <p className="text-[var(--color-text-muted)] mb-6">{error || "No se pudo encontrar el certificado."}</p>
                        <Link href="/admin/certificados" className="btn-primary w-full justify-center">
                            Volver a la lista
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <AdminSidebar />
            <main className="flex-1 p-6 lg:p-10 flex flex-col items-center">
                <div className="max-w-4xl w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div>
                            <Link href="/admin/certificados" className="text-[var(--color-primary)] no-underline hover:underline text-sm mb-2 inline-block font-medium">
                                ← Volver a la lista
                            </Link>
                            <h1 className="text-2xl font-bold text-white">Detalle de Certificado: {certificate.folio}</h1>
                        </div>
                        <div className="flex flex-wrap gap-2 w-full md:w-auto">
                            <button onClick={downloadSticker} className="btn-secondary text-sm bg-indigo-600/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-600/40 flex-1 md:flex-none justify-center">
                                <i className="fa-solid fa-qrcode"></i> QR PNG
                            </button>
                            <button onClick={downloadPDF} className="btn-secondary text-sm flex-1 md:flex-none justify-center">
                                <i className="fa-solid fa-file-pdf"></i> Descargar PDF
                            </button>
                        </div>
                    </div>

                    {/* PDF Preview */}
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden mb-10 text-slate-800" ref={certificateRef}>
                        <div className="p-12 relative border-[16px] border-slate-50 min-h-[600px] flex flex-col items-center">
                            <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-slate-200"></div>
                            <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-slate-200"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-slate-200"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-slate-200"></div>

                            <div className="text-center mb-12 z-10">
                                <h1 className="text-4xl font-serif font-bold text-slate-900 tracking-widest uppercase mb-2">Constancia de Servicio</h1>
                                <div className="h-1 w-24 bg-slate-800 mx-auto"></div>
                                <p className="mt-4 text-slate-500 font-medium italic">EHSW² — Higiene y Seguridad Ambiental</p>
                            </div>

                            <div className="text-center space-y-4 max-w-3xl z-10 text-lg">
                                <p className="text-slate-600">Por medio de la presente se certifica que:</p>
                                <p className="text-3xl font-bold text-slate-800 py-4 border-b-2 border-slate-200">{certificate.clientName}</p>
                                <p className="text-slate-600">Representante de:</p>
                                <p className="text-2xl font-bold text-slate-800">{certificate.company}</p>
                                <p className="text-slate-600">Ha completado satisfactoriamente el servicio de:</p>
                                <p className="text-2xl font-bold text-slate-800">{certificate.serviceType}</p>
                                <p className="text-slate-600 mt-2">Producto Químico Utilizado:</p>
                                <p className="text-xl font-bold text-slate-800">{certificate.chemicalUsed}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-x-20 gap-y-6 mt-12 text-left z-10 w-full max-w-3xl">
                                <div>
                                    <p className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">Folio</p>
                                    <p className="text-lg font-mono font-medium text-slate-800">{certificate.folio}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">Estado</p>
                                    <p className="text-lg font-bold text-emerald-600 font-mono tracking-tight">{certificate.status}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">Fecha de Emisión</p>
                                    <p className="text-lg text-slate-800">{new Date(certificate.issueDate).toLocaleDateString("es-MX")}</p>
                                </div>
                                <div>
                                    <p className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">Vigencia Hasta</p>
                                    <p className="text-lg text-slate-800">{new Date(certificate.expirationDate).toLocaleDateString("es-MX")}</p>
                                </div>
                            </div>

                            <div className="mt-auto pt-12 flex justify-between items-end w-full max-w-3xl z-10">
                                <div className="text-left">
                                    <div className="w-48 h-px bg-slate-400 mb-2"></div>
                                    <p className="text-sm font-bold text-slate-800">Firma Autorizada</p>
                                    <p className="text-xs text-slate-500">Dirección Técnica EHSW²</p>
                                </div>
                                <div className="text-center">
                                    <img src={certificate.qrCodeUrl} alt="QR Code" className="w-24 h-24 mb-2 border border-slate-100 p-1" />
                                    <p className="text-[10px] text-slate-400 font-mono">VALIDACIÓN DIGITAL</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hidden Sticker */}
                    <div className="absolute top-[-9999px] left-[-9999px]">
                        <div ref={stickerRef} className="w-[800px] h-[450px] bg-white text-slate-900 p-8 flex items-center border-[12px] border-slate-900">
                            <div className="w-1/3 flex flex-col items-center justify-center border-r-4 border-slate-200 pr-8">
                                <img src={certificate.qrCodeUrl} alt="QR Code" className="w-full h-auto mb-4" />
                                <h2 className="text-3xl font-black tracking-widest text-center">EHSW²</h2>
                                <p className="text-sm font-bold mt-2 tracking-widest text-center">VALIDACIÓN OFICIAL</p>
                            </div>
                            <div className="w-2/3 pl-8 flex flex-col justify-center space-y-6">
                                <div>
                                    <p className="text-sm font-bold uppercase text-slate-500 tracking-wider">Folio</p>
                                    <p className="text-4xl font-black font-mono">{certificate.folio}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold uppercase text-slate-500 tracking-wider">Razón Social</p>
                                    <p className="text-2xl font-bold uppercase">{certificate.company}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold uppercase text-slate-500 tracking-wider">Dirección</p>
                                    <p className="text-xl font-medium uppercase">{certificate.address || "N/A"}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase text-slate-500 tracking-wider">Fecha Servicio</p>
                                        <p className="text-xl font-bold">{new Date(certificate.issueDate).toLocaleDateString("es-MX")}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase text-slate-500 tracking-wider">Vigencia</p>
                                        <p className="text-xl font-bold">{new Date(certificate.expirationDate).toLocaleDateString("es-MX")}</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t-2 border-slate-200">
                                    <p className="text-xs font-bold uppercase text-slate-500 tracking-wider">Producto Químico Utilizado</p>
                                    <p className="text-lg font-medium text-slate-800 uppercase">{certificate.chemicalUsed}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
