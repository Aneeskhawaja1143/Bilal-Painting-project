export function validatePortfolioImage(data) {
  const errors = {};

  const altText = (data.altText || "").trim();
  if (!altText) {
    errors.altText = "Alt text is required for accessibility and SEO.";
  } else if (altText.length > 200) {
    errors.altText = "Alt text must be 200 characters or fewer.";
  }

  if (!data.mediaId) {
    errors.mediaId = "Select an image from the media library.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}