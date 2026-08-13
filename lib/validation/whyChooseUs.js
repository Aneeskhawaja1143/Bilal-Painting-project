export function validateWhyChooseUsItem(data) {
  const errors = {};

  const icon = (data.icon || "").trim();
  const title = (data.title || "").trim();
  const description = (data.description || "").trim();
  const stat = (data.stat || "").trim();
  const statLabel = (data.statLabel || "").trim();

  if (!icon) errors.icon = "Icon name is required (e.g. \"Award\").";
  if (!title) errors.title = "Title is required.";
  else if (title.length > 120) errors.title = "Title must be 120 characters or fewer.";

  if (!description) errors.description = "Description is required.";
  else if (description.length > 400) errors.description = "Description must be 400 characters or fewer.";

  if (!stat) errors.stat = "Stat is required (e.g. \"14+\").";
  else if (stat.length > 20) errors.stat = "Keep the stat short, e.g. \"14+\".";

  if (!statLabel) errors.statLabel = "Stat label is required (e.g. \"Years\").";
  else if (statLabel.length > 40) errors.statLabel = "Stat label must be 40 characters or fewer.";

  return { valid: Object.keys(errors).length === 0, errors };
}