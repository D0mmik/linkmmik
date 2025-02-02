"use server";
import {deleteLink, insertLink, shortKeyExists} from "~/server/db/links";
import { auth } from "~/server/auth";
import {revalidatePath, revalidateTag} from "next/cache";
import ogs from 'open-graph-scraper';
import {type Category} from "~/types";
import {insertCategory, selectCategories} from "~/server/db/categories";
import posthog from "posthog-js";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function NewLink(longUrl: string) {
  const session = await auth();
  const key = await generateShortKey();

  posthog.capture("new_link", {
    long_url: longUrl,
    short_key: key,
    user_id: session?.user?.id,
    timestamp: new Date().toISOString()
  });

  const data =  await ogs({url: longUrl})
  const host = new URL(longUrl).origin;

  await insertLink({
    longUrl: longUrl,
    shortUrl: key,
    userId: session?.user?.id,
    title: data.result.ogTitle,
    imageUrl: fixUrl(data.result?.ogImage?.[0]?.url, host),
    description: data.result?.ogDescription,
    favicon: fixUrl(data.result?.favicon, host)
  });

  revalidateTag("links")
  return `${BASE_URL}/${key}`;
}

export const DeleteLink = async (id: number) => {
  await deleteLink(id);
  revalidatePath("/links")
}

export const CreateCategory = async (category: Category) => {
  await insertCategory(category)
  revalidatePath("/links")
}

export const GetCategories = async (userId: string) => await selectCategories(userId)

async function generateShortKey(): Promise<string> {
  const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortKey;

  do {
    shortKey = Array.from(
      { length: 3 },
      () => c[Math.floor(Math.random() * c.length)],
    ).join("");
  } while (await shortKeyExists(shortKey));
  return shortKey;
}

function fixUrl(url: string | undefined, host: string) {
  if (url === undefined) return undefined;
  return url.startsWith('/') ? `${host}${url}` : url
}
