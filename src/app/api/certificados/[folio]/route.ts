import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromCookies } from "@/lib/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ folio: string }> }
) {
    try {
        const { folio } = await params;
        const decodedFolio = decodeURIComponent(folio).toUpperCase();

        const certificate = await prisma.certificate.findUnique({
            where: { folio: decodedFolio },
        });

        if (!certificate) {
            return NextResponse.json(
                { error: "Certificado no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json(certificate);
    } catch (error) {
        console.error("Error fetching certificate:", error);
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
        const decodedFolio = decodeURIComponent(folio).toUpperCase();

        await prisma.certificate.delete({
            where: { folio: decodedFolio },
        });

        return NextResponse.json({ message: "Certificado eliminado" });
    } catch (error) {
        console.error("Error deleting certificate:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
