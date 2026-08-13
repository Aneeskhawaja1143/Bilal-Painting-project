import { createOrderedListQueries } from "./orderedList";

export const portfolioQueries = createOrderedListQueries("portfolioImage", {
  include: { media: true },
});

export const listPortfolioImages = portfolioQueries.list;
export const getPortfolioImageById = portfolioQueries.getById;
export const createPortfolioImage = portfolioQueries.create;
export const updatePortfolioImage = portfolioQueries.update;
export const deletePortfolioImage = portfolioQueries.remove;