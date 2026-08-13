import { NextResponse } from "next/server";
import { createListRouteHandlers } from "@/lib/api/orderedListHandlers";
import { servicesQueries, findServiceBySlug, slugify } from "@/lib/db/queries/services";
import { validateService } from "@/lib/validation/services";

async function prepareCreateData(body) {
  const cleanedFeatures = (body.features || []).map((f) => (f || "").trim()).filter(Boolean);

  let slug = slugify(body.slug || body.title);
  let suffix = 2;
  while (await findServiceBySlug(slug)) {
    slug = `${slugify(body.slug || body.title)}-${suffix}`;
    suffix += 1;
  }

  return {
    slug,
    icon: body.icon.trim(),
    title: body.title.trim(),
    description: body.description.trim(),
    features: cleanedFeatures,
    badge: body.badge?.trim() || null,
    showOnHome: body.showOnHome !== false,
  };
}

export const { GET, POST } = createListRouteHandlers(servicesQueries, {
  validate: validateService,
  prepareCreateData,
});