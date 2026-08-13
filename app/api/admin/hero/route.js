import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { getHeroContent, upsertHeroContent, getHeroImages } from "@/lib/db/queries/hero";
import { validateHeroContent } from "@/lib/validation/hero";

/**
 * GET /api/admin/hero
 * Returns the Hero singleton content plus its ordered images.
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [content, images] = await Promise.all([getHeroContent(), getHeroImages()]);
    return NextResponse.json({ content, images });
  } catch (error) {
    console.error("Failed to load hero content:", error);
    return NextResponse.json({ error: "Failed to load hero content" }, { status: 500 });
  }
}

/**
 * PUT /api/admin/hero
 * Body: { badge, headingAccent, headingMain, description, trustBadges }
 * Updates (or creates, if somehow missing) the Hero singleton row.
 *
 * Note: this does NOT affect the public site yet — app/page.js still reads
 * the hardcoded values in lib/constants.js / Hero.jsx. Wiring the public
 * homepage to this data is a separate, later step (per Phase 3 scope:
 * "do not replace any hardcoded frontend content yet").
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

  const trustBadges = Array.isArray(body.trustBadges)
    ? body.trustBadges.map((b) => (b || "").trim()).filter(Boolean)
    : [];

  const { valid, errors } = validateHeroContent({ ...body, trustBadges });
  if (!valid) {
    return NextResponse.json({ error: "Validation failed", fieldErrors: errors }, { status: 422 });
  }

  try {
    const updated = await upsertHeroContent({
      badge: body.badge.trim(),
      headingAccent: body.headingAccent.trim(),
      headingMain: body.headingMain.trim(),
      description: body.description.trim(),
      trustBadges,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update hero content:", error);
    return NextResponse.json({ error: "Failed to update hero content" }, { status: 500 });
  }
}