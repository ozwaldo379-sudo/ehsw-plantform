import fs from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";

function normalizeFolio(folio: string) {
  return decodeURIComponent(folio).trim().toUpperCase();
}

export function getSiteUrl(origin?: string) {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    origin?.replace(/\/$/, "") ??
    "https://ehsw-plantform.vercel.app"
  );
}

export function getCertificatePublicUrl(folio: string, origin?: string) {
  return `${getSiteUrl(origin)}/certificado/${encodeURIComponent(
    normalizeFolio(folio)
  )}`;
}

export function getCertificateQrRoute(folio: string) {
  return `/api/qr/${encodeURIComponent(normalizeFolio(folio))}`;
}

export async function generateCertificateQR(folio: string) {
  return getCertificateQrRoute(folio);
}

export async function generateQrBase64(
  folio: string,
  origin?: string
): Promise<string> {
  const dataUrl = await QRCode.toDataURL(getCertificatePublicUrl(folio, origin), {
    width: 400,
    margin: 2,
    color: {
      dark: "#0D1F2D",
      light: "#FFFFFF",
    },
  });

  return dataUrl.replace(/^data:image\/png;base64,/, "");
}

export function getQrDataUrl(base64: string) {
  return `data:image/png;base64,${base64}`;
}

export async function writeQrToLocalFile(folio: string, base64: string) {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  const directory = path.join(process.cwd(), "public", "Images", "qrcodes");
  const filePath = path.join(directory, `${normalizeFolio(folio)}.png`);

  await fs.mkdir(directory, { recursive: true });
  await fs.writeFile(filePath, Buffer.from(base64, "base64"));

  return `/Images/qrcodes/${encodeURIComponent(normalizeFolio(folio))}.png`;
}
