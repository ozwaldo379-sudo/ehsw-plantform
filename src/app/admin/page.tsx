import Link from "next/link";
import type { Certificate } from "@prisma/client";
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CircleCheckBig,
  FileText,
  PlusCircle,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAuthFromCookies } from "@/lib/auth";
import {
  getCertificateState,
  getCertificateStateLabel,
  getExpiringThreshold,
} from "@/lib/certificates";

export const dynamic = "force-dynamic";

function getBadgeClasses(status: "VALID" | "EXPIRING" | "EXPIRED") {
  switch (status) {
    case "EXPIRED":
      return "border border-red-500/25 bg-red-500/10 text-red-200";
    case "EXPIRING":
      return "border border-amber-500/25 bg-amber-500/10 text-amber-200";
    default:
      return "border border-valid/25 bg-valid/10 text-valid";
  }
}

export default async function AdminDashboard() {
  const auth = await getAuthFromCookies();
  const now = new Date();
  const current = new Date(now);
  current.setHours(0, 0, 0, 0);
  const threshold = getExpiringThreshold(current);

  const [total, valid, expiring, expired, recentCertificates] = await Promise.all([
    prisma.certificate.count(),
    prisma.certificate.count({
      where: { expirationDate: { gt: threshold } },
    }),
    prisma.certificate.count({
      where: { expirationDate: { gte: current, lte: threshold } },
    }),
    prisma.certificate.count({
      where: { expirationDate: { lt: current } },
    }),
    prisma.certificate.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const stats = [
    {
      label: "Total Certificados",
      value: total,
      icon: FileText,
      accent: "text-cyan",
      border: "border-cyan/30",
    },
    {
      label: "Vigentes",
      value: valid,
      icon: CircleCheckBig,
      accent: "text-valid",
      border: "border-valid/30",
    },
    {
      label: "Por Vencer",
      value: expiring,
      icon: CalendarClock,
      accent: "text-amber-300",
      border: "border-amber-500/30",
    },
    {
      label: "Vencidos",
      value: expired,
      icon: AlertTriangle,
      accent: "text-red-300",
      border: "border-red-500/30",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 px-5 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <p className="section-label mb-3">Centro de Control</p>
              <h1 className="font-heading text-3xl font-bold text-white sm:text-4xl">
                Panel de Administración EHSW²
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
                Gestión de certificados y validaciones. Sesión activa para{" "}
                <span className="font-semibold text-white">{auth?.email}</span>.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/admin/certificados/nuevo"
                className="btn-primary justify-center"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Nuevo Certificado</span>
              </Link>
              <Link
                href="/admin/certificados"
                className="btn-ghost justify-center"
              >
                <FileText className="h-4 w-4" />
                <span>Ver Todos</span>
              </Link>
            </div>
          </div>

          <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.label}
                  className={`glass-card border ${stat.border} p-5`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-[var(--color-text-muted)]">
                      {stat.label}
                    </p>
                    <Icon className={`h-5 w-5 ${stat.accent}`} />
                  </div>
                  <p className={`font-heading text-4xl font-bold ${stat.accent}`}>
                    {stat.value}
                  </p>
                </article>
              );
            })}
          </section>

          <section className="glass-card overflow-hidden">
            <div className="flex flex-col gap-4 border-b border-white/8 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-heading text-xl font-bold text-white">
                  Últimos certificados emitidos
                </h2>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  Seguimiento rápido a los cinco registros más recientes.
                </p>
              </div>
              <Link
                href="/admin/certificados"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan no-underline transition-colors hover:text-white"
              >
                <span>Ir al listado completo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {recentCertificates.length ? (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-white/3">
                    <tr className="border-b border-white/8">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        Folio
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        Empresa
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        Servicio
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        Vigencia
                      </th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                        Estado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentCertificates.map((certificate: Certificate) => {
                      const status = getCertificateState(certificate.expirationDate, now);

                      return (
                        <tr
                          key={certificate.folio}
                          className="border-b border-white/6 transition-colors hover:bg-white/3"
                        >
                          <td className="px-6 py-4 font-mono text-sm font-semibold text-white">
                            <Link
                              href={`/admin/certificados/${encodeURIComponent(
                                certificate.folio
                              )}`}
                              className="no-underline transition-colors hover:text-cyan"
                            >
                              {certificate.folio}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-silver">
                            {certificate.company}
                          </td>
                          <td className="px-6 py-4 text-silver">
                            {certificate.serviceType}
                          </td>
                          <td className="px-6 py-4 text-silver">
                            {new Date(certificate.expirationDate).toLocaleDateString(
                              "es-MX"
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClasses(
                                status
                              )}`}
                            >
                              {getCertificateStateLabel(status)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-[var(--color-text-muted)]">
                  Aún no hay certificados registrados.
                </p>
                <Link
                  href="/admin/certificados/nuevo"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan no-underline hover:text-white"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Crear el primero</span>
                </Link>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
