import {Button, Chip} from "@nextui-org/react";
import { Trash2Icon, PlusIcon } from "lucide-react";
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
      className="group py-3 transition-colors hover:bg-default-100"
    >
      <div className="flex gap-4">
        {link.imageUrl && (
          <div className="flex-shrink-0">
            <img
              className="h-24 w-40 rounded-xl object-cover max-sm:h-16 max-sm:w-24"
              src={link.imageUrl}
              alt={link.title!}
            />
          </div>
        )}
        <div className="flex min-w-0 flex-grow flex-col justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              {link.favicon && (
                <img
                  src={link.favicon}
                  className="h-4 w-4 rounded-sm"
                  alt={`${link.title} favicon`}
                />
              )}
              <h3 className="truncate text-lg font-medium">{link.title}</h3>
            </div>
            <p className="line-clamp-2 text-sm text-default-500 max-sm:line-clamp-1">
              {link.description}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <LinkChip url={url} />
            {link.categories?.map((category, i) => (
              <Chip key={i} color={getColor(category.color!)}>
                {category.name}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-shrink-0 flex-col items-end justify-between gap-2">
          <div className="flex gap-2">
            <AddGroup linkId={link.id} groups={groups} />
            <AddTag linkId={link.id} categories={categories} />
            <Button
              color="danger"
              variant="light"
              className="opacity-0 transition-opacity group-hover:opacity-100 max-sm:hidden"
              isIconOnly
              onClick={(e) => RemoveLink(e, link.id!)}
            >
              <Trash2Icon size={16} />
            </Button>
          </div>
          {link.groupId &&
            <Chip
              variant="flat"
              color="secondary"
              startContent={<PlusIcon size={14} />}
            >
              Shared from{" "}
              {groups.find((group) => group.id === link.groupId)?.name}
            </Chip>
          }
        </div>
      </div>
    </CardBody>
  );
}
