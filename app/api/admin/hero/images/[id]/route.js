import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { updateHeroImage, deleteHeroImage } from "@/lib/db/queries/hero";

/**
 * PATCH /api/admin/hero/images/[id]
 * Body: { altText: string }
 */
export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const altText = (body.altText || "").trim();

  if (!altText) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: { altText: "Alt text is required." } },
      { status: 422 }
    );
  }
  if (altText.length > 200) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: { altText: "Alt text must be 200 characters or fewer." } },
      { status: 422 }
    );
  }

  try {
    const updated = await updateHeroImage(params.id, { altText });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update hero image:", error);
    return NextResponse.json({ error: "Failed to update hero image" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/hero/images/[id]
 * Removes this image from the Hero section. This only deletes the
 * HeroImage join row — the underlying MediaAsset (and the file on
 * Cloudinary) is untouched, since it may be reused elsewhere.
 */
export async function DELETE(_request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await deleteHeroImage(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete hero image:", error);
    return NextResponse.json({ error: "Failed to delete hero image" }, { status: 500 });
  }
}