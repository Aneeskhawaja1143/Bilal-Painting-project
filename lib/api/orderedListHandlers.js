import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

/**
 * Invalidates the Next.js cache for every public path affected by a
 * content change, so the public site reflects the new database value on
 * the very next request — no redeploy needed.
 *
 * ROOT CAUSE THIS FIXES: public pages (app/page.js, app/services/page.js,
 * etc.) read content via Prisma directly, not via fetch(). Next.js's
 * static/dynamic analysis only tracks fetch() calls and dynamic APIs
 * (cookies(), headers(), etc.) — a plain `await someQuery()` gives it no
 * signal that the page depends on mutable data, so routes with no other
 * dynamic API usage get fully statically prerendered at build time and
 * then served from Vercel's cache indefinitely. Admin pages "just worked"
 * because getServerSession() calls cookies() internally, which forces
 * those routes to render dynamically — public pages have no equivalent
 * signal. revalidatePath() is the targeted fix: it invalidates exactly
 * the cached path(s) an admin change actually affects, on demand, without
 * making every public page fully dynamic (which would work too, but
 * costs a live DB round-trip on every request instead of only when
 * content actually changes).
 *
 * @param {string[]} paths
 */
function revalidate(paths) {
  for (const path of paths) {
    try {
      revalidatePath(path);
    } catch (error) {
      // Revalidation failing should never fail the admin save itself —
      // the DB write already succeeded by the time this runs.
      console.error(`Failed to revalidate ${path}:`, error);
    }
  }
}

/**
 * Builds GET (list) + POST (create) handlers for an ordered-list module.
 *
 * @param {ReturnType<import('./../db/queries/orderedList').createOrderedListQueries>} queries
 * @param {{ validate: (body: object) => {valid: boolean, errors: object},
 *           prepareCreateData?: (body: object) => Promise<object|NextResponse>,
 *           revalidatePaths?: string[] }} config
 *   `prepareCreateData` lets a module resolve/validate related records
 *   (e.g. checking a mediaId exists) before creation. Returning a
 *   NextResponse from it short-circuits with that response (used for
 *   422s on invalid media references, mirroring the Hero/About routes).
 *   `revalidatePaths` lists every public path this module's content
 *   appears on (e.g. ['/'] for homepage-only sections, ['/', '/services']
 *   for Services). Omit or leave empty for admin-only modules (e.g.
 *   Testimonials, which has no public section yet).
 */
export function createListRouteHandlers(queries, { validate, prepareCreateData, revalidatePaths = [] }) {
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
      revalidate(revalidatePaths);
      return NextResponse.json(created, { status: 201 });
    } catch (error) {
      console.error("Failed to create item:", error);
      return NextResponse.json({ error: "Failed to create item" }, { status: 500 });
    }
  }

  return { GET, POST };
}

/** Builds PATCH (update) + DELETE handlers for a single item in an ordered-list module. */
export function createItemRouteHandlers(queries, { validate, prepareUpdateData, revalidatePaths = [] }) {
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
      revalidate(revalidatePaths);
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
      revalidate(revalidatePaths);
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Failed to delete item:", error);
      return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
    }
  }

  return { PATCH, DELETE };
}

/** Builds the PUT (move up/down) handler for an ordered-list module. */
export function createReorderRouteHandler(queries, { revalidatePaths = [] } = {}) {
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
      revalidate(revalidatePaths);
      return NextResponse.json(updated);
    } catch (error) {
      console.error("Failed to reorder items:", error);
      return NextResponse.json({ error: "Failed to reorder items" }, { status: 500 });
    }
  }

  return { PUT };
}