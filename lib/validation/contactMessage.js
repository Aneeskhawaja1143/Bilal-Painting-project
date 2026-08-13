const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a public contact form submission. Pure function, no imports —
 * safe to use from the API route. Mirrors the client-side checks already
 * in components/contact/ContactForm.jsx so the two never meaningfully
 * disagree, though this is the authoritative check.
 *
 * @param {{ name?: string, email?: string, phone?: string,
 *           subject?: string, message?: string }} data
 * @returns {{ valid: boolean, errors: Record<string,string> }}
 */
export function validateContactMessage(data) {
  const errors = {};

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const phone = (data.phone || "").trim();
  const subject = (data.subject || "").trim();
  const message = (data.message || "").trim();

  if (!name) {
    errors.name = "Your name is required.";
  } else if (name.length < 2) {
    errors.name = "Please enter your full name.";
  } else if (name.length > 100) {
    errors.name = "Name must be 100 characters or fewer.";
  }

  if (!email) {
    errors.email = "Your email address is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Please enter a valid email address.";
  } else if (email.length > 200) {
    errors.email = "Email must be 200 characters or fewer.";
  }

  if (phone && !/^[\d\s+\-().]{7,20}$/.test(phone)) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (subject && subject.length > 120) {
    errors.subject = "Subject must be 120 characters or fewer.";
  }

  if (!message) {
    errors.message = "Please describe your project briefly.";
  } else if (message.trim().length < 20) {
    errors.message = "Please provide a little more detail (at least 20 characters).";
  } else if (message.length > 5000) {
    errors.message = "Message must be 5000 characters or fewer.";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}