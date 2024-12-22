"use client";
import { Card, CardBody } from "@nextui-org/card";
import type { Link as LinkType } from "~/types";
import {Fragment, type MouseEvent, useState} from "react";
import Link from "next/link";
import { Button, Divider, Input } from "@nextui-org/react";
import {DeleteLink} from "~/server/actions";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export default function LinkList({
  unfilteredLinks,
}: {
  unfilteredLinks: LinkType[];
}) {
  const [filter, setFilter] = useState<string>();
  const links = (links: LinkType[]) => {
    if (!filter) return links;
    return links.filter(
      (link) =>
        !(
          !link.title?.toLowerCase().includes(filter) &&
          !link.description?.toLowerCase().includes(filter) &&
          !link.longUrl?.toLowerCase().includes(filter)
        ),
    );
  };

  const RemoveLink = async (e: MouseEvent, id: number) => {
    e.preventDefault()
    console.log(id)
    await DeleteLink(id)
  }

  return (
    <>
      <Input
        placeholder="filter your links"
        className="my-2"
        onChange={(e) => setFilter(e.target.value)}
      />
      {unfilteredLinks.length === 0 && (
        <p className="text-center text-lg">you have no links</p>
      )}
      <Card>
        {links(unfilteredLinks).map((link: LinkType) => (
          <Fragment key={link.shortUrl}>
            <CardBody
              as={Link}
              target="_blank"
              href={`${BASE_URL}/${link.shortUrl ?? ""}`}
            >
              <div className="justify-between max-sm:flex">
                <h3 className="text-lg font-medium max-sm:w-2/3 max-sm:text-base">
                  {link.title}
                </h3>
                <div className="flex items-center gap-8 max-sm:w-20 max-sm:gap-0">
                  <img
                    className="w-40 rounded-xl max-sm:w-20"
                    src={link.imageUrl!}
                  ></img>
                  <p className="w-full max-sm:hidden">{link.description!}</p>
                  <Button
                    color="danger"
                    variant="flat"
                    className="max-sm:hidden"
                    onClick={(e) => RemoveLink(e, link.id!)}
                  >
                    delete
                  </Button>
                </div>
              </div>
            </CardBody>
            <Divider />
          </Fragment>
        ))}
      </Card>
    </>
  );
}
