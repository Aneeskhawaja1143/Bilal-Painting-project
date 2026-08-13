import { createReorderRouteHandler } from "@/lib/api/orderedListHandlers";
import { whyChooseUsQueries } from "@/lib/db/queries/whyChooseUs";

export const { PUT } = createReorderRouteHandler(whyChooseUsQueries);