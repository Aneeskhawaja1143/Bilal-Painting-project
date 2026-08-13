import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { listContactMessages } from "@/lib/db/queries/contactMessages";

/**
 * GET /api/admin/contact-messages?page=1&pageSize=20&search=&status=all
 * Lists contact messages for the admin inbox. Protected by middleware.js
 * (matches /api/admin/*) and re-checked here explicitly, same
 * defense-in-depth pattern used by every other admin API route in this app.
 */
export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
  const pageSize = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10) || 20)
  );
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";

  try {
    const result = await listContactMessages({ page, pageSize, search, status });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to list contact messages:", error);
    return NextResponse.json({ error: "Failed to list contact messages" }, { status: 500 });
  }
}