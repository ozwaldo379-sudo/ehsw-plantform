"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";

const SERVICE_OPTIONS = [
  "Control de Plagas",
  "Extintores",
  "Seguridad Industrial",
  "Gestión Ambiental",
  "Protección Civil",
  "Desinfección",
];

function getTomorrowDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

export default function NewCertificatePage() {
  const router = useRouter();
  const minDate = useMemo(() => getTomorrowDate(), []);
  const [formData, setFormData] = useState({
    company: "",
    serviceType: SERVICE_OPTIONS[0],
    chemicalUsed: "",
    expirationDate: minDate,
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/certificados", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se pudo crear el certificado");
      }

      router.push(
        `/admin/certificados/${encodeURIComponent(data.folio)}?created=1`
      );
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Ocurrió un error al crear el certificado"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AdminSidebar />

      <main className="flex-1 px-5 py-6 sm:px-6 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Link
              href="/admin/certificados"
              className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan no-underline hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver a certificados</span>
            </Link>
            <p className="section-label mb-3">Nuevo Registro</p>
            <h1 className="font-heading text-3xl font-bold text-white">
              Crear Certificado
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">
              Capture la información operativa. El folio se genera de forma
              automática y el código QR se crea al guardar.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-silver">
                  Empresa*
                </label>
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
                  placeholder="CLIENTE DEMO S.A. DE C.V."
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-silver">
                  Servicio*
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      serviceType: event.target.value,
                    }))
                  }
                  className="contact-input"
                  required
                >
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-silver">
                  Vigencia*
                </label>
                <input
                  type="date"
                  value={formData.expirationDate}
                  min={minDate}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      expirationDate: event.target.value,
                    }))
                  }
                  className="contact-input"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-silver">
                  Producto
                </label>
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
                  placeholder="Producto químico, recarga, capacitación o descripción operativa"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-silver">
                  Notas
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      notes: event.target.value,
                    }))
                  }
                  className="contact-input min-h-[140px] resize-y"
                  placeholder="Observaciones internas o datos adicionales del servicio"
                />
              </div>
            </div>

            {error ? (
              <div className="mt-6 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 border-t border-white/8 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/admin/certificados"
                className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white no-underline transition-colors hover:border-cyan/30 hover:bg-cyan/10"
              >
                Cancelar
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary justify-center"
              >
                <Save className="h-4 w-4" />
                <span>{loading ? "Creando..." : "Crear Certificado"}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
