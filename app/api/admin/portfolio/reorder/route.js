import { createReorderRouteHandler } from "@/lib/api/orderedListHandlers";
import { portfolioQueries } from "@/lib/db/queries/portfolio";

export const { PUT } = createReorderRouteHandler(portfolioQueries);