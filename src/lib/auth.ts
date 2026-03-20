import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import {
  LEGACY_SESSION_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/session";

export interface SessionPayload {
  email: string;
  exp?: number;
  iat?: number;
}

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET no está configurado");
  }

  return secret;
}

export function getAdminEmailFromEnv() {
  return (
    process.env.ADMIN_EMAIL ??
    process.env.ADMIN_USERNAME ??
    "admin@ehsw2.com"
  )
    .trim()
    .toLowerCase();
}

export function getAdminPasswordFromEnv() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export async function verifyCredentials(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    return false;
  }

  return bcrypt.compare(password, user.password);
}

export function generateToken(email: string) {
  return jwt.sign({ email: email.trim().toLowerCase() }, getSessionSecret(), {
    expiresIn: SESSION_MAX_AGE,
  });
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    const payload = jwt.verify(token, getSessionSecret());

    if (typeof payload === "string") {
      return null;
    }

    const data = payload as JwtPayload & { email?: string };
    if (!data.email) {
      return null;
    }

    return {
      email: data.email,
      exp: data.exp,
      iat: data.iat,
    };
  } catch {
    return null;
  }
}

export async function getSessionTokenFromCookies() {
  const cookieStore = await cookies();

  return (
    cookieStore.get(SESSION_COOKIE_NAME)?.value ??
    cookieStore.get(LEGACY_SESSION_COOKIE_NAME)?.value ??
    null
  );
}

export async function getAuthFromCookies(): Promise<SessionPayload | null> {
  const token = await getSessionTokenFromCookies();

  if (!token) {
    return null;
  }

  return verifyToken(token);
}

export {
  LEGACY_SESSION_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
};
