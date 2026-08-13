export function validateTransformation(data) {
  const errors = {};

  const title = (data.title || "").trim();
  const description = (data.description || "").trim();
  const category = (data.category || "").trim();

  if (!title) {
    errors.title = "Title is required.";
  } else if (title.length > 120) {
    errors.title = "Title must be 120 characters or fewer.";
  }

  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length > 300) {
    errors.description = "Description must be 300 characters or fewer.";
  }

  if (!category) {
    errors.category = "Category is required (e.g. \"Interior\").";
  } else if (category.length > 60) {
    errors.category = "Category must be 60 characters or fewer.";
  }

  if (!data.beforeImageId) {
    errors.beforeImageId = "Select a \"before\" image.";
  }
  if (!data.afterImageId) {
    errors.afterImageId = "Select an \"after\" image.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}