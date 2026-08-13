import { NextResponse } from "next/server";
import { createItemRouteHandlers } from "@/lib/api/orderedListHandlers";
import { portfolioQueries } from "@/lib/db/queries/portfolio";
import { validatePortfolioImage } from "@/lib/validation/portfolio";
import { getMediaById } from "@/lib/db/queries/media";

async function prepareUpdateData(body) {
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

export const { PATCH, DELETE } = createItemRouteHandlers(portfolioQueries, {
  validate: validatePortfolioImage,
  prepareUpdateData,
});