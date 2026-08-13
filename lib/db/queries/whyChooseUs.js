import { createOrderedListQueries } from "./orderedList";

export const whyChooseUsQueries = createOrderedListQueries("whyChooseUsItem");

export const listWhyChooseUs = whyChooseUsQueries.list;
export const getWhyChooseUsById = whyChooseUsQueries.getById;
export const createWhyChooseUs = whyChooseUsQueries.create;
export const updateWhyChooseUs = whyChooseUsQueries.update;
export const deleteWhyChooseUs = whyChooseUsQueries.remove;