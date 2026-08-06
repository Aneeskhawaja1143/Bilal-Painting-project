import { prisma } from "@/lib/db/prisma";

const DEFAULT_PAGE_SIZE = 24;

/**
 * Lists media assets with pagination, search, and filtering.
 *
 * @param {object} params
 * @param {number} [params.page=1]
 * @param {number} [params.pageSize=24]
 * @param {string} [params.search] - matches against filename, altText, or tags
 * @param {"image"|"video"|"all"} [params.resourceType="all"]
 * @param {string} [params.folder] - exact folder match, or "all"/undefined for no filter
 */
export async function listMedia({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search = "",
  resourceType = "all",
  folder = "all",
} = {}) {
  const where = {
    AND: [
      resourceType && resourceType !== "all" ? { resourceType } : {},
      folder && folder !== "all" ? { folder } : {},
      search
        ? {
            OR: [
              { filename: { contains: search, mode: "insensitive" } },
              { altText: { contains: search, mode: "insensitive" } },
              { tags: { has: search } },
            ],
          }
        : {},
    ],
  };

  const [items, total] = await Promise.all([
    prisma.mediaAsset.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.mediaAsset.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getMediaById(id) {
  return prisma.mediaAsset.findUnique({ where: { id } });
}

export async function createMedia(data) {
  return prisma.mediaAsset.create({ data });
}

/**
 * Updates the editable metadata on a media asset — alt text and tags.
 * Everything else about an asset (URL, dimensions, etc.) is immutable
 * once uploaded; re-upload a new asset instead of trying to change those.
 */
export async function updateMediaMetadata(id, { altText, tags }) {
  const data = {};
  if (altText !== undefined) data.altText = altText;
  if (tags !== undefined) data.tags = tags;

  return prisma.mediaAsset.update({ where: { id }, data });
}

/**
 * Checks whether a media asset is currently referenced by any content
 * table, across every relation defined on MediaAsset. Used to block
 * deletion of assets that are actively in use, so removing a file from
 * the library can never silently break a section of the site once that
 * section is wired up to read from the database (Phase 3+).
 */
export async function getMediaUsage(id) {
  const asset = await prisma.mediaAsset.findUnique({
    where: { id },
    include: {
      heroImages: true,
      aboutContent: true,
      portfolioImages: true,
      transformationBefore: true,
      transformationAfter: true,
      testimonialPhotos: true,
    },
  });

  if (!asset) return null;

  const usages = [
    ...asset.heroImages.map(() => "Hero"),
    ...asset.aboutContent.map(() => "About"),
    ...asset.portfolioImages.map(() => "Portfolio"),
    ...asset.transformationBefore.map(() => "Before/After (before image)"),
    ...asset.transformationAfter.map(() => "Before/After (after image)"),
    ...asset.testimonialPhotos.map(() => "Testimonials"),
  ];

  return { inUse: usages.length > 0, usages };
}

export async function deleteMediaRecord(id) {
  return prisma.mediaAsset.delete({ where: { id } });
}
