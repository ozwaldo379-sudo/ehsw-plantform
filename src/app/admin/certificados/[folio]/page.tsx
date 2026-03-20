"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Copy,
  Download,
  Eye,
  Pencil,
  QrCode,
  RefreshCcw,
  Save,
  Trash2,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import type { SerializedCertificate } from "@/lib/certificates";

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

export default function CertificateDetailPage() {
  const router = useRouter();
  const params = useParams<{ folio: string }>();
  const searchParams = useSearchParams();
  const folio = useMemo(() => params?.folio ?? "", [params]);
  const isEditRequested = searchParams.get("edit") === "true";
  const wasCreated = searchParams.get("created") === "1";

  const [certificate, setCertificate] = useState<SerializedCertificate | null>(null);
  const [formData, setFormData] = useState({
    company: "",
    serviceType: "",
    chemicalUsed: "",
    expirationDate: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(isEditRequested);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState(
    wasCreated ? "Certificado creado correctamente." : ""
  );
  const [qrVersion, setQrVersion] = useState(0);

  useEffect(() => {
    setEditing(isEditRequested);
  }, [isEditRequested]);

  useEffect(() => {
    async function fetchCertificate() {
      if (!folio) return;

      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/certificados/${encodeURIComponent(folio)}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "No se pudo cargar el certificado");
        }

        setCertificate(data);
        setFormData({
          company: data.company ?? "",
          serviceType: data.serviceType ?? "",
          chemicalUsed: data.chemicalUsed ?? "",
          expirationDate: data.expirationDate?.slice(0, 10) ?? "",
          notes: data.notes ?? "",
        });
      } catch (fetchError) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : "Error al cargar el certificado"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCertificate();
  }, [folio]);

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    if (!certificate) return;

    setSaving(true);
    setError("");
    setFeedback("");

    try {
      const response = await fetch(
        `/api/certificados/${encodeURIComponent(certificate.folio)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company: formData.company,
            serviceType: formData.serviceType,
            chemicalUsed: formData.chemicalUsed,
            expirationDate: formData.expirationDate,
            notes: formData.notes,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo actualizar el certificado");
      }

      setCertificate(data);
      setFormData({
        company: data.company ?? "",
        serviceType: data.serviceType ?? "",
        chemicalUsed: data.chemicalUsed ?? "",
        expirationDate: data.expirationDate?.slice(0, 10) ?? "",
        notes: data.notes ?? "",
      });
      setEditing(false);
      setFeedback("Cambios guardados correctamente.");
      router.replace(`/admin/certificados/${encodeURIComponent(data.folio)}`);
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Error al guardar los cambios"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!certificate) return;
    if (!confirm(`¿Desea eliminar el certificado ${certificate.folio}?`)) {
      return;
    }

    try {
      const response = await fetch(
        `/api/certificados/${encodeURIComponent(certificate.folio)}`,
        { method: "DELETE" }
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo eliminar el certificado");
      }

      router.push("/admin/certificados");
      router.refresh();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "No se pudo eliminar el certificado"
      );
    }
  }

  async function handleRegenerateQr() {
    if (!certificate) return;

    try {
      const response = await fetch(
        `/api/qr/${encodeURIComponent(certificate.folio)}?regenerate=true`
      );

      if (!response.ok) {
        throw new Error("No se pudo regenerar el código QR");
      }

      setQrVersion((current) => current + 1);
      setFeedback("Código QR regenerado correctamente.");
    } catch (regenerateError) {
      setError(
        regenerateError instanceof Error
          ? regenerateError.message
          : "No se pudo regenerar el código QR"
      );
    }
  }

  async function handleCopyPublicLink() {
    if (!certificate) return;

    const publicUrl = `${window.location.origin}/certificado/${encodeURIComponent(
      certificate.folio
    )}`;

    try {
      await navigator.clipboard.writeText(publicUrl);
      setFeedback("Enlace público copiado al portapapeles.");
    } catch {
      setError("No se pudo copiar el enlace público.");
    }
  }

  async function handleDownloadQr() {
    if (!certificate) return;

    const response = await fetch(`/api/qr/${encodeURIComponent(certificate.folio)}`);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `QR-${certificate.folio}.png`;
    link.click();
    URL.revokeObjectURL(objectUrl);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AdminSidebar />
        <main className="flex flex-1 items-center justify-center px-5 py-10 text-[var(--color-text-muted)]">
          Cargando certificado...
        </main>
      </div>
    );
  }

  if (error && !certificate) {
    return (
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AdminSidebar />
        <main className="flex flex-1 items-center justify-center px-5 py-10">
          <div className="glass-card max-w-lg p-8 text-center">
            <p className="text-lg font-semibold text-white">No se pudo cargar el certificado</p>
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">{error}</p>
            <Link
              href="/admin/certificados"
              className="btn-primary mt-6 justify-center"
            >
              Volver a la lista
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!certificate) {
    return null;
  }

  const qrSrc = `/api/qr/${encodeURIComponent(certificate.folio)}?v=${qrVersion}`;

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 px-5 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <Link
              href="/admin/certificados"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan no-underline hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver a la lista</span>
            </Link>
            <p className="section-label mb-3">Detalle del Certificado</p>
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <div>
                <h1 className="font-heading text-3xl font-bold text-white">
                  {certificate.folio}
                </h1>
                <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                  Consulta, actualiza y comparte la validación pública del
                  certificado.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => {
                    setEditing(true);
                    setFeedback("");
                    router.replace(
                      `/admin/certificados/${encodeURIComponent(
                        certificate.folio
                      )}?edit=true`
                    );
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-silver/20 bg-white/5 px-4 py-3 text-sm font-semibold text-silver transition-colors hover:bg-white/10"
                >
                  <Pencil className="h-4 w-4" />
                  <span>Editar</span>
                </button>
                <Link
                  href={`/certificado/${encodeURIComponent(certificate.folio)}`}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm font-semibold text-cyan no-underline transition-colors hover:bg-cyan/15"
                >
                  <Eye className="h-4 w-4" />
                  <span>Ver público</span>
                </Link>
              </div>
            </div>
          </div>

          {feedback ? (
            <div className="mb-6 rounded-xl border border-valid/25 bg-valid/10 px-4 py-3 text-sm text-valid">
              {feedback}
            </div>
          ) : null}

          {error ? (
            <div className="mb-6 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          ) : null}

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_360px]">
            <section className="glass-card p-6">
              <div className="mb-6 flex flex-col gap-4 border-b border-white/8 pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
                    Datos del certificado
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-text-muted)]">
                    Folio generado y trazabilidad del servicio emitido.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(certificate.folio);
                    setFeedback("Folio copiado al portapapeles.");
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan/20 bg-cyan/8 px-4 py-2 text-sm font-semibold text-cyan transition-colors hover:bg-cyan/12"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copiar Folio</span>
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                      Folio
                    </p>
                    <p className="mt-2 font-heading text-3xl font-bold text-cyan">
                      {certificate.folio}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-silver">
                      Empresa
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            company: event.target.value,
                          }))
                        }
                        className="contact-input"
                        required
                      />
                    ) : (
                      <p className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-white">
                        {certificate.company}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-silver">
                      Servicio
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.serviceType}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            serviceType: event.target.value,
                          }))
                        }
                        className="contact-input"
                        required
                      />
                    ) : (
                      <p className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-white">
                        {certificate.serviceType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-silver">
                      Producto
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={formData.chemicalUsed}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            chemicalUsed: event.target.value,
                          }))
                        }
                        className="contact-input"
                      />
                    ) : (
                      <p className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-white">
                        {certificate.chemicalUsed || "No especificado"}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-medium text-silver">
                      Fecha de Emisión
                    </p>
                    <p className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-white">
                      {new Date(certificate.issueDate).toLocaleDateString("es-MX")}
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-silver">
                      Vigencia
                    </label>
                    {editing ? (
                      <input
                        type="date"
                        value={formData.expirationDate}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            expirationDate: event.target.value,
                          }))
                        }
                        className="contact-input"
                        required
                      />
                    ) : (
                      <p className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-white">
                        {new Date(certificate.expirationDate).toLocaleDateString(
                          "es-MX"
                        )}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <p className="mb-2 text-sm font-medium text-silver">Estado</p>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${getStatusClasses(
                        certificate.status
                      )}`}
                    >
                      {certificate.statusLabel}
                    </span>
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-silver">
                      Notas
                    </label>
                    {editing ? (
                      <textarea
                        value={formData.notes}
                        onChange={(event) =>
                          setFormData((current) => ({
                            ...current,
                            notes: event.target.value,
                          }))
                        }
                        className="contact-input min-h-[130px] resize-y"
                      />
                    ) : (
                      <p className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-white">
                        {certificate.notes || "Sin notas registradas."}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row sm:justify-between">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {editing ? (
                      <button
                        type="submit"
                        disabled={saving}
                        className="btn-primary justify-center"
                      >
                        <Save className="h-4 w-4" />
                        <span>{saving ? "Guardando..." : "Guardar cambios"}</span>
                      </button>
                    ) : null}

                    {editing ? (
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(false);
                          setFormData({
                            company: certificate.company,
                            serviceType: certificate.serviceType,
                            chemicalUsed: certificate.chemicalUsed,
                            expirationDate: certificate.expirationDate.slice(0, 10),
                            notes: certificate.notes ?? "",
                          });
                          router.replace(
                            `/admin/certificados/${encodeURIComponent(
                              certificate.folio
                            )}`
                          );
                        }}
                        className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/30 hover:bg-cyan/10"
                      >
                        Cancelar
                      </button>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200 transition-colors hover:bg-red-500/15"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span>Eliminar</span>
                  </button>
                </div>
              </form>
            </section>

            <aside className="glass-card p-6">
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl border border-cyan/20 bg-cyan/10 p-3">
                  <QrCode className="h-5 w-5 text-cyan" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-white">
                    QR del certificado
                  </h2>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Validación pública y descarga inmediata.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white p-5 shadow-lg">
                <Image
                  src={qrSrc}
                  alt={`Código QR del certificado ${certificate.folio}`}
                  width={250}
                  height={250}
                  unoptimized
                  className="mx-auto h-[250px] w-[250px]"
                />
              </div>

              <p className="mt-4 text-center font-mono text-sm font-semibold text-white">
                {certificate.folio}
              </p>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleDownloadQr}
                  className="btn-primary w-full justify-center"
                >
                  <Download className="h-4 w-4" />
                  <span>Descargar QR</span>
                </button>
                <button
                  type="button"
                  onClick={handleRegenerateQr}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan/30 hover:bg-cyan/10"
                >
                  <RefreshCcw className="h-4 w-4" />
                  <span>Regenerar QR</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyPublicLink}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-cyan/30 bg-cyan/10 px-4 py-3 text-sm font-semibold text-cyan transition-colors hover:bg-cyan/15"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copiar Link Público</span>
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
