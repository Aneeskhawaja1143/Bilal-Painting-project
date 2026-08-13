export function validateTestimonial(data) {
  const errors = {};

  const name = (data.name || "").trim();
  const quote = (data.quote || "").trim();
  const role = (data.role || "").trim();
  const rating = Number(data.rating);

  if (!name) {
    errors.name = "Name is required.";
  } else if (name.length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  if (role.length > 100) {
    errors.role = "Role/location must be 100 characters or fewer.";
  }

  if (!quote) {
    errors.quote = "Quote is required.";
  } else if (quote.length > 500) {
    errors.quote = "Quote must be 500 characters or fewer.";
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.rating = "Rating must be a whole number from 1 to 5.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}