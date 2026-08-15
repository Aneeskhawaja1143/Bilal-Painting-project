import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { getAboutContent, upsertAboutContent } from "@/lib/db/queries/about";
import { validateAboutContent } from "@/lib/validation/about";
import { getMediaById } from "@/lib/db/queries/media";
import { revalidatePath } from "next/cache";

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
 * About is fully wired to the public homepage (components/About.jsx reads
 * this data directly). revalidatePath('/') below is the fix for the
 * reported bug: without it, a successful DB write here was never
 * reflected on the statically-cached public page until the next deploy.
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
    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update about content:", error);
    return NextResponse.json({ error: "Failed to update about content" }, { status: 500 });
  }
}