import { createItemRouteHandlers } from "@/lib/api/orderedListHandlers";
import { faqsQueries } from "@/lib/db/queries/faqs";
import { validateFaq } from "@/lib/validation/faqs";

function prepareData(body) {
  return { question: body.question.trim(), answer: body.answer.trim() };
}

export const { PATCH, DELETE } = createItemRouteHandlers(faqsQueries, {
  validate: validateFaq,
  prepareUpdateData: prepareData,
});