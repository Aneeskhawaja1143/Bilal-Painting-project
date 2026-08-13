import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { listMedia, createMedia } from "@/lib/db/queries/media";
import { MEDIA_FOLDERS } from "@/lib/cloudinary/constants";

/**
 * GET /api/admin/media?page=1&pageSize=24&search=&resourceType=all&folder=all
 * Lists media assets for the Media Library grid.
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
    Math.max(1, parseInt(searchParams.get("pageSize") || "24", 10) || 24)
  );
  const search = searchParams.get("search") || "";
  const resourceType = searchParams.get("resourceType") || "all";
  const folder = searchParams.get("folder") || "all";

  try {
    const result = await listMedia({ page, pageSize, search, resourceType, folder });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to list media:", error);
    return NextResponse.json({ error: "Failed to list media" }, { status: 500 });
  }
}

/**
 * POST /api/admin/media
 * Body: the Cloudinary upload response (public_id, secure_url, resource_type,
 * width, height, format, bytes, original_filename) plus our own folder/altText/tags.
 *
 * The actual file bytes never pass through this route — the browser has
 * already uploaded directly to Cloudinary by the time this is called. This
 * route only persists the resulting metadata as a MediaAsset row.
 */
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || !body.public_id || !body.secure_url) {
    return NextResponse.json(
      { error: "Missing required Cloudinary upload fields" },
      { status: 400 }
    );
  }

  const resourceType = body.resource_type === "video" ? "video" : "image";
  const folder = MEDIA_FOLDERS.includes(body.folder) ? body.folder : "general";

  try {
    const asset = await createMedia({
      cloudinaryPublicId: body.public_id,
      url: body.secure_url,
      resourceType,
      width: body.width ?? null,
      height: body.height ?? null,
      format: body.format ?? null,
      bytes: body.bytes ?? null,
      filename: body.original_filename ?? null,
      folder,
      altText: body.altText || null,
      tags: Array.isArray(body.tags) ? body.tags : [],
    });

    return NextResponse.json(asset, { status: 201 });
  } catch (error) {
    console.error("Failed to save media record:", error);
    return NextResponse.json({ error: "Failed to save media record" }, { status: 500 });
  }
}
