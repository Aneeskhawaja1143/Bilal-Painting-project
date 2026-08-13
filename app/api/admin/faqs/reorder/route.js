import { createReorderRouteHandler } from "@/lib/api/orderedListHandlers";
import { faqsQueries } from "@/lib/db/queries/faqs";

export const { PUT } = createReorderRouteHandler(faqsQueries);