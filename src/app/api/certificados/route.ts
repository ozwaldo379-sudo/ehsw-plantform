import { NextRequest, NextResponse } from "next/server";
import type { Certificate } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getCertificateState, getStatusFilter, serializeCertificate } from "@/lib/certificates";
import { generateFolio } from "@/lib/folio";
import { getAuthFromCookies } from "@/lib/auth";
import {
  generateCertificateQR,
  generateQrBase64,
  writeQrToLocalFile,
} from "@/lib/qr";

export async function GET(request: NextRequest) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim() ?? "";
    const estado = searchParams.get("estado");
    const page = Math.max(Number(searchParams.get("page") ?? "1"), 1);
    const pageSize = Math.min(
      Math.max(Number(searchParams.get("pageSize") ?? "20"), 1),
      100
    );
    const skip = (page - 1) * pageSize;

    const where = {
      ...getStatusFilter(estado),
      ...(search
        ? {
            OR: [
              { folio: { contains: search, mode: "insensitive" as const } },
              { company: { contains: search, mode: "insensitive" as const } },
              { clientName: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [certificates, total] = await Promise.all([
      prisma.certificate.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.certificate.count({ where }),
    ]);

    return NextResponse.json({
      certificados: certificates.map((certificate: Certificate) =>
        serializeCertificate(certificate)
      ),
      total,
      page,
      pageSize,
    });
  } catch (error) {
    console.error("Error listing certificates:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const auth = await getAuthFromCookies();
    if (!auth) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const company = String(body.company ?? "").trim();
    const serviceType = String(body.serviceType ?? "").trim();
    const chemicalUsed = String(body.chemicalUsed ?? "").trim();
    const expirationDateRaw = String(body.expirationDate ?? "").trim();
    const notes = String(body.notes ?? "").trim();
    const address = String(body.address ?? "").trim();
    const clientName = String(body.clientName ?? company).trim() || company;

    if (!company || !serviceType || !expirationDateRaw) {
      return NextResponse.json(
        {
          error:
            "Campos requeridos: company, serviceType y expirationDate",
        },
        { status: 400 }
      );
    }

    const expirationDate = new Date(expirationDateRaw);
    if (Number.isNaN(expirationDate.getTime())) {
      return NextResponse.json(
        { error: "La fecha de vigencia es inválida" },
        { status: 400 }
      );
    }

    const issueDate = new Date();
    const folio = await generateFolio(serviceType);
    const qrCodeUrl = await generateCertificateQR(folio);
    const qrBase64 = await generateQrBase64(folio, request.nextUrl.origin);
    await writeQrToLocalFile(folio, qrBase64);

    const certificate = await prisma.certificate.create({
      data: {
        folio,
        clientName,
        company,
        address: address || null,
        serviceType,
        chemicalUsed: chemicalUsed || "NO ESPECIFICADO",
        issueDate,
        expirationDate,
        status: getCertificateState(expirationDate, issueDate),
        qrCodeUrl,
        qrBase64,
        notes: notes || null,
      },
    });

    return NextResponse.json(serializeCertificate(certificate), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating certificate:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
