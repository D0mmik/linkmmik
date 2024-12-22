import { links } from "~/server/db/schema";
import { db } from "~/server/db/index";
import { eq } from "drizzle-orm";
import { type Link } from "~/types";
import { unstable_cache } from "next/cache";

export function insertLink(link: Link) {
  return db.insert(links).values(link).execute();
}

export function deleteLink(id: number) {
  return db.delete(links).where(eq(links.id, id)).execute()
}

export const selectAllLinks = unstable_cache(
  async function selectAllLinks(userId: string) {
    return db.select().from(links).where(eq(links.userId, userId)).execute();
  },
  ["links"],
  { tags: ["links"]},
);

export async function selectLongUrl(shortUrl: string) {
  return db
    .select({ longUrl: links.longUrl })
    .from(links)
    .where(eq(links.shortUrl, shortUrl));
}

export async function shortKeyExists(shortKey: string) {
  const result = await db
    .select()
    .from(links)
    .where(eq(links.shortUrl, shortKey))
    .execute();
  return result.length > 0;
}
