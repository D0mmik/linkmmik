"use server";
import { insertLink, removeLink, shortKeyExists } from "~/server/db/links";
import { auth } from "~/server/auth";
import { revalidatePath } from "next/cache";
import ogs from "open-graph-scraper";

const BASE_URL = process.env.BASE_URL;

export async function NewLink(longUrl: string) {
  const session = await auth();
  const key = await generateShortKey();

  const data = await ogs({ url: longUrl });

  await insertLink({
    longUrl: longUrl,
    shortUrl: key,
    userId: session?.user?.id,
    imageUrl: data.result?.ogImage?.[0]?.url,
    description: data.result?.ogDescription
  });

  revalidatePath("/");
  return `${BASE_URL}/${key}`;
}

export async function DeleteLink(id?: number) {
  console.log(id)
  if (id == null) return
  await removeLink(id)
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
