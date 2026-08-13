import { createItemRouteHandlers } from "@/lib/api/orderedListHandlers";
import { servicesQueries, findServiceBySlug, slugify } from "@/lib/db/queries/services";
import { validateService } from "@/lib/validation/services";

async function prepareUpdateData(body, { id }) {
  const cleanedFeatures = (body.features || []).map((f) => (f || "").trim()).filter(Boolean);

  let slug = slugify(body.slug || body.title);
  let suffix = 2;
  while (await findServiceBySlug(slug, id)) {
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

export const { PATCH, DELETE } = createItemRouteHandlers(servicesQueries, {
  validate: validateService,
  prepareUpdateData,
});