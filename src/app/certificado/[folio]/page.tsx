import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  FlaskConical,
  Hash,
  ShieldX,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import {
  getCertificateState,
  getCertificateStateLabel,
  normalizeFolio,
} from "@/lib/certificates";

export const dynamic = "force-dynamic";

async function getCertificate(rawFolio: string) {
  const folio = normalizeFolio(rawFolio);

  return prisma.certificate.findFirst({
    where: {
      folio: { equals: folio, mode: "insensitive" },
    },
  });
}

function getStateConfig(status: "VALID" | "EXPIRING" | "EXPIRED") {
  switch (status) {
    case "EXPIRED":
      return {
        title: "CERTIFICADO VENCIDO",
        description:
          "El certificado es auténtico, pero su vigencia ya concluyó.",
        classes: "border-red-500/25 bg-red-500/10 text-red-200",
        icon: AlertTriangle,
      };
    case "EXPIRING":
      return {
        title: "CERTIFICADO VÁLIDO",
        description:
          "El certificado es auténtico y se encuentra próximo a vencer.",
        classes: "border-amber-500/25 bg-amber-500/10 text-amber-200",
        icon: AlertTriangle,
      };
    default:
      return {
        title: "CERTIFICADO VÁLIDO",
        description:
          "El certificado es auténtico y se encuentra vigente.",
        classes: "border-valid/25 bg-valid/10 text-valid",
        icon: CheckCircle2,
      };
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ folio: string }>;
}): Promise<Metadata> {
  const { folio } = await params;
  const normalizedFolio = normalizeFolio(folio);

  return {
    title: `Certificado ${normalizedFolio} | EHSW²`,
    description: `Validación pública del certificado ${normalizedFolio} emitido por EHSW².`,
  };
}

export default async function PublicCertificatePage({
  params,
}: {
  params: Promise<{ folio: string }>;
}) {
  const { folio } = await params;
  const normalizedFolio = normalizeFolio(folio);
  const certificate = await getCertificate(folio);

  if (!certificate) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl text-center">
          <Link href="/" className="mb-8 inline-flex items-center justify-center">
            <Image
              src="/logo-ehsw2-white-transparent.png"
              alt="Logo EHSW²"
              width={220}
              height={72}
              className="h-14 w-auto"
              priority
            />
          </Link>

          <div className="glass-card overflow-hidden">
            <div className="border-b border-red-500/20 bg-red-500/10 px-6 py-8">
              <ShieldX className="mx-auto h-12 w-12 text-red-300" />
              <h1 className="mt-4 font-heading text-3xl font-bold text-white">
                Certificado no encontrado
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                No existe un certificado con el folio{" "}
                <span className="font-mono text-white">{normalizedFolio}</span> en
                nuestro sistema.
              </p>
            </div>

            <div className="px-6 py-8">
              <p className="text-sm text-[var(--color-text-muted)]">
                Verifique el número e intente nuevamente desde el módulo de
                validación pública.
              </p>
              <Link href="/#certificados" className="btn-primary mt-6 justify-center">
                <ArrowLeft className="h-4 w-4" />
                <span>Volver al inicio</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const status = getCertificateState(certificate.expirationDate);
  const state = getStateConfig(status);
  const StateIcon = state.icon;

  const details = [
    {
      label: "Folio",
      value: certificate.folio,
      icon: Hash,
    },
    {
      label: "Empresa",
      value: certificate.company,
      icon: Building2,
    },
    {
      label: "Servicio",
      value: certificate.serviceType,
      icon: Building2,
    },
    {
      label: "Producto",
      value: certificate.chemicalUsed || "No especificado",
      icon: FlaskConical,
    },
    {
      label: "Fecha de Emisión",
      value: new Date(certificate.issueDate).toLocaleDateString("es-MX"),
      icon: CalendarDays,
    },
    {
      label: "Vigencia",
      value: new Date(certificate.expirationDate).toLocaleDateString("es-MX"),
      icon: CalendarDays,
    },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center justify-center">
            <Image
              src="/logo-ehsw2.png"
              alt="Logo EHSW²"
              width={220}
              height={72}
              className="h-14 w-auto"
              priority
            />
          </Link>
        </div>

        <div className="glass-card overflow-hidden">
          <div className={`border-b px-6 py-8 text-center ${state.classes}`}>
            <StateIcon className="mx-auto h-12 w-12" />
            <h1 className="mt-4 font-heading text-3xl font-bold text-white">
              {state.title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-silver">
              {state.description}
            </p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-silver">
              Estado actual: {getCertificateStateLabel(status)}
            </p>
          </div>

          <div className="space-y-6 px-6 py-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {details.map((detail) => {
                const Icon = detail.icon;

                return (
                  <div
                    key={detail.label}
                    className="rounded-2xl border border-white/8 bg-white/4 p-4"
                  >
                    <div className="mb-3 flex items-center gap-2 text-cyan">
                      <Icon className="h-4 w-4" />
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
                        {detail.label}
                      </p>
                    </div>
                    <p className="break-words text-sm font-medium text-white">
                      {detail.value}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/4 p-6 text-center">
              <div className="mx-auto inline-flex rounded-2xl bg-white p-4 shadow-lg">
                <Image
                  src={`/api/qr/${encodeURIComponent(certificate.folio)}`}
                  alt={`Código QR del certificado ${certificate.folio}`}
                  width={180}
                  height={180}
                  unoptimized
                  className="h-[180px] w-[180px]"
                />
              </div>
              <p className="mt-4 font-mono text-sm font-semibold text-white">
                {certificate.folio}
              </p>
            </div>
          </div>

          <div className="border-t border-white/8 bg-white/3 px-6 py-6 text-center">
            <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
              Este certificado fue emitido por EHSW² y puede ser verificado en{" "}
              <span className="font-semibold text-white">
                ehsw-plantform.vercel.app
              </span>
              .
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan no-underline hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al inicio</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
