import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizeFolio } from "@/lib/certificates";
import {
  generateQrBase64,
  writeQrToLocalFile,
} from "@/lib/qr";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ folio: string }> }
) {
  try {
    const { folio } = await params;
    const normalizedFolio = normalizeFolio(folio);
    const shouldRegenerate =
      request.nextUrl.searchParams.get("regenerate") === "true";

    const certificate = await prisma.certificate.findFirst({
      where: {
        folio: { equals: normalizedFolio, mode: "insensitive" },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificado no encontrado" },
        { status: 404 }
      );
    }

    let qrBase64 = certificate.qrBase64;

    if (!qrBase64 || shouldRegenerate) {
      qrBase64 = await generateQrBase64(certificate.folio, request.nextUrl.origin);

      await prisma.certificate.update({
        where: { folio: certificate.folio },
        data: {
          qrBase64,
          qrCodeUrl: `/api/qr/${encodeURIComponent(certificate.folio)}`,
        },
      });
    }

    await writeQrToLocalFile(certificate.folio, qrBase64);

    return new NextResponse(Buffer.from(qrBase64, "base64"), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": shouldRegenerate
          ? "no-store"
          : "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("QR generation error:", error);
    return NextResponse.json(
      { error: "Error generando QR" },
      { status: 500 }
    );
  }
}
