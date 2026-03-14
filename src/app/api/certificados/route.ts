import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateFolio } from "@/lib/folio";
import { getAuthFromCookies } from "@/lib/auth";
import { generateCertificateQR } from "@/lib/qr";

export async function GET(request: NextRequest) {
    try {
        const auth = await getAuthFromCookies();
        if (!auth) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";

        const certificates = await prisma.certificate.findMany({
            where: {
                OR: [
                    { folio: { contains: search } },
                    { clientName: { contains: search } },
                    { company: { contains: search } },
                ],
            },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(certificates);
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
        const { clientName, company, serviceType, chemicalUsed, issueDate, expirationDate } = body;

        if (!clientName || !company || !serviceType || !chemicalUsed || !issueDate || !expirationDate) {
            return NextResponse.json(
                { error: "Campos requeridos: clientName, company, serviceType, chemicalUsed, issueDate, expirationDate" },
                { status: 400 }
            );
        }

        const folio = await generateFolio(serviceType);
        const qrCodeUrl = await generateCertificateQR(folio);
        const status = new Date(expirationDate) > new Date() ? "VALID" : "EXPIRED";

        const certificate = await prisma.certificate.create({
            data: {
                folio,
                clientName,
                company,
                serviceType,
                chemicalUsed,
                issueDate: new Date(issueDate),
                expirationDate: new Date(expirationDate),
                qrCodeUrl,
                status
            },
        });

        return NextResponse.json(certificate, { status: 201 });
    } catch (error) {
        console.error("Error creating certificate:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
