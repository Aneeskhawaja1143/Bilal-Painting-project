import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { getHeroImages, swapHeroImageOrder } from "@/lib/db/queries/hero";
import { revalidatePath } from "next/cache";

/**
 * PUT /api/admin/hero/images/reorder
 * Body: { imageId: string, direction: "up" | "down" }
 *
 * Finds the image's current neighbor in the ordered list and swaps their
 * `order` values in a single transaction, so ordering can never end up
 * half-applied. Returns the full, freshly-ordered image list.
 */
export async function PUT(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const { imageId, direction } = body;

  if (!imageId || !["up", "down"].includes(direction)) {
    return NextResponse.json({ error: "imageId and a valid direction are required" }, { status: 400 });
  }

  try {
    const images = await getHeroImages();
    const index = images.findIndex((img) => img.id === imageId);

    if (index === -1) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const neighborIndex = direction === "up" ? index - 1 : index + 1;
    if (neighborIndex < 0 || neighborIndex >= images.length) {
      // Already at the top/bottom — nothing to do, not an error.
      return NextResponse.json(images);
    }

    await swapHeroImageOrder(images[index].id, images[neighborIndex].id);

    const updated = await getHeroImages();
    revalidatePath("/");
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Failed to reorder hero images:", error);
    return NextResponse.json({ error: "Failed to reorder hero images" }, { status: 500 });
  }
}