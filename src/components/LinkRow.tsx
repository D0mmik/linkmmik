import { Button, Chip } from "@nextui-org/react";
import { Copy, Trash2Icon } from "lucide-react";
import { CardBody } from "@nextui-org/card";
import { type Link as LinkType } from "~/types";
import type { MouseEvent } from "react";
import { DeleteLink } from "~/server/actions";
import Link from "next/link";
import LinkChip from "~/components/LinkChip";

export default function LinkRow({ link }: { link: LinkType }) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${BASE_URL}/${link.shortUrl}`;

  const RemoveLink = async (e: MouseEvent, id: number) => {
    e.preventDefault();
    await DeleteLink(id);
  };

  return (
    <CardBody
      key={link.shortUrl}
      as={Link}
      target="_blank"
      href={url}
      className="hover:bg-slate-100"
    >
      <div className="justify-between max-sm:flex">
        <div className="flex items-center gap-2">
          {link.favicon && (
            <img src={link.favicon} className="h-5 w-5" alt="favicon" />
          )}
          <h3 className="text-lg font-medium max-sm:w-2/3 max-sm:text-base">
            {link.title}
          </h3>
        </div>
        <div className="flex items-center gap-8 max-sm:w-20 max-sm:gap-0">
          <img
            className="w-40 rounded-xl max-sm:w-20 h-20 object-cover"
            src={link.imageUrl!}
          />
          <p className="w-full max-sm:hidden">{link.description!}</p>
          <Button
            color="danger"
            variant="flat"
            className="max-sm:hidden"
            isIconOnly
            onClick={(e) => RemoveLink(e, link.id!)}
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
      <LinkChip url={url}/>
    </CardBody>
  );
}
