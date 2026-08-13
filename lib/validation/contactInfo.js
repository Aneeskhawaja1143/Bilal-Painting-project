const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactInfo(data) {
  const errors = {};

  const phone = (data.phone || "").trim();
  const phoneDisplay = (data.phoneDisplay || "").trim();
  const email = (data.email || "").trim();
  const whatsapp = (data.whatsapp || "").trim();
  const whatsappMessage = (data.whatsappMessage || "").trim();
  const addressStreet = (data.addressStreet || "").trim();
  const addressCity = (data.addressCity || "").trim();
  const addressCounty = (data.addressCounty || "").trim();
  const addressPostcode = (data.addressPostcode || "").trim();
  const addressCountry = (data.addressCountry || "").trim();
  const freeQuoteRadius = (data.freeQuoteRadius || "").trim();

  if (!phone) errors.phone = "Phone number is required, e.g. \"+44 7722186708\".";
  else if (phone.length > 30) errors.phone = "Phone number must be 30 characters or fewer.";

  if (!phoneDisplay) errors.phoneDisplay = "Display phone number is required, e.g. \"07722186708\".";
  else if (phoneDisplay.length > 30) errors.phoneDisplay = "Must be 30 characters or fewer.";

  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";

  if (!whatsapp) errors.whatsapp = "WhatsApp number is required, e.g. \"447722186708\".";
  else if (whatsapp.length > 30) errors.whatsapp = "Must be 30 characters or fewer.";

  if (!whatsappMessage) errors.whatsappMessage = "Default WhatsApp message is required.";
  else if (whatsappMessage.length > 300) errors.whatsappMessage = "Must be 300 characters or fewer.";

  if (!addressStreet) errors.addressStreet = "Street address is required.";
  if (!addressCity) errors.addressCity = "City is required.";
  if (!addressCounty) errors.addressCounty = "County is required.";
  if (!addressPostcode) errors.addressPostcode = "Postcode is required.";
  if (!addressCountry) errors.addressCountry = "Country is required.";

  if (!freeQuoteRadius) {
    errors.freeQuoteRadius = "Free quote radius is required, e.g. \"5\".";
  } else if (!/^\d+$/.test(freeQuoteRadius)) {
    errors.freeQuoteRadius = "Enter a whole number of miles, e.g. \"5\".";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}