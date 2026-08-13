import { prisma } from "@/lib/db/prisma";

const DEFAULT_PAGE_SIZE = 20;

export async function createContactMessage(data) {
  return prisma.contactMessage.create({ data });
}

/**
 * Lists contact messages with pagination, search, and read-status filter.
 * Mirrors the shape of lib/db/queries/media.js#listMedia (same
 * { items, total, page, pageSize, totalPages } response), since that's
 * the established pagination pattern in this admin.
 *
 * @param {object} params
 * @param {number} [params.page=1]
 * @param {number} [params.pageSize=20]
 * @param {string} [params.search] - matches against name, email, subject, or message
 * @param {"all"|"unread"|"read"} [params.status="all"]
 */
export async function listContactMessages({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search = "",
  status = "all",
} = {}) {
  const where = {
    AND: [
      status === "unread" ? { isRead: false } : {},
      status === "read" ? { isRead: true } : {},
      search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
              { subject: { contains: search, mode: "insensitive" } },
              { message: { contains: search, mode: "insensitive" } },
            ],
          }
        : {},
    ],
  };

  const [items, total] = await Promise.all([
    prisma.contactMessage.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.contactMessage.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getContactMessageById(id) {
  return prisma.contactMessage.findUnique({ where: { id } });
}

export async function markContactMessageRead(id) {
  return prisma.contactMessage.update({ where: { id }, data: { isRead: true } });
}

export async function markContactMessageUnread(id) {
  return prisma.contactMessage.update({ where: { id }, data: { isRead: false } });
}

export async function deleteContactMessage(id) {
  return prisma.contactMessage.delete({ where: { id } });
}

/** Used to show an unread badge in the admin sidebar/dashboard. */
export async function getUnreadContactMessageCount() {
  return prisma.contactMessage.count({ where: { isRead: false } });
}