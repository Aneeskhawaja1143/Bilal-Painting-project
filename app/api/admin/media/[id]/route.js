import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import {
  getMediaById,
  updateMediaMetadata,
  getMediaUsage,
  deleteMediaRecord,
} from "@/lib/db/queries/media";
import { deleteCloudinaryAsset } from "@/lib/cloudinary/deleteAsset";

/**
 * GET /api/admin/media/[id]
 * Returns the asset plus which content sections (if any) currently use it.
 */
export async function GET(_request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const asset = await getMediaById(params.id);
  if (!asset) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const usage = await getMediaUsage(params.id);

  return NextResponse.json({ ...asset, usage });
}

/**
 * PATCH /api/admin/media/[id]
 * Body: { altText?: string, tags?: string[] }
 * Only alt text and tags are editable — everything else about an asset is
 * fixed once uploaded.
 */
export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const asset = await getMediaById(params.id);
  if (!asset) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => ({}));

  try {
    const updated = await updateMediaMetadata(params.id, {
      altText: typeof body.altText === "string" ? body.altText : undefined,
      tags: Array.isArray(body.tags) ? body.tags : undefined,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update media:", error);
    return NextResponse.json({ error: "Failed to update media" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/media/[id]
 * Refuses to delete an asset that's currently referenced by any content
 * table (Hero, About, Portfolio, etc.) — pass ?force=true to override,
 * which the UI only offers after an explicit confirmation.
 */
export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const asset = await getMediaById(params.id);
  if (!asset) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const force = searchParams.get("force") === "true";

  const usage = await getMediaUsage(params.id);
  if (usage?.inUse && !force) {
    return NextResponse.json(
      {
        error: "Asset is in use and cannot be deleted",
        usage: usage.usages,
      },
      { status: 409 }
    );
  }

  try {
    await deleteCloudinaryAsset(asset.cloudinaryPublicId, asset.resourceType);
    await deleteMediaRecord(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete media:", error);
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 });
  }
}
