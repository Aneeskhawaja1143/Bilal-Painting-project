import { createReorderRouteHandler } from "@/lib/api/orderedListHandlers";
import { transformationsQueries } from "@/lib/db/queries/transformations";

export const { PUT } = createReorderRouteHandler(transformationsQueries, {
  revalidatePaths: ["/"],
});