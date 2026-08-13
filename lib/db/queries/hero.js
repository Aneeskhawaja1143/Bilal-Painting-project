import { prisma } from "@/lib/db/prisma";

/**
 * HeroContent is a singleton — there's only ever one row, matching how the
 * public Hero component reads it (one badge/heading/description for the
 * whole homepage). HeroImage rows aren't linked to HeroContent by a
 * foreign key in the current schema (the seeded data assumes exactly one
 * HeroContent row exists), so "all HeroImage rows" IS "this hero's images."
 * This mirrors the schema exactly as it shipped in Phase 1 — no schema
 * change in this phase.
 */

export async function getHeroContent() {
  return prisma.heroContent.findFirst();
}

/**
 * Creates the singleton row if none exists yet (defensive — the seed
 * script already creates one, but this keeps the admin usable even
 * against a fresh/unseeded database), otherwise updates the existing row.
 */
export async function upsertHeroContent(data) {
  const existing = await prisma.heroContent.findFirst();

  if (existing) {
    return prisma.heroContent.update({
      where: { id: existing.id },
      data,
    });
  }

  return prisma.heroContent.create({ data });
}

export async function getHeroImages() {
  return prisma.heroImage.findMany({
    orderBy: { order: "asc" },
    include: { media: true },
  });
}

export async function addHeroImage({ mediaId, altText }) {
  const last = await prisma.heroImage.findFirst({ orderBy: { order: "desc" } });
  const nextOrder = last ? last.order + 1 : 0;

  return prisma.heroImage.create({
    data: { mediaId, altText, order: nextOrder },
    include: { media: true },
  });
}

export async function updateHeroImage(id, { altText }) {
  return prisma.heroImage.update({
    where: { id },
    data: { altText },
    include: { media: true },
  });
}

export async function deleteHeroImage(id) {
  return prisma.heroImage.delete({ where: { id } });
}

/**
 * Swaps the `order` value of two adjacent hero images — used by the
 * admin's move up/down controls. Runs as a transaction so the ordering
 * can never end up half-applied.
 */
export async function swapHeroImageOrder(imageIdA, imageIdB) {
  const [imageA, imageB] = await Promise.all([
    prisma.heroImage.findUnique({ where: { id: imageIdA } }),
    prisma.heroImage.findUnique({ where: { id: imageIdB } }),
  ]);

  if (!imageA || !imageB) {
    throw new Error("One or both hero images not found.");
  }

  return prisma.$transaction([
    prisma.heroImage.update({ where: { id: imageA.id }, data: { order: imageB.order } }),
    prisma.heroImage.update({ where: { id: imageB.id }, data: { order: imageA.order } }),
  ]);
}