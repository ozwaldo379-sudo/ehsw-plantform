import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ folio: string }> }
) {
    try {
        const { folio } = await params;
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        const verificationUrl = `${siteUrl}/certificado/${encodeURIComponent(folio)}`;

        const qrDataUrl = await QRCode.toDataURL(verificationUrl, {
            width: 400,
            margin: 2,
            color: {
                dark: "#0f172a",
                light: "#ffffff",
            },
        });

        // Convert data URL to buffer
        const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, max-age=31536000",
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
