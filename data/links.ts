import { db } from "@/db";
import { links, NewLink } from "@/db/schema";
import { desc, eq, and } from "drizzle-orm";

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db.select().from(links).where(eq(links.shortCode, shortCode)).limit(1);
  return link ?? null;
}

export async function getLinksByUserId(userId: string) {
  return db.select().from(links).where(eq(links.userId, userId)).orderBy(desc(links.updatedAt));
}

export async function createLink(data: NewLink) {
  const [link] = await db.insert(links).values(data).returning();
  return link;
}

export async function updateLink(id: string, userId: string, data: { url: string; shortCode: string }) {
  const [link] = await db
    .update(links)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(links.id, id), eq(links.userId, userId)))
    .returning();
  return link;
}

export async function deleteLink(id: string, userId: string) {
  await db.delete(links).where(and(eq(links.id, id), eq(links.userId, userId)));
}
