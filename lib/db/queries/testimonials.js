import { createOrderedListQueries } from "./orderedList";

export const testimonialsQueries = createOrderedListQueries("testimonial", {
  include: { photo: true },
});

export const listTestimonials = testimonialsQueries.list;
export const getTestimonialById = testimonialsQueries.getById;
export const createTestimonial = testimonialsQueries.create;
export const updateTestimonial = testimonialsQueries.update;
export const deleteTestimonial = testimonialsQueries.remove;