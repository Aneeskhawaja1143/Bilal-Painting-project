import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import {
  getContactMessageById,
  markContactMessageRead,
  markContactMessageUnread,
  deleteContactMessage,
} from "@/lib/db/queries/contactMessages";

/**
 * GET /api/admin/contact-messages/[id]
 * Returns full message details (used when the admin opens a message).
 */
export async function GET(_request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const message = await getContactMessageById(params.id);
  if (!message) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(message);
}

/**
 * PATCH /api/admin/contact-messages/[id]
 * Body: { isRead: true | false }
 * Only the read status is editable — the message content itself is
 * never modified after submission.
 */
export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await getContactMessageById(params.id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => ({}));
  if (typeof body.isRead !== "boolean") {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: { isRead: "isRead must be true or false." } },
      { status: 422 }
    );
  }

  try {
    const updated = body.isRead
      ? await markContactMessageRead(params.id)
      : await markContactMessageUnread(params.id);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to update contact message:", error);
    return NextResponse.json({ error: "Failed to update contact message" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/contact-messages/[id]
 * ContactMessage has no relations to any other model in the schema, so
 * deleting a row here can never cascade or otherwise affect Hero, About,
 * Services, Portfolio, Media, or any other part of the database.
 */
export async function DELETE(_request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existing = await getContactMessageById(params.id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    await deleteContactMessage(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete contact message:", error);
    return NextResponse.json({ error: "Failed to delete contact message" }, { status: 500 });
  }
}