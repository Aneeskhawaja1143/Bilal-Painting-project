import { NextResponse } from "next/server";
import { createContactMessage } from "@/lib/db/queries/contactMessages";
import { validateContactMessage } from "@/lib/validation/contactMessage";

/**
 * POST /api/contact
 * Body: { name, email, phone?, subject?, message }
 *
 * Public endpoint — intentionally NOT behind admin auth (this is the
 * public contact form). middleware.js only protects /admin/* and
 * /api/admin/*, so this route is reachable by anyone, same as any other
 * public page on the site.
 *
 * Email sending is explicitly out of scope for this step — this route
 * only persists the message to the database. The admin reviews new
 * messages via /admin/contact-messages.
 */
export async function POST(request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { valid, errors } = validateContactMessage(body);
  if (!valid) {
    return NextResponse.json({ error: "Validation failed", fieldErrors: errors }, { status: 422 });
  }

  try {
    await createContactMessage({
      name: body.name.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim() || null,
      subject: body.subject?.trim() || null,
      message: body.message.trim(),
    });

    // Deliberately return no identifying data about the created row —
    // the public caller doesn't need it, and it avoids leaking internal ids.
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    // Never leak raw DB errors to the client — log server-side, return a
    // generic message, same pattern used by every admin route in this app.
    console.error("Failed to save contact message:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}