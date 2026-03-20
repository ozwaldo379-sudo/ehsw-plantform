import type { Certificate } from "@prisma/client";

export type CertificateState = "VALID" | "EXPIRING" | "EXPIRED";
export interface SerializedCertificate extends Omit<Certificate, "issueDate" | "expirationDate" | "createdAt"> {
  issueDate: string;
  expirationDate: string;
  createdAt: string;
  status: CertificateState;
  statusLabel: string;
  product: string;
}

const EXPIRING_WINDOW_DAYS = 30;

export function normalizeFolio(value: string): string {
  return decodeURIComponent(value).trim().toUpperCase();
}

export function getExpiringThreshold(now = new Date()): Date {
  const threshold = new Date(now);
  threshold.setHours(0, 0, 0, 0);
  threshold.setDate(threshold.getDate() + EXPIRING_WINDOW_DAYS);
  return threshold;
}

export function getCertificateState(
  expirationDate: Date | string,
  now = new Date()
): CertificateState {
  const expiration =
    expirationDate instanceof Date ? expirationDate : new Date(expirationDate);
  const current = new Date(now);
  current.setHours(0, 0, 0, 0);

  if (expiration < current) return "EXPIRED";
  if (expiration <= getExpiringThreshold(current)) return "EXPIRING";
  return "VALID";
}

export function getCertificateStateLabel(state: CertificateState): string {
  switch (state) {
    case "EXPIRING":
      return "Por vencer";
    case "EXPIRED":
      return "Vencido";
    default:
      return "Vigente";
  }
}

export function getCertificatePublicUrl(folio: string): string {
  return `/certificado/${encodeURIComponent(normalizeFolio(folio))}`;
}

export function serializeCertificate(certificate: Certificate, now = new Date()) {
  const state = getCertificateState(certificate.expirationDate, now);

  return {
    ...certificate,
    issueDate: certificate.issueDate.toISOString(),
    expirationDate: certificate.expirationDate.toISOString(),
    createdAt: certificate.createdAt.toISOString(),
    status: state,
    statusLabel: getCertificateStateLabel(state),
    product: certificate.chemicalUsed,
    notes: certificate.notes,
    qrCodeUrl:
      certificate.qrCodeUrl ??
      `/api/qr/${encodeURIComponent(normalizeFolio(certificate.folio))}`,
  };
}

export function getStatusFilter(estado: string | null, now = new Date()) {
  const current = new Date(now);
  current.setHours(0, 0, 0, 0);
  const threshold = getExpiringThreshold(current);

  switch (estado) {
    case "vigente":
      return { expirationDate: { gt: threshold } };
    case "por_vencer":
      return { expirationDate: { gte: current, lte: threshold } };
    case "vencido":
      return { expirationDate: { lt: current } };
    default:
      return {};
  }
}
