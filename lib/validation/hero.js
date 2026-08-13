/**
 * Validates Hero content fields. Pure function, no imports — safe to use
 * from both the client-side form (instant inline errors) and the API
 * route (authoritative check before writing to the database). Keeping
 * this in one place means the two can never drift out of sync.
 *
 * @param {{ badge?: string, headingAccent?: string, headingMain?: string,
 *           description?: string, trustBadges?: string[] }} data
 * @returns {{ valid: boolean, errors: Record<string,string> }}
 */
export function validateHeroContent(data) {
  const errors = {};

  const badge = (data.badge || "").trim();
  const headingAccent = (data.headingAccent || "").trim();
  const headingMain = (data.headingMain || "").trim();
  const description = (data.description || "").trim();
  const trustBadges = Array.isArray(data.trustBadges) ? data.trustBadges : [];

  if (!badge) {
    errors.badge = "Badge text is required.";
  } else if (badge.length > 120) {
    errors.badge = "Badge text must be 120 characters or fewer.";
  }

  if (!headingAccent) {
    errors.headingAccent = "Accent heading is required.";
  } else if (headingAccent.length > 120) {
    errors.headingAccent = "Accent heading must be 120 characters or fewer.";
  }

  if (!headingMain) {
    errors.headingMain = "Main heading is required.";
  } else if (headingMain.length > 160) {
    errors.headingMain = "Main heading must be 160 characters or fewer.";
  }

  if (!description) {
    errors.description = "Description is required.";
  } else if (description.length < 20) {
    errors.description = "Description should be at least 20 characters.";
  } else if (description.length > 600) {
    errors.description = "Description must be 600 characters or fewer.";
  }

  const cleanedTrustBadges = trustBadges.map((b) => (b || "").trim()).filter(Boolean);
  if (cleanedTrustBadges.length === 0) {
    errors.trustBadges = "Add at least one trust badge.";
  } else if (cleanedTrustBadges.length > 8) {
    errors.trustBadges = "Use 8 trust badges or fewer.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/** Validates a single hero image entry (used when adding one via the picker). */
export function validateHeroImage(data) {
  const errors = {};

  if (!data.mediaId) {
    errors.mediaId = "Select an image from the media library.";
  }

  const altText = (data.altText || "").trim();
  if (!altText) {
    errors.altText = "Alt text is required for accessibility and SEO.";
  } else if (altText.length > 200) {
    errors.altText = "Alt text must be 200 characters or fewer.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}