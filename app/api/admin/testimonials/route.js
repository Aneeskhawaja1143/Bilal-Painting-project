import { NextResponse } from "next/server";
import { createListRouteHandlers } from "@/lib/api/orderedListHandlers";
import { testimonialsQueries } from "@/lib/db/queries/testimonials";
import { validateTestimonial } from "@/lib/validation/testimonials";
import { getMediaById } from "@/lib/db/queries/media";

async function prepareCreateData(body) {
  let photoId = null;
  if (body.photoId) {
    const media = await getMediaById(body.photoId);
    if (!media) {
      return NextResponse.json(
        { error: "Validation failed", fieldErrors: { photoId: "Selected photo no longer exists." } },
        { status: 422 }
      );
    }
    if (media.resourceType !== "image") {
      return NextResponse.json(
        { error: "Validation failed", fieldErrors: { photoId: "Testimonial photo must be an image, not a video." } },
        { status: 422 }
      );
    }
    photoId = media.id;
  }

  return {
    name: body.name.trim(),
    role: body.role?.trim() || null,
    quote: body.quote.trim(),
    rating: Number(body.rating),
    photoId,
  };
}

export const { GET, POST } = createListRouteHandlers(testimonialsQueries, {
  validate: validateTestimonial,
  prepareCreateData,
});