import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { addHeroImage } from "@/lib/db/queries/hero";
import { validateHeroImage } from "@/lib/validation/hero";
import { getMediaById } from "@/lib/db/queries/media";

/**
 * POST /api/admin/hero/images
 * Body: { mediaId: string, altText: string }
 *
 * Attaches an existing MediaAsset (already uploaded via the Media Library
 * / MediaPickerModal in Phase 2) as a new HeroImage, appended to the end
 * of the current order. Nothing is uploaded here — this route only links
 * an asset that already exists.
 */
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { valid, errors } = validateHeroImage(body);
  if (!valid) {
    return NextResponse.json({ error: "Validation failed", fieldErrors: errors }, { status: 422 });
  }

  const media = await getMediaById(body.mediaId);
  if (!media) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: { mediaId: "Selected media asset no longer exists." } },
      { status: 422 }
    );
  }
  if (media.resourceType !== "image") {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: { mediaId: "Hero images must be an image, not a video." } },
      { status: 422 }
    );
  }

  try {
    const heroImage = await addHeroImage({
      mediaId: body.mediaId,
      altText: body.altText.trim(),
    });
    return NextResponse.json(heroImage, { status: 201 });
  } catch (error) {
    console.error("Failed to add hero image:", error);
    return NextResponse.json({ error: "Failed to add hero image" }, { status: 500 });
  }
}