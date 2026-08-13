import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { getAboutContent, upsertAboutContent } from "@/lib/db/queries/about";
import { validateAboutContent } from "@/lib/validation/about";
import { getMediaById } from "@/lib/db/queries/media";

/**
 * GET /api/admin/about
 * Returns the About singleton content, with its image (if any) included.
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await getAboutContent();
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Failed to load about content:", error);
    return NextResponse.json({ error: "Failed to load about content" }, { status: 500 });
  }
}

/**
 * PUT /api/admin/about
 * Body: { badge, heading, headingAccent, paragraph1, paragraph2,
 *         bulletPoints, experienceYears, imageId }
 *
 * `imageId` may be null (no image) or the id of an existing MediaAsset
 * (picked via the existing MediaPickerModal — nothing is uploaded here).
 *
 * Note: this does NOT affect the public site yet — About.jsx still reads
 * the hardcoded values in lib/constants.js. Wiring the public About
 * section to this data is a separate, later step, same as Hero's content
 * fields (only Hero's images were wired to the public site so far).
 */
export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const bulletPoints = Array.isArray(body.bulletPoints)
    ? body.bulletPoints.map((b) => (b || "").trim()).filter(Boolean)
    : [];

  const { valid, errors } = validateAboutContent({ ...body, bulletPoints });
  if (!valid) {
    return NextResponse.json({ error: "Validation failed", fieldErrors: errors }, { status: 422 });
  }

  // imageId is optional — null/undefined means "no image selected".
  let imageId = null;
  if (body.imageId) {
    const media = await getMediaById(body.imageId);
    if (!media) {
      return NextResponse.json(
        { error: "Validation failed", fieldErrors: { imageId: "Selected media asset no longer exists." } },
        { status: 422 }
      );
    }
    if (media.resourceType !== "image") {
      return NextResponse.json(
        { error: "Validation failed", fieldErrors: { imageId: "About image must be an image, not a video." } },
        { status: 422 }
      );
    }
    imageId = media.id;
  }

  try {
    const updated = await upsertAboutContent({
      badge: body.badge.trim(),
      heading: body.heading.trim(),
      headingAccent: body.headingAccent.trim(),
      paragraph1: body.paragraph1.trim(),
      paragraph2: body.paragraph2.trim(),
      bulletPoints,
      experienceYears: body.experienceYears.trim(),
      imageId,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update about content:", error);
    return NextResponse.json({ error: "Failed to update about content" }, { status: 500 });
  }
}