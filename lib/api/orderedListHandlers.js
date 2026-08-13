import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

/**
 * Builds GET (list) + POST (create) handlers for an ordered-list module.
 *
 * @param {ReturnType<import('./../db/queries/orderedList').createOrderedListQueries>} queries
 * @param {{ validate: (body: object) => {valid: boolean, errors: object},
 *           prepareCreateData?: (body: object) => Promise<object|NextResponse> }} config
 *   `prepareCreateData` lets a module resolve/validate related records
 *   (e.g. checking a mediaId exists) before creation. Returning a
 *   NextResponse from it short-circuits with that response (used for
 *   422s on invalid media references, mirroring the Hero/About routes).
 */
export function createListRouteHandlers(queries, { validate, prepareCreateData }) {
  async function GET() {
    const unauthorized = await requireAuth();
    if (unauthorized) return unauthorized;

    try {
      const items = await queries.list();
      return NextResponse.json(items);
    } catch (error) {
      console.error("Failed to list items:", error);
      return NextResponse.json({ error: "Failed to list items" }, { status: 500 });
    }
  }

  async function POST(request) {
    const unauthorized = await requireAuth();
    if (unauthorized) return unauthorized;

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { valid, errors } = validate(body);
    if (!valid) {
      return NextResponse.json({ error: "Validation failed", fieldErrors: errors }, { status: 422 });
    }

    try {
      const data = prepareCreateData ? await prepareCreateData(body) : body;
      if (data instanceof NextResponse) return data;

      const created = await queries.create(data);
      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      console.error("Failed to create item:", error);
      return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
    }
  }

  return { GET, POST };
}

/** Builds PATCH (update) + DELETE handlers for a single item in an ordered-list module. */
export function createItemRouteHandlers(queries, { validate, prepareUpdateData }) {
  async function PATCH(request, { params }) {
    const unauthorized = await requireAuth();
    if (unauthorized) return unauthorized;

    const body = await request.json().catch(() => ({}));
    const { valid, errors } = validate(body);
    if (!valid) {
      return NextResponse.json({ error: "Validation failed", fieldErrors: errors }, { status: 422 });
    }

    try {
      const data = prepareUpdateData ? await prepareUpdateData(body, { id: params.id }) : body;
      if (data instanceof NextResponse) return data;

      const updated = await queries.update(params.id, data);
      return NextResponse.json(updated);
    } catch (error) {
      console.error("Failed to update item:", error);
      return NextResponse.json({ error: "Failed to update item" }, { status: 500 });
    }
  }

  async function DELETE(_request, { params }) {
    const unauthorized = await requireAuth();
    if (unauthorized) return unauthorized;

    try {
      await queries.remove(params.id);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Failed to delete item:", error);
      return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
    }
  }

  return { PATCH, DELETE };
}

/** Builds the PUT (move up/down) handler for an ordered-list module. */
export function createReorderRouteHandler(queries) {
  async function PUT(request) {
    const unauthorized = await requireAuth();
    if (unauthorized) return unauthorized;

    const body = await request.json().catch(() => ({}));
    const { id, direction } = body;

    if (!id || !["up", "down"].includes(direction)) {
      return NextResponse.json({ error: "id and a valid direction are required" }, { status: 400 });
    }

    try {
      const updated = await queries.move(id, direction);
      return NextResponse.json(updated);
    } catch (error) {
      console.error("Failed to reorder items:", error);
      return NextResponse.json({ error: "Failed to reorder items" }, { status: 500 });
    }
  }

  return { PUT };
}