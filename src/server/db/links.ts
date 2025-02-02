"use server"
import {categories, groupMembers, links, tags} from "~/server/db/schema";
import { db } from "~/server/db/index";
import {and, eq, isNull, or, sql} from "drizzle-orm";
import {type Category, type Link} from "~/types";
import {pusherServer} from "~/utils/pusher";
import {auth} from "~/server/auth";
import {revalidatePath} from "next/cache";

export async function insertLink(link: Link) {
  return db.insert(links).values(link).execute();
}

export async function deleteLink(id: number) {
  return db.delete(links).where(eq(links.id, id)).execute()
}

export const selectAllLinks =
  async (userId: string) => {
    if (!userId) throw new Error("User ID is required");
    return await db
      .select({
        id: links.id,
        userId: links.userId,
        shortUrl: links.shortUrl,
        longUrl: links.longUrl,
        title: links.title,
        description: links.description,
        imageUrl: links.imageUrl,
        favicon: links.favicon,
        createdAt: links.createdAt,
        groupId: links.groupId,
        categories: sql<Category[]>`json_agg(
          DISTINCT jsonb_build_object(
            'id', ${categories.id},
            'name', ${categories.name},
            'color', ${categories.color}
          )
        ) FILTER (WHERE ${categories.id} IS NOT NULL)`
      })
      .from(links)
      .leftJoin(groupMembers, eq(groupMembers.groupId, links.groupId))
      .leftJoin(tags, and(eq(tags.linkId, links.id), eq(tags.userId, userId)))
      .leftJoin(categories, eq(categories.id, tags.tagId))
      .where(
        or(
          and(eq(links.userId, userId), isNull(links.groupId)),
          eq(groupMembers.memberId, userId)
        )
      )
      .groupBy(
        links.id,
        links.userId,
        links.shortUrl,
        links.longUrl,
        links.title,
        links.description,
        links.imageUrl,
        links.favicon,
        links.createdAt,
        links.groupId
      )
      .execute();
  }

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

export async function AddGroupToLink(linkId: number, groupId: number | undefined) {
  if (groupId === undefined) return;

  const senderId = (await auth())?.user.id
  await db.update(links).set({groupId: groupId}).where(eq(links.id, linkId))

  await pusherServer.trigger(`group-${groupId}`, "new-link", { senderId });

  revalidatePath("/links")
}