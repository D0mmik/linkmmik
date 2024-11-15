"use server"
import { insertLink, shortKeyExists } from "~/server/db/links";
import { auth } from "~/server/auth";
import { revalidatePath } from "next/cache";

export default async function NewLink(longUrl: string) {
  const session = await auth()
  await insertLink(
    { id: 0, longUrl: longUrl, shortUrl: await generateShortKey(), userId: session?.user?.id}
  )
  revalidatePath("/")
}

async function generateShortKey(): Promise<string> {
  const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let shortKey

  do {
    shortKey = Array.from({ length: 3 }, () => c[Math.floor(Math.random() * c.length)]).join("");
  } while (await shortKeyExists(shortKey))
  return shortKey
}