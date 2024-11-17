"use server";
import { insertLink, shortKeyExists } from "~/server/db/links";
import { auth } from "~/server/auth";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.BASE_URL;

export default async function NewLink(longUrl: string) {
  const session = await auth();
  const key = await generateShortKey();

  if (session?.user) {
    await insertLink({
      id: 0,
      longUrl: longUrl,
      shortUrl: key,
      userId: session?.user?.id,
    });
  }

  revalidatePath("/");
  return `${BASE_URL}/${key}`;
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
