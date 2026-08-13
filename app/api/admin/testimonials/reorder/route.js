import { createReorderRouteHandler } from "@/lib/api/orderedListHandlers";
import { testimonialsQueries } from "@/lib/db/queries/testimonials";

export const { PUT } = createReorderRouteHandler(testimonialsQueries);