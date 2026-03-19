"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function CertificadosListPage() {
    const [certificates, setCertificates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchCertificates = async (query = "") => {
        setLoading(true);
        try {
            const res = await fetch(`/api/certificados?search=${encodeURIComponent(query)}`);
            const data = await res.json();
            setCertificates(data);
        } catch (error) {
            console.error("Error fetching certificates:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    const handleDelete = async (folio: string) => {
        if (!confirm(`¿Estás seguro de eliminar el certificado ${folio}?`)) return;

        try {
            const res = await fetch(`/api/certificados/${folio}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setCertificates(certificates.filter((c) => c.folio !== folio));
            } else {
                alert("Error al eliminar el certificado");
            }
        } catch (error) {
            console.error("Error deleting certificate:", error);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchCertificates(search);
    };

    const now = new Date();

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <AdminSidebar />
            
            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Administrar Certificados</h1>
                            <p className="text-[var(--color-text-muted)] text-sm">Lista total de certificados emitidos por EHSW²</p>
                        </div>
                        <Link href="/admin/certificados/nuevo" className="btn-primary w-full md:w-auto justify-center">
                            <i className="fa-solid fa-plus"></i> Nuevo Certificado
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="mb-8 flex gap-3">
                        <div className="relative flex-1">
                            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"></i>
                            <input
                                type="text"
                                placeholder="Buscar por folio, cliente o empresa..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-[rgba(15,23,42,0.4)] border border-[var(--color-glass-border)] rounded-xl text-white outline-none focus:border-[var(--color-primary)] transition-colors"
                            />
                        </div>
                        <button type="submit" className="btn-secondary px-6">
                            Buscar
                        </button>
                        {search && (
                            <button
                                type="button"
                                onClick={() => { setSearch(""); fetchCertificates(""); }}
                                className="bg-white/5 hover:bg-white/10 text-white px-4 rounded-xl border border-white/10 transition-colors"
                            >
                                Limpiar
                            </button>
                        )}
                    </form>

                    <div className="glass-card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[var(--color-glass-border)] bg-[rgba(255,255,255,0.03)] font-medium">
                                        <th className="p-4 text-white text-sm uppercase tracking-wider">Folio</th>
                                        <th className="p-4 text-white text-sm uppercase tracking-wider">Cliente</th>
                                        <th className="p-4 text-white text-sm uppercase tracking-wider">Empresa</th>
                                        <th className="p-4 text-white text-sm uppercase tracking-wider">Servicio</th>
                                        <th className="p-4 text-white text-sm uppercase tracking-wider">Vencimiento</th>
                                        <th className="p-4 text-white text-sm uppercase tracking-wider">Estado</th>
                                        <th className="p-4 text-white text-sm uppercase tracking-wider text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={7} className="p-10 text-center text-[var(--color-text-muted)]">
                                                <i className="fa-solid fa-circle-notch fa-spin text-2xl mb-2"></i>
                                                <p>Cargando certificados...</p>
                                            </td>
                                        </tr>
                                    ) : certificates.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="p-10 text-center text-[var(--color-text-muted)]">
                                                <div className="py-10 flex flex-col items-center">
                                                    <i className="fa-solid fa-inbox text-4xl text-[var(--color-text-muted)] mb-3"></i>
                                                    <p>No se encontraron certificados.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        certificates.map((cert) => {
                                            const isExpired = new Date(cert.expirationDate) < now;
                                            return (
                                                <tr key={cert.id} className="border-b border-[var(--color-glass-border)] hover:bg-[rgba(255,255,255,0.02)] transition-colors group">
                                                    <td className="p-4 text-white font-mono font-medium text-sm">{cert.folio}</td>
                                                    <td className="p-4 text-[var(--color-text-muted)] text-sm">{cert.clientName}</td>
                                                    <td className="p-4 text-[var(--color-text-muted)] text-sm">{cert.company}</td>
                                                    <td className="p-4">
                                                        <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-white/70 uppercase font-medium">
                                                            {cert.serviceType}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-[var(--color-text-muted)] text-xs font-mono">
                                                        {new Date(cert.expirationDate).toLocaleDateString("es-MX")}
                                                    </td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-tight uppercase border ${isExpired ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                            }`}>
                                                            {isExpired ? "Expirado" : "Validado"}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-right">
                                                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Link
                                                                href={`/admin/certificados/${cert.folio}`}
                                                                className="p-2 hover:bg-white/10 rounded-lg text-[var(--color-primary)] transition-colors"
                                                                title="Detalles y Descargas"
                                                            >
                                                                <i className="fa-solid fa-file-invoice text-xs"></i>
                                                            </Link>
                                                            <Link
                                                                href={`/certificado/${cert.folio}`}
                                                                target="_blank"
                                                                className="p-2 hover:bg-white/10 rounded-lg text-emerald-400 transition-colors"
                                                                title="Ver público"
                                                            >
                                                                <i className="fa-solid fa-eye text-xs"></i>
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(cert.folio)}
                                                                className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 transition-colors"
                                                                title="Eliminar"
                                                            >
                                                                <i className="fa-solid fa-trash-can text-xs"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
