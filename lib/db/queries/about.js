import { prisma } from "@/lib/db/prisma";

/**
 * AboutContent is a singleton — one row for the whole About section,
 * matching how the public About component reads it. Unlike Hero (which
 * has a separate HeroImage join table for multiple ordered images),
 * About has exactly one optional image directly on the row (`imageId`),
 * so no separate image sub-resource is needed here.
 */

export async function getAboutContent() {
  return prisma.aboutContent.findFirst({
    include: { image: true },
  });
}

/**
 * Creates the singleton row if none exists yet (defensive — the seed
 * script already creates one), otherwise updates the existing row.
 */
export async function upsertAboutContent(data) {
  const existing = await prisma.aboutContent.findFirst();

  if (existing) {
    return prisma.aboutContent.update({
      where: { id: existing.id },
      data,
      include: { image: true },
    });
  }

  return prisma.aboutContent.create({
    data,
    include: { image: true },
  });
}