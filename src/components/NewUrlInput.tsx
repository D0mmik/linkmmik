"use client"
import { Button, Input } from "@nextui-org/react";
import NewLink from "~/server/actions";
import { type KeyboardEvent, useState } from "react";
import { Copy } from "lucide-react";

export default function NewUrlInput() {

  const [url, setUrl] = useState("")

  const paste = async () => { await navigator.clipboard.readText().then((t) => setUrl(t)) }

  const submit = async () => {
    await NewLink(url)
    setUrl("")
  }

  const handleKeyDown = async (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      await submit()
    }
  }

  return (
    <div className="flex gap-2">
      <Input placeholder="Please provide url"
             onChange={(e) => setUrl(e.target.value)}
             isInvalid={!URL.canParse(url) && url.length !== 0}
             errorMessage="Please provide a correct URL"
             value={url}
             onKeyDown={handleKeyDown}
      />
      <Button isIconOnly variant="faded" color="primary" onClick={paste}>
        <Copy size={20} />
      </Button>
      <Button color="primary" onClick={submit} isDisabled={!URL.canParse(url) || url.length === 0}>Submit</Button>
    </div>
  )
}