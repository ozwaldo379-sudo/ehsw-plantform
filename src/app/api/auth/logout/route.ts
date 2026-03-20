import { NextResponse } from "next/server";
import {
  LEGACY_SESSION_COOKIE_NAME,
  SESSION_COOKIE_NAME,
} from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.delete(SESSION_COOKIE_NAME);
  response.cookies.delete(LEGACY_SESSION_COOKIE_NAME);

  return response;
}
