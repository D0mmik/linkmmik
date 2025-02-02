import {Button} from "@nextui-org/button";
import {Chip} from "@nextui-org/chip";
import { Trash2Icon, PlusIcon, UsersIcon } from "lucide-react";
import { CardBody } from "@nextui-org/card";
import {type Category, type Group, type Link as LinkType} from "~/types";
import type { MouseEvent } from "react";
import { DeleteLink } from "~/server/actions";
import Link from "next/link";
import LinkChip from "~/components/LinkChip";
import AddTag from "~/components/AddTag";
import {getColor} from "~/utils";
import AddGroup from "~/components/AddGroup";

export default function LinkRow({ link, categories, groups }: { link: LinkType; categories: Category[], groups: Group[] }) {

  if (link.id === undefined) return <p>Id is missing</p>

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
      className="group py-3 transition-colors hover:bg-default-100 max-sm:px-3 overflow-hidden"
    >
      <div className="flex gap-4 max-sm:flex-col max-sm:gap-3 w-full">
        {link.imageUrl && (
          <div className="flex-shrink-0 max-sm:w-full">
            <img
              className="h-24 w-40 rounded-xl object-cover max-sm:h-28 max-sm:w-full"
              src={link.imageUrl}
              alt={link.title!}
            />
          </div>
        )}
        <div className="flex min-w-0 flex-grow flex-col justify-between gap-2 max-sm:gap-3 max-sm:w-full">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 min-w-0">
              {link.favicon && (
                <img
                  src={link.favicon}
                  className="h-4 w-4 rounded-sm flex-shrink-0"
                  alt={`${link.title} favicon`}
                />
              )}
              <h3 className="truncate text-lg font-medium max-sm:text-base min-w-0">{link.title}</h3>
            </div>
            <p className="line-clamp-2 text-sm text-default-500 max-sm:line-clamp-2">
              {link.description}
            </p>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5 max-sm:gap-1">
            <LinkChip url={url} />
            {link.categories?.map((category, i) => (
              <Chip 
                key={category.id ?? i} 
                color={getColor(category.color!)}
                size="sm"
                className="max-sm:scale-90 max-sm:origin-left"
              >
                {category.name}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-col items-end justify-between gap-2 max-sm:flex-row max-sm:items-center max-sm:w-full max-sm:mt-2">
          <div className="flex gap-1.5 max-sm:gap-1">
            <AddGroup linkId={link.id} groups={groups} />
            <AddTag linkId={link.id} categories={categories} />
            <Button
              color="danger"
              variant="light"
              className="opacity-0 transition-opacity group-hover:opacity-100 max-sm:opacity-100"
              size="sm"
              isIconOnly
              onClick={(e) => RemoveLink(e, link.id!)}
            >
              <Trash2Icon size={16} />
            </Button>
          </div>
          {link.groupId && (
            <>
              <Chip
                variant="flat"
                color="secondary"
                className="max-sm:hidden max-sm:scale-90 max-sm:origin-left"
                startContent={<PlusIcon size={14} />}
              >
                Shared from{" "}
                {groups.find((group) => group.id === link.groupId)?.name}
              </Chip>
              <Chip
                variant="flat"
                color="secondary"
                size="sm"
                className="hidden max-sm:flex max-sm:scale-90 max-sm:origin-left"
                startContent={<UsersIcon size={14} />}
              >
                {groups.find((group) => group.id === link.groupId)?.name}
              </Chip>
            </>
          )}
        </div>
      </div>
    </CardBody>
  );
}
