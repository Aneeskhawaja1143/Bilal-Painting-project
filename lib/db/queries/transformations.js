import { createOrderedListQueries } from "./orderedList";

export const transformationsQueries = createOrderedListQueries("transformation", {
  include: { beforeImage: true, afterImage: true, video: true },
});

export const listTransformations = transformationsQueries.list;
export const getTransformationById = transformationsQueries.getById;
export const createTransformation = transformationsQueries.create;
export const updateTransformation = transformationsQueries.update;
export const deleteTransformation = transformationsQueries.remove;