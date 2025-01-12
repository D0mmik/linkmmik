"use server"
import type {Tag} from "~/types";
import {db} from "~/server/db/index";
import {tags} from "~/server/db/schema";
import {eq} from "drizzle-orm";
import {revalidatePath} from "next/cache";

export async function insertTag(tag: Tag) {
  await db.insert(tags).values(tag).execute()
  revalidatePath("/links")
}

export async function selectTagsWithId(linkId: number) {
  return db.select({ tagId: tags.tagId }).from(tags).where(eq(tags.linkId, linkId));
}
