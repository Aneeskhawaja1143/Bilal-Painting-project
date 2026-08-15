import { NextResponse } from "next/server";
import { createItemRouteHandlers } from "@/lib/api/orderedListHandlers";
import { transformationsQueries } from "@/lib/db/queries/transformations";
import { validateTransformation } from "@/lib/validation/transformations";
import { getMediaById } from "@/lib/db/queries/media";

async function resolveImage(id, fieldName, label) {
  const media = await getMediaById(id);
  if (!media) {
    return {
      error: NextResponse.json(
        { error: "Validation failed", fieldErrors: { [fieldName]: `Selected "${label}" image no longer exists.` } },
        { status: 422 }
      ),
    };
  }
  if (media.resourceType !== "image") {
    return {
      error: NextResponse.json(
        { error: "Validation failed", fieldErrors: { [fieldName]: `The "${label}" image must be an image, not a video.` } },
        { status: 422 }
      ),
    };
  }
  return { media };
}

/**
 * Video is optional — omitted/null videoId means "no video attached"
 * (or "remove the existing video" on an update), which is valid.
 */
async function resolveVideo(id) {
  if (!id) return { media: null };

  const media = await getMediaById(id);
  if (!media) {
    return {
      error: NextResponse.json(
        { error: "Validation failed", fieldErrors: { videoId: "Selected video no longer exists." } },
        { status: 422 }
      ),
    };
  }
  if (media.resourceType !== "video") {
    return {
      error: NextResponse.json(
        { error: "Validation failed", fieldErrors: { videoId: "Selected file must be a video, not an image." } },
        { status: 422 }
      ),
    };
  }
  return { media };
}

async function prepareUpdateData(body) {
  const before = await resolveImage(body.beforeImageId, "beforeImageId", "before");
  if (before.error) return before.error;

  const after = await resolveImage(body.afterImageId, "afterImageId", "after");
  if (after.error) return after.error;

  const video = await resolveVideo(body.videoId);
  if (video.error) return video.error;

  return {
    title: body.title.trim(),
    description: body.description.trim(),
    category: body.category.trim(),
    beforeImageId: before.media.id,
    afterImageId: after.media.id,
    videoId: video.media?.id || null,
  };
}

export const { PATCH, DELETE } = createItemRouteHandlers(transformationsQueries, {
  validate: validateTransformation,
  prepareUpdateData,
  revalidatePaths: ["/"],
});