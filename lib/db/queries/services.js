import { createOrderedListQueries } from "./orderedList";
import { prisma } from "@/lib/db/prisma";

export const servicesQueries = createOrderedListQueries("service");

export const listServices = servicesQueries.list;
export const getServiceById = servicesQueries.getById;
export const createService = servicesQueries.create;
export const updateService = servicesQueries.update;
export const deleteService = servicesQueries.remove;

/** Used to enforce slug uniqueness before create/update (the DB also enforces it, this gives a clean field error instead of a raw constraint error). */
export async function findServiceBySlug(slug, excludeId) {
  return prisma.service.findFirst({
    where: excludeId ? { slug, NOT: { id: excludeId } } : { slug },
  });
}

/** Turns a title into a URL-safe slug, e.g. "Interior Painting" -> "interior-painting". */
export function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}