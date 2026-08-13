export function validateService(data) {
  const errors = {};

  const title = (data.title || "").trim();
  const icon = (data.icon || "").trim();
  const description = (data.description || "").trim();
  const badge = (data.badge || "").trim();
  const features = Array.isArray(data.features) ? data.features : [];
  const cleanedFeatures = features.map((f) => (f || "").trim()).filter(Boolean);

  if (!title) errors.title = "Title is required.";
  else if (title.length > 120) errors.title = "Title must be 120 characters or fewer.";

  if (!icon) errors.icon = "Icon name is required (e.g. \"Home\").";

  if (!description) errors.description = "Description is required.";
  else if (description.length > 600) errors.description = "Description must be 600 characters or fewer.";

  if (badge.length > 40) errors.badge = "Badge must be 40 characters or fewer.";

  if (cleanedFeatures.length === 0) errors.features = "Add at least one feature.";
  else if (cleanedFeatures.length > 12) errors.features = "Use 12 features or fewer.";

  return { valid: Object.keys(errors).length === 0, errors };
}