import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, interest, message } = body;

        if (!name || !email || !interest) {
            return NextResponse.json(
                { error: "Campos requeridos: nombre, correo e interés." },
                { status: 400 }
            );
        }

        // Log the contact submission (always captured for debugging)
        console.log("[Contact Form Submission]", {
            name,
            email,
            interest,
            message,
            timestamp: new Date().toISOString(),
        });

        // --- Optional: Forward via email using Resend ---
        // If you have RESEND_API_KEY in .env.local, this block will send an email.
        const resendKey = process.env.RESEND_API_KEY;
        if (resendKey) {
            try {
                const res = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${resendKey}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        from: "EHS-W Contacto <no-reply@ehsw2.com>",
                        to: ["contacto@ehsw2.com"],
                        subject: `[EHS-W] Nuevo contacto: ${interest}`,
                        html: `
                            <h2>Nuevo mensaje desde el sitio web</h2>
                            <table>
                                <tr><td><strong>Nombre:</strong></td><td>${name}</td></tr>
                                <tr><td><strong>Correo:</strong></td><td>${email}</td></tr>
                                <tr><td><strong>Interés:</strong></td><td>${interest}</td></tr>
                                <tr><td><strong>Mensaje:</strong></td><td>${message || "—"}</td></tr>
                            </table>
                        `,
                    }),
                });

                if (!res.ok) {
                    const err = await res.text();
                    console.error("[Resend] Failed to send email:", err);
                }
            } catch (emailErr) {
                // Non-fatal: still return success to the user
                console.error("[Resend] Exception:", emailErr);
            }
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        console.error("Error processing contact form:", error);
        return NextResponse.json(
            { error: "Error interno del servidor." },
            { status: 500 }
        );
    }
}
