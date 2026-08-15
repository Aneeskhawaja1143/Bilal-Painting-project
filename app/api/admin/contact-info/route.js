import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { getContactInfo, upsertContactInfo } from "@/lib/db/queries/contactInfo";
import { validateContactInfo } from "@/lib/validation/contactInfo";
import { revalidatePath } from "next/cache";

/**
 * GET /api/admin/contact-info
 * Returns the ContactInfo singleton.
 */
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const content = await getContactInfo();
    return NextResponse.json({ content });
  } catch (error) {
    console.error("Failed to load contact info:", error);
    return NextResponse.json({ error: "Failed to load contact info" }, { status: 500 });
  }
}

/**
 * PUT /api/admin/contact-info
 * Body: { phone, phoneDisplay, email, whatsapp, whatsappMessage,
 *         addressStreet, addressCity, addressCounty, addressPostcode,
 *         addressCountry, freeQuoteRadius }
 *
 * ContactInfo is read by app/layout.js (Navbar + FloatingWhatsApp props)
 * and self-fetched by Footer.jsx, ContactInfo.jsx, and PreFooterCTA.jsx —
 * i.e. it appears on EVERY public page via the root layout, not just one.
 * revalidatePath('/', 'layout') invalidates every route nested under the
 * root layout in one call, which is the correct scope for this module
 * (a narrower revalidatePath('/contact') alone would miss the Navbar/
 * Footer/PreFooterCTA instances on every other page).
 */
export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { valid, errors } = validateContactInfo(body);
  if (!valid) {
    return NextResponse.json({ error: "Validation failed", fieldErrors: errors }, { status: 422 });
  }

  try {
    const updated = await upsertContactInfo({
      phone: body.phone.trim(),
      phoneDisplay: body.phoneDisplay.trim(),
      email: body.email.trim(),
      whatsapp: body.whatsapp.trim(),
      whatsappMessage: body.whatsappMessage.trim(),
      addressStreet: body.addressStreet.trim(),
      addressCity: body.addressCity.trim(),
      addressCounty: body.addressCounty.trim(),
      addressPostcode: body.addressPostcode.trim(),
      addressCountry: body.addressCountry.trim(),
      freeQuoteRadius: body.freeQuoteRadius.trim(),
    });
    revalidatePath("/", "layout");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update contact info:", error);
    return NextResponse.json({ error: "Failed to update contact info" }, { status: 500 });
  }
}