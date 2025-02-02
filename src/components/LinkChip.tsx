"use client"
import {Check, Copy} from "lucide-react";
import {Chip} from "@nextui-org/chip";
import {useState} from "react";

export default function LinkChip({url} : {url: string}) {
  const [copied, setCopied] = useState(false);

  return (
    <>
      <Chip
        className="hover:text-blue-600 max-sm:hidden"
        variant="flat"
        radius="md"
        onClick={async (e) => {
          setCopied(true);
          e.preventDefault();
          e.stopPropagation();
          await navigator.clipboard.writeText(url);
        }}
        endContent={copied ? <Check size="18"/> : <Copy size="18" className="mx-1"/>}
      >
        {url.replace("https://", "")}
      </Chip>
      <Chip
        variant="flat"
        color="primary"
        size="sm"
        className="hidden max-sm:flex max-sm:scale-90 max-sm:origin-left"
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await navigator.clipboard.writeText(url);
        }}
      >
        Copy Link
      </Chip>
    </>
  );
}