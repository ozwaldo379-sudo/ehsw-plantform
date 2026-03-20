import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  normalizeFolio,
  getCertificateState,
  serializeCertificate,
} from "@/lib/certificates";
import { getAuthFromCookies } from "@/lib/auth";
import {
  generateCertificateQR,
  generateQrBase64,
  writeQrToLocalFile,
} from "@/lib/qr";
import fs from "node:fs/promises";
import path from "node:path";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ folio: string }> }
) {
  try {
    const { folio } = await params;
    const decodedFolio = normalizeFolio(folio);

    const certificate = await prisma.certificate.findFirst({
      where: {
        folio: { equals: decodedFolio, mode: "insensitive" },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificado no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(serializeCertificate(certificate));
  } catch (error) {
    console.error("Error fetching certificate:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ folio: string }> }
) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { folio } = await params;
    const currentFolio = normalizeFolio(folio);
    const body = await request.json();

    const existingCertificate = await prisma.certificate.findFirst({
      where: {
        folio: { equals: currentFolio, mode: "insensitive" },
      },
    });

    if (!existingCertificate) {
      return NextResponse.json(
        { error: "Certificado no encontrado" },
        { status: 404 }
      );
    }

    const nextCompany = String(body.company ?? existingCertificate.company).trim();
    const nextServiceType = String(
      body.serviceType ?? existingCertificate.serviceType
    ).trim();
    const nextChemicalUsed = String(
      body.chemicalUsed ?? existingCertificate.chemicalUsed
    ).trim();
    const nextAddress = body.address === undefined
      ? existingCertificate.address
      : String(body.address ?? "").trim() || null;
    const nextNotes = body.notes === undefined
      ? existingCertificate.notes
      : String(body.notes ?? "").trim() || null;
    const nextClientName =
      String(body.clientName ?? existingCertificate.clientName).trim() ||
      nextCompany;
    const nextExpirationDate = body.expirationDate
      ? new Date(body.expirationDate)
      : existingCertificate.expirationDate;

    if (Number.isNaN(nextExpirationDate.getTime())) {
      return NextResponse.json(
        { error: "La fecha de vigencia es inválida" },
        { status: 400 }
      );
    }

    const nextFolio = body.folio
      ? normalizeFolio(String(body.folio))
      : existingCertificate.folio;
    const qrCodeUrl = await generateCertificateQR(nextFolio);
    const qrBase64 =
      nextFolio !== existingCertificate.folio || body.regenerateQr
        ? await generateQrBase64(nextFolio, request.nextUrl.origin)
        : existingCertificate.qrBase64 ??
          (await generateQrBase64(nextFolio, request.nextUrl.origin));

    await writeQrToLocalFile(nextFolio, qrBase64);

    const certificate = await prisma.certificate.update({
      where: { folio: existingCertificate.folio },
      data: {
        folio: nextFolio,
        company: nextCompany,
        clientName: nextClientName,
        address: nextAddress,
        serviceType: nextServiceType,
        chemicalUsed: nextChemicalUsed || "NO ESPECIFICADO",
        expirationDate: nextExpirationDate,
        status: getCertificateState(nextExpirationDate),
        qrCodeUrl,
        qrBase64,
        notes: nextNotes,
      },
    });

    return NextResponse.json(serializeCertificate(certificate));
  } catch (error) {
    console.error("Error updating certificate:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ folio: string }> }
) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { folio } = await params;
    const decodedFolio = normalizeFolio(folio);
    const certificate = await prisma.certificate.findFirst({
      where: { folio: { equals: decodedFolio, mode: "insensitive" } },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificado no encontrado" },
        { status: 404 }
      );
    }

    await prisma.certificate.delete({
      where: { folio: certificate.folio },
    });

    if (process.env.NODE_ENV !== "production") {
      const localQrPath = path.join(
        process.cwd(),
        "public",
        "Images",
        "qrcodes",
        `${certificate.folio}.png`
      );

      await fs.unlink(localQrPath).catch(() => null);
    }

    return NextResponse.json({ message: "Certificado eliminado" });
  } catch (error) {
    console.error("Error deleting certificate:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
