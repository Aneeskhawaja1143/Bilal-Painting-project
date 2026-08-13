import { createOrderedListQueries } from "./orderedList";

export const faqsQueries = createOrderedListQueries("faq");

export const listFaqs = faqsQueries.list;
export const getFaqById = faqsQueries.getById;
export const createFaq = faqsQueries.create;
export const updateFaq = faqsQueries.update;
export const deleteFaq = faqsQueries.remove;