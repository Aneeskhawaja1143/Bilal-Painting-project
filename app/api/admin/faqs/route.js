import { createListRouteHandlers } from "@/lib/api/orderedListHandlers";
import { faqsQueries } from "@/lib/db/queries/faqs";
import { validateFaq } from "@/lib/validation/faqs";

function prepareData(body) {
  return { question: body.question.trim(), answer: body.answer.trim() };
}

export const { GET, POST } = createListRouteHandlers(faqsQueries, {
  validate: validateFaq,
  prepareCreateData: prepareData,
  revalidatePaths: ["/"],
});