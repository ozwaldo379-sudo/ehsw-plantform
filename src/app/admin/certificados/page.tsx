"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileSearch,
  Pencil,
  PlusCircle,
  Search,
  Trash2,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import type { SerializedCertificate } from "@/lib/certificates";

interface CertificatesResponse {
  certificados: SerializedCertificate[];
  total: number;
  page: number;
  pageSize: number;
}

const FILTERS = [
  { id: "todos", label: "Todos", value: "" },
  { id: "vigente", label: "Vigentes", value: "vigente" },
  { id: "por_vencer", label: "Por Vencer", value: "por_vencer" },
  { id: "vencido", label: "Vencidos", value: "vencido" },
];

function getStatusClasses(status: string) {
  switch (status) {
    case "EXPIRED":
      return "border border-red-500/25 bg-red-500/10 text-red-200";
    case "EXPIRING":
      return "border border-amber-500/25 bg-amber-500/10 text-amber-200";
    default:
      return "border border-valid/25 bg-valid/10 text-valid";
  }
}

export default function CertificadosListPage() {
  const [certificates, setCertificates] = useState<SerializedCertificate[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [searchDraft, setSearchDraft] = useState("");
  const [search, setSearch] = useState("");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingFolio, setDeletingFolio] = useState<string | null>(null);
  const totalPages = Math.max(Math.ceil(total / pageSize), 1);

  async function fetchCertificates() {
    setLoading(true);

    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
      });

      if (search) params.set("search", search);
      if (estado) params.set("estado", estado);

      const response = await fetch(`/api/certificados?${params.toString()}`);
      const data: CertificatesResponse | { error?: string } = await response.json();

      if (!response.ok || !("certificados" in data)) {
        throw new Error(
          ("error" in data ? data.error : undefined) ||
            "No se pudieron cargar los certificados"
        );
      }

      setCertificates(data.certificados);
      setTotal(data.total);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      setCertificates([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCertificates();
  }, [page, pageSize, search, estado]);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    setPage(1);
    setSearch(searchDraft.trim());
  }

  async function handleDelete(folio: string) {
    if (!confirm(`¿Desea eliminar el certificado ${folio}?`)) {
      return;
    }

    setDeletingFolio(folio);

    try {
      const response = await fetch(`/api/certificados/${encodeURIComponent(folio)}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "No se pudo eliminar el certificado");
      }

      await fetchCertificates();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Ocurrió un error al eliminar";
      alert(message);
    } finally {
      setDeletingFolio(null);
    }
  }

  function handleDownloadQr(folio: string) {
    const link = document.createElement("a");
    link.href = `/api/qr/${encodeURIComponent(folio)}`;
    link.download = `QR-${folio}.png`;
    link.click();
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 px-5 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="section-label mb-3">Gestión Operativa</p>
              <h1 className="font-heading text-3xl font-bold text-white">
                Certificados
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">
                Consulte, filtre y administre todos los certificados emitidos por
                EHSW² desde un solo panel.
              </p>
            </div>

            <Link
              href="/admin/certificados/nuevo"
              className="btn-primary justify-center"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Nuevo Certificado</span>
            </Link>
          </div>

          <section className="glass-card mb-6 p-5">
            <div className="mb-5 flex flex-wrap gap-3">
              {FILTERS.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => {
                    setPage(1);
                    setEstado(filter.value);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                    estado === filter.value
                      ? "bg-cyan text-white"
                      : "border border-white/10 bg-white/5 text-silver hover:border-cyan/30 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <form
              onSubmit={handleSearch}
              className="flex flex-col gap-3 md:flex-row md:items-center"
            >
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-text-muted)]" />
                <input
                  type="text"
                  value={searchDraft}
                  onChange={(event) => setSearchDraft(event.target.value)}
                  className="contact-input pl-11"
                  placeholder="Buscar por folio o empresa"
                />
              </div>

              <button type="submit" className="btn-primary justify-center">
                <FileSearch className="h-4 w-4" />
                <span>Buscar</span>
              </button>

              {(search || searchDraft) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchDraft("");
                    setSearch("");
                    setPage(1);
                  }}
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/30 hover:bg-cyan/10"
                >
                  Limpiar
                </button>
              )}
            </form>
          </section>

          <section className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-white/3">
                  <tr className="border-b border-white/8">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                      Folio
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                      Empresa
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                      Servicio
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                      Emisión
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                      Vigencia
                    </th>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                      Estado
                    </th>
                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-16 text-center text-[var(--color-text-muted)]"
                      >
                        Cargando certificados...
                      </td>
                    </tr>
                  ) : certificates.length ? (
                    certificates.map((certificate) => (
                      <tr
                        key={certificate.folio}
                        className="border-b border-white/6 transition-colors hover:bg-white/3"
                      >
                        <td className="px-5 py-4 font-mono text-sm font-semibold text-white">
                          {certificate.folio}
                        </td>
                        <td className="px-5 py-4 text-silver">
                          {certificate.company}
                        </td>
                        <td className="px-5 py-4 text-silver">
                          {certificate.serviceType}
                        </td>
                        <td className="px-5 py-4 text-silver">
                          {new Date(certificate.issueDate).toLocaleDateString("es-MX")}
                        </td>
                        <td className="px-5 py-4 text-silver">
                          {new Date(certificate.expirationDate).toLocaleDateString(
                            "es-MX"
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                              certificate.status
                            )}`}
                          >
                            {certificate.statusLabel}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap justify-end gap-2">
                            <Link
                              href={`/admin/certificados/${encodeURIComponent(
                                certificate.folio
                              )}`}
                              className="inline-flex items-center gap-2 rounded-md border border-cyan/40 bg-transparent px-3 py-2 text-sm font-medium text-cyan transition-colors hover:bg-cyan/10"
                              title="Ver detalle"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="hidden md:inline">Ver</span>
                            </Link>
                            <Link
                              href={`/admin/certificados/${encodeURIComponent(
                                certificate.folio
                              )}?edit=true`}
                              className="inline-flex items-center gap-2 rounded-md border border-silver/20 bg-transparent px-3 py-2 text-sm font-medium text-silver transition-colors hover:bg-white/10"
                              title="Editar"
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="hidden md:inline">Editar</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDownloadQr(certificate.folio)}
                              className="inline-flex items-center gap-2 rounded-md bg-cyan px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-dark"
                              title="Descargar QR"
                            >
                              <Download className="h-4 w-4" />
                              <span className="hidden md:inline">Descargar QR</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(certificate.folio)}
                              disabled={deletingFolio === certificate.folio}
                              className="inline-flex items-center gap-2 rounded-md border border-red-500/40 bg-transparent px-3 py-2 text-sm font-medium text-red-200 transition-colors hover:bg-red-500/10"
                              title="Eliminar"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="hidden md:inline">
                                {deletingFolio === certificate.folio
                                  ? "Eliminando..."
                                  : "Eliminar"}
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-16 text-center text-[var(--color-text-muted)]"
                      >
                        No se encontraron certificados con los filtros actuales.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {totalPages > 1 ? (
              <div className="flex flex-col gap-3 border-t border-white/8 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[var(--color-text-muted)]">
                  Mostrando página {page} de {totalPages} con {total} registros.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPage((current) => Math.max(current - 1, 1))}
                    disabled={page === 1}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-cyan/30 hover:bg-cyan/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Anterior</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPage((current) => Math.min(current + 1, totalPages))
                    }
                    disabled={page === totalPages}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-cyan/30 hover:bg-cyan/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span>Siguiente</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </main>
    </div>
  );
}
