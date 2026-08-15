import { NextResponse } from "next/server";
import { createListRouteHandlers } from "@/lib/api/orderedListHandlers";
import { portfolioQueries } from "@/lib/db/queries/portfolio";
import { validatePortfolioImage } from "@/lib/validation/portfolio";
import { getMediaById } from "@/lib/db/queries/media";

async function prepareCreateData(body) {
  const media = await getMediaById(body.mediaId);
  if (!media) {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: { mediaId: "Selected media asset no longer exists." } },
      { status: 422 }
    );
  }
  if (media.resourceType !== "image") {
    return NextResponse.json(
      { error: "Validation failed", fieldErrors: { mediaId: "Portfolio images must be an image, not a video." } },
      { status: 422 }
    );
  }

  return { altText: body.altText.trim(), mediaId: media.id };
}

export const { GET, POST } = createListRouteHandlers(portfolioQueries, {
  validate: validatePortfolioImage,
  prepareCreateData,
  revalidatePaths: ["/"],
});