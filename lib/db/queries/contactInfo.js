import { prisma } from "@/lib/db/prisma";

export async function getContactInfo() {
  return prisma.contactInfo.findFirst();
}

export async function upsertContactInfo(data) {
  const existing = await prisma.contactInfo.findFirst();

  if (existing) {
    return prisma.contactInfo.update({ where: { id: existing.id }, data });
  }

  return prisma.contactInfo.create({ data });
}