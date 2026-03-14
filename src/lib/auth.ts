import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";
import { prisma } from "./prisma";

export async function verifyCredentials(
    email: string,
    password: string
): Promise<boolean> {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) return false;
    return bcrypt.compare(password, user.password);
}

export function generateToken(email: string): string {
    return jwt.sign({ email, role: "admin" }, JWT_SECRET, {
        expiresIn: "8h",
    });
}

export function verifyToken(token: string): { email: string; role: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { email: string; role: string };
    } catch {
        return null;
    }
}

export async function getAuthFromCookies(): Promise<{
    email: string;
    role: string;
} | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return null;
    return verifyToken(token);
}
