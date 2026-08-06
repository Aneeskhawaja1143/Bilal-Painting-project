import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { createSignedUploadPayload } from "@/lib/cloudinary/signUpload";
import { MEDIA_FOLDERS } from "@/lib/cloudinary/constants";

/**
 * POST /api/admin/media/sign
 * Body: { folder?: string }
 *
 * Returns a signed payload the browser uses to upload directly to
 * Cloudinary. `middleware.js` already blocks unauthenticated requests to
 * /api/admin/*, but this route re-checks the session explicitly — the
 * same defense-in-depth pattern used in the admin dashboard layout,
 * since this route hands out a (short-lived, scoped) signature and
 * deserves an explicit check of its own.
 */
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const folder = MEDIA_FOLDERS.includes(body.folder) ? body.folder : "general";

  const payload = createSignedUploadPayload({ folder });

  return NextResponse.json(payload);
}
