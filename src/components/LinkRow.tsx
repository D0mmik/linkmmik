import { Button, Chip } from "@nextui-org/react";
import { Copy, Trash2Icon } from "lucide-react";
import { CardBody } from "@nextui-org/card";
import {Category, type Link as LinkType} from "~/types";
import type { MouseEvent } from "react";
import { DeleteLink } from "~/server/actions";
import Link from "next/link";
import LinkChip from "~/components/LinkChip";

export default function LinkRow({ link, categories }: { link: LinkType, categories: Category[] }) {
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
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium max-sm:w-2/3 max-sm:text-base">
              {link.title}
            </h3>
            <Button variant="light">+Add</Button>
          </div>
        </div>
        <div className="flex items-center gap-8 max-sm:w-20 max-sm:gap-0">
          <img
            className="h-20 w-40 rounded-xl object-cover max-sm:w-20"
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
      <LinkChip url={url} />
    </CardBody>
  );
}
