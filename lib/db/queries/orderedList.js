import { prisma } from "@/lib/db/prisma";

/**
 * Creates a set of query functions for any Prisma model that has an
 * `order Int` field and is managed as an admin-editable ordered list
 * (WhyChooseUsItem, Service, PortfolioImage, Transformation, Faq,
 * Testimonial). Each module's own query file (e.g. lib/db/queries/faqs.js)
 * wraps this with its model name and `include` so callers still get
 * clearly-named, model-specific functions — this factory only exists to
 * avoid re-implementing identical reorder/create/delete logic six times.
 *
 * @param {string} modelName - the Prisma Client accessor, e.g. "faq"
 * @param {{ include?: object }} [options]
 */
export function createOrderedListQueries(modelName, { include } = {}) {
  const delegate = () => prisma[modelName];
  const withInclude = include ? { include } : {};

  return {
    async list() {
      return delegate().findMany({ orderBy: { order: "asc" }, ...withInclude });
    },

    async getById(id) {
      return delegate().findUnique({ where: { id }, ...withInclude });
    },

    async create(data) {
      const last = await delegate().findFirst({ orderBy: { order: "desc" } });
      const nextOrder = last ? last.order + 1 : 0;
      return delegate().create({ data: { ...data, order: nextOrder }, ...withInclude });
    },

    async update(id, data) {
      return delegate().update({ where: { id }, data, ...withInclude });
    },

    async remove(id) {
      return delegate().delete({ where: { id } });
    },

    /**
     * Swaps the `order` value of two rows in a single transaction, so
     * ordering can never end up half-applied. Backs the admin's move
     * up/down controls, same pattern as swapHeroImageOrder.
     */
    async swapOrder(idA, idB) {
      const [a, b] = await Promise.all([
        delegate().findUnique({ where: { id: idA } }),
        delegate().findUnique({ where: { id: idB } }),
      ]);
      if (!a || !b) throw new Error("One or both items not found.");

      return prisma.$transaction([
        delegate().update({ where: { id: a.id }, data: { order: b.order } }),
        delegate().update({ where: { id: b.id }, data: { order: a.order } }),
      ]);
    },

    /** Moves an item up or down relative to the full ordered list. Returns the refreshed list. */
    async move(id, direction) {
      const items = await delegate().findMany({ orderBy: { order: "asc" } });
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) throw new Error("Item not found.");

      const neighborIndex = direction === "up" ? index - 1 : index + 1;
      if (neighborIndex < 0 || neighborIndex >= items.length) {
        return delegate().findMany({ orderBy: { order: "asc" }, ...withInclude });
      }

      await this.swapOrder(items[index].id, items[neighborIndex].id);
      return delegate().findMany({ orderBy: { order: "asc" }, ...withInclude });
    },
  };
}