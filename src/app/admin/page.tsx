import { redirect } from "next/navigation";
import { getAuthFromCookies } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const auth = await getAuthFromCookies();
    if (!auth) redirect("/admin/login");

    const now = new Date();
    const totalCerts = await prisma.certificate.count();
    const activeCerts = await prisma.certificate.count({
        where: { expirationDate: { gt: now } },
    });
    const expiredCerts = await prisma.certificate.count({
        where: { expirationDate: { lte: now } },
    });
    const recentCerts = await prisma.certificate.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
    });

    return (
        <div className="flex flex-col lg:flex-row min-h-screen">
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-10">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
                        <p className="text-[var(--color-text-muted)] text-sm">
                            Bienvenido, <span className="text-white font-medium">{auth.email}</span>
                        </p>
                    </div>
                    <Link
                        href="/admin/certificados/nuevo"
                        className="btn-primary text-sm shadow-glow"
                    >
                        <i className="fa-solid fa-plus"></i> Nuevo Certificado
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                    <div className="glass-card p-6 border-l-4 border-l-[var(--color-primary)]">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-[var(--color-text-muted)] font-medium">
                                Total Certificados
                            </span>
                            <i className="fa-solid fa-certificate text-[var(--color-primary)] text-xl"></i>
                        </div>
                        <p className="text-4xl font-bold text-white tracking-tighter">{totalCerts}</p>
                    </div>
                    <div className="glass-card p-6 border-l-4 border-l-emerald-500">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-[var(--color-text-muted)] font-medium">
                                Activos
                            </span>
                            <i className="fa-solid fa-circle-check text-emerald-400 text-xl"></i>
                        </div>
                        <p className="text-4xl font-bold text-emerald-400 tracking-tighter">{activeCerts}</p>
                    </div>
                    <div className="glass-card p-6 border-l-4 border-l-orange-500">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-[var(--color-text-muted)] font-medium">
                                Vencidos
                            </span>
                            <i className="fa-solid fa-triangle-exclamation text-orange-400 text-xl"></i>
                        </div>
                        <p className="text-4xl font-bold text-orange-400 tracking-tighter">{expiredCerts}</p>
                    </div>
                </div>

                {/* Recent Certificates */}
                <div className="glass-card overflow-hidden">
                    <div className="p-6 border-b border-[var(--color-glass-border)] flex justify-between items-center bg-white/5">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <i className="fa-solid fa-clock-rotate-left text-[var(--color-accent)]"></i>
                            Certificados Recientes
                        </h2>
                        <Link
                            href="/admin/certificados"
                            className="text-[var(--color-primary)] text-sm no-underline hover:text-white transition-colors font-medium"
                        >
                            Ver todos los certificados →
                        </Link>
                    </div>
                    {recentCerts.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-[var(--color-glass-border)] bg-white/5">
                                        <th className="text-left p-4 text-[var(--color-text-muted)] font-medium uppercase tracking-wider text-xs">
                                            Folio
                                        </th>
                                        <th className="text-left p-4 text-[var(--color-text-muted)] font-medium uppercase tracking-wider text-xs">
                                            Empresa
                                        </th>
                                        <th className="text-left p-4 text-[var(--color-text-muted)] font-medium uppercase tracking-wider text-xs">
                                            Servicio
                                        </th>
                                        <th className="text-left p-4 text-[var(--color-text-muted)] font-medium uppercase tracking-wider text-xs">
                                            Estado
                                        </th>
                                        <th className="text-right p-4 text-[var(--color-text-muted)] font-medium uppercase tracking-wider text-xs">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentCerts.map((cert) => {
                                        const isValid = new Date(cert.expirationDate) > now;
                                        return (
                                            <tr
                                                key={cert.id}
                                                className="border-b border-[var(--color-glass-border)] hover:bg-white/5 transition-colors group"
                                            >
                                                <td className="p-4 text-white font-mono font-medium">
                                                    {cert.folio}
                                                </td>
                                                <td className="p-4 text-[var(--color-text-muted)] font-medium">
                                                    {cert.company}
                                                </td>
                                                <td className="p-4 text-[var(--color-text-muted)]">
                                                    <span className="bg-white/5 px-2 py-1 rounded text-xs">
                                                        {cert.serviceType}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <span
                                                        className={`px-2 py-1 rounded-md text-[10px] font-bold tracking-tight uppercase border ${isValid
                                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                            : "bg-red-500/10 text-red-500 border-red-500/20"
                                                            }`}
                                                    >
                                                        {isValid ? "Validado" : "Expirado"}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <div className="flex gap-3 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Link
                                                            href={`/admin/certificados/${cert.folio}`}
                                                            className="text-[var(--color-primary)] hover:text-white transition-colors"
                                                            title="Detalles y Descargas"
                                                        >
                                                            <i className="fa-solid fa-file-invoice"></i>
                                                        </Link>
                                                        <Link
                                                            href={`/certificado/${cert.folio}`}
                                                            className="text-emerald-400 hover:text-white transition-colors"
                                                            title="Ver validación"
                                                            target="_blank"
                                                        >
                                                            <i className="fa-solid fa-eye"></i>
                                                        </Link>
                                                        <Link
                                                            href={`/admin/certificados`}
                                                            className="text-[var(--color-accent)] hover:text-white transition-colors"
                                                            title="Gestionar todos"
                                                        >
                                                            <i className="fa-solid fa-list-check"></i>
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <i className="fa-solid fa-inbox text-5xl text-[var(--color-text-muted)] mb-4 block"></i>
                            <p className="text-[var(--color-text-muted)] text-lg mb-6">
                                No se encontraron registros en el sistema.
                            </p>
                            <Link
                                href="/admin/certificados/nuevo"
                                className="btn-primary text-sm inline-flex items-center gap-2"
                            >
                                <i className="fa-solid fa-plus"></i> Generar Primer Certificado
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
