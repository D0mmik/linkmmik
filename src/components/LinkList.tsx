"use client";
import { Card } from "@nextui-org/card";
import type { Category, Link as LinkType } from "~/types";
import { Fragment, useState } from "react";
import { Divider, Input, Select, SelectItem } from "@nextui-org/react";
import Categories from "~/components/Categories";
import LinkRow from "~/components/LinkRow";

export default function LinkList({
  title,
  unfilteredLinks,
  categories,
}: {
  title: string;
  unfilteredLinks: LinkType[];
  categories: Category[];
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

  return (
    <>
      <h1 className="text-2xl">{title}</h1>
      <div className="flex items-center gap-2">
        <Input
          placeholder="filter your links"
          onChange={(e) => setFilter(e.target.value)}
        />
        <Select className="w-80" defaultSelectedKeys={["time"]}>
          <SelectItem key={"time"}>Sort by time</SelectItem>
        </Select>
        <p className="ml-2 flex w-20 items-center">
          {unfilteredLinks.length} links
        </p>
      </div>
      <Categories categories={categories} />
      {unfilteredLinks.length === 0 && (
        <p className="text-center text-lg">you have no links</p>
      )}
      <Card>
        {links(unfilteredLinks).map((link: LinkType) => (
          <Fragment key={link.shortUrl}>
            <LinkRow link={link} categories={categories} />
            <Divider />
          </Fragment>
        ))}
      </Card>
    </>
  );
}
