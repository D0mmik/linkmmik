"use server";
import {redirect} from "next/navigation";
import { selectLongUrl } from "~/server/db/links";

export default async function RedirectPage({ params }: { params: Promise<{ shortUrl: string }> }) {
  const shortUrl = (await params).shortUrl

  const result = await selectLongUrl(shortUrl);

  if (result.length === 0 || !result[0]?.longUrl) {
    redirect("/error")
  }

  redirect(result[0].longUrl);
}