"use client";
import { Button, Input } from "@nextui-org/react";
import { type KeyboardEvent, useState } from "react";
import { Copy } from "lucide-react";
import {Link} from "@nextui-org/link";
import {useSession} from "next-auth/react";
import { NewLink } from "~/server/actions";

export default function NewUrlInput() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading , setLoading] = useState(false);
  const session = useSession()

  const paste = async () => {
    try {
      await navigator.clipboard.readText().then((t) => setLongUrl(t));
    } catch (e) {
      console.log(e)
    }
  };

  const submit = async () => {
    setLoading(true)
    setShortUrl(await NewLink(longUrl))
    setLongUrl("");
    setLoading(false)
  };

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key !== "Enter") return;
      await submit();
  };

  return (
    <div>
      <div className="flex gap-2">
        <Input
          placeholder="Please provide url"
          onChange={(e) => setLongUrl(e.target.value)}
          isInvalid={!URL.canParse(longUrl) && longUrl.length !== 0}
          errorMessage="Please provide a correct URL"
          value={longUrl}
          onKeyDown={handleKeyDown}
        />
        <Button isIconOnly variant="faded" color="primary" onClick={paste}>
          <Copy size={20} />
        </Button>
        <Button
          color="primary"
          onClick={submit}
          isDisabled={!URL.canParse(longUrl) || longUrl.length === 0}
          isLoading={loading}
        >
          Submit
        </Button>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center flex-col items-center">
          <Link className="text-lg m-2" target="_blank" href={shortUrl}>{shortUrl}</Link>
          {!session.data?.user && (shortUrl && <p className="text-gray-400 font-light m-2">To save your URL, please sign in to your account.</p>)}
        </div>
      </div>
    </div>
  );
}
