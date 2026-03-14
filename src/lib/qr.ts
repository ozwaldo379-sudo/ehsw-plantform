/**
 * Returns the serverless-compatible QR code URL for a certificate.
 * QR images are generated on-demand by the /api/qr/[folio] route.
 */
export async function generateCertificateQR(folio: string): Promise<string> {
    return `/api/qr/${encodeURIComponent(folio)}`;
}
