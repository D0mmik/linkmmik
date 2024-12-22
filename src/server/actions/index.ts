"use server";
import {deleteLink, insertLink, shortKeyExists} from "~/server/db/links";
import { auth } from "~/server/auth";
import {revalidatePath, revalidateTag} from "next/cache";
import ogs from 'open-graph-scraper';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function NewLink(longUrl: string) {
  const session = await auth();
  const key = await generateShortKey();

  const data =  await ogs({url: longUrl})

  await insertLink({
    longUrl: longUrl,
    shortUrl: key,
    userId: session?.user?.id,
    title: data.result.ogTitle,
    imageUrl: data.result?.ogImage?.[0]?.url,
    description: data.result?.ogDescription
  });

  revalidateTag("links")
  return `${BASE_URL}/${key}`;
}

export const DeleteLink = async (id: number) => {
  await deleteLink(id);
  revalidatePath("/links")
}

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
