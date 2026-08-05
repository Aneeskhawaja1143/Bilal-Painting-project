import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

/**
 * Protects the admin dashboard and its API routes.
 *
 * - /admin/login stays public (otherwise nobody could ever log in).
 * - Everything else under /admin/* requires a valid NextAuth session.
 * - Everything under /api/admin/* (added in later phases) requires the
 *   same, and gets a 401 JSON response instead of a redirect, since it's
 *   an API surface rather than a page.
 *
 * This runs on the Edge runtime, so it checks the signed JWT cookie only —
 * it never queries Postgres. The public marketing pages are untouched by
 * this file; the matcher below scopes it strictly to /admin and /api/admin.
 */
export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Always allow the login page and its own API calls through.
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) {
    return NextResponse.next();
  }

  // Unauthenticated API calls get a 401, not a redirect.
  if (pathname.startsWith("/api/admin")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Unauthenticated page visits get sent to the login page, preserving
  // where they were trying to go so we can send them back after login.
  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("callbackUrl", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
