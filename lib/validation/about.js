/**
 * Validates About content fields. Pure function, no imports — safe to use
 * from both the client-side form (instant inline errors) and the API
 * route (authoritative check before writing to the database). Mirrors
 * lib/validation/hero.js so the two content editors behave consistently.
 *
 * @param {{ badge?: string, heading?: string, headingAccent?: string,
 *           paragraph1?: string, paragraph2?: string,
 *           bulletPoints?: string[], experienceYears?: string }} data
 * @returns {{ valid: boolean, errors: Record<string,string> }}
 */
export function validateAboutContent(data) {
  const errors = {};

  const badge = (data.badge || "").trim();
  const heading = (data.heading || "").trim();
  const headingAccent = (data.headingAccent || "").trim();
  const paragraph1 = (data.paragraph1 || "").trim();
  const paragraph2 = (data.paragraph2 || "").trim();
  const experienceYears = (data.experienceYears || "").trim();
  const bulletPoints = Array.isArray(data.bulletPoints) ? data.bulletPoints : [];

  if (!badge) {
    errors.badge = "Badge text is required.";
  } else if (badge.length > 120) {
    errors.badge = "Badge text must be 120 characters or fewer.";
  }

  if (!heading) {
    errors.heading = "Heading is required.";
  } else if (heading.length > 160) {
    errors.heading = "Heading must be 160 characters or fewer.";
  }

  if (!headingAccent) {
    errors.headingAccent = "Accent heading is required.";
  } else if (headingAccent.length > 120) {
    errors.headingAccent = "Accent heading must be 120 characters or fewer.";
  }

  if (!paragraph1) {
    errors.paragraph1 = "First paragraph is required.";
  } else if (paragraph1.length < 20) {
    errors.paragraph1 = "First paragraph should be at least 20 characters.";
  } else if (paragraph1.length > 800) {
    errors.paragraph1 = "First paragraph must be 800 characters or fewer.";
  }

  if (!paragraph2) {
    errors.paragraph2 = "Second paragraph is required.";
  } else if (paragraph2.length < 20) {
    errors.paragraph2 = "Second paragraph should be at least 20 characters.";
  } else if (paragraph2.length > 800) {
    errors.paragraph2 = "Second paragraph must be 800 characters or fewer.";
  }

  if (!experienceYears) {
    errors.experienceYears = "Experience (e.g. \"14+\") is required.";
  } else if (experienceYears.length > 10) {
    errors.experienceYears = "Keep this short, e.g. \"14+\".";
  }

  const cleanedBulletPoints = bulletPoints.map((b) => (b || "").trim()).filter(Boolean);
  if (cleanedBulletPoints.length === 0) {
    errors.bulletPoints = "Add at least one bullet point.";
  } else if (cleanedBulletPoints.length > 8) {
    errors.bulletPoints = "Use 8 bullet points or fewer.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}