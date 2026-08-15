import { createReorderRouteHandler } from "@/lib/api/orderedListHandlers";
import { servicesQueries } from "@/lib/db/queries/services";

export const { PUT } = createReorderRouteHandler(servicesQueries, {
  revalidatePaths: ["/", "/services"],
});