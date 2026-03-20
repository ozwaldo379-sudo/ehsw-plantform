import { NextRequest, NextResponse } from "next/server";
import {
  LEGACY_SESSION_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
  generateToken,
  verifyCredentials,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Credenciales requeridas" },
        { status: 400 }
      );
    }

    const valid = await verifyCredentials(email, password);

    if (!valid) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const token = generateToken(normalizedEmail);
    const response = NextResponse.json({
      success: true,
      email: normalizedEmail,
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
    response.cookies.delete(LEGACY_SESSION_COOKIE_NAME);

    return response;
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
