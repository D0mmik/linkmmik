"use client";
import { Card, CardBody } from "@nextui-org/card";
import type {Category, Link as LinkType} from "~/types";
import {Fragment, type MouseEvent, useState} from "react";
import {Button, Chip, Divider, Input, Select, SelectItem} from "@nextui-org/react";
import Categories from "~/components/Categories";
import LinkRow from "~/components/LinkRow";

export default function LinkList({
  unfilteredLinks,
  categories
}: {
  unfilteredLinks: LinkType[];
  categories: Category[]
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
      <div className="flex items-center gap-2">
        <Input
          placeholder="filter your links"
          onChange={(e) => setFilter(e.target.value)}
        />
        <Select className="w-80" defaultSelectedKeys={["time"]}>
          <SelectItem key={"time"}>Sort by time</SelectItem>
        </Select>
        <p className="w-20 items-center flex ml-2">{unfilteredLinks.length} links</p>
      </div>
      <Categories categories={categories}/>
      {unfilteredLinks.length === 0 && (
        <p className="text-center text-lg">you have no links</p>
      )}
      <Card>
        {links(unfilteredLinks).map((link: LinkType) => (
          <Fragment key={link.shortUrl}>
            <LinkRow link={link}/>
            <Divider />
          </Fragment>
        ))}
      </Card>
    </>
  );
}
