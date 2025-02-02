"use client";
import { Card } from "@nextui-org/card";
import type {Category, Group, Link as LinkType} from "~/types";
import { Fragment, useState } from "react";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import Categories from "~/components/Categories";
import LinkRow from "~/components/LinkRow";
import { Search } from "lucide-react";

export default function LinkList({
  unfilteredLinks,
  categories,
  groups
}: {
  unfilteredLinks: LinkType[];
  categories: Category[];
  groups: Group[];
}) {
  const [filter, setFilter] = useState<string>();
  const [category, setCategory] = useState<Category>()

  const links = (links: LinkType[]) => {
    return links.filter((link) => {
      const matchesFilter = !(
        filter &&
        !link.title?.toLowerCase().includes(filter) &&
        !link.description?.toLowerCase().includes(filter) &&
        !link.longUrl?.toLowerCase().includes(filter)
      );

      const matchesCategory = !category ||
        link.categories?.some(cat => cat.id === category.id);

      return matchesFilter && matchesCategory;
    });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Input
          startContent={<Search size="18" />}
          placeholder="filter your links"
          onChange={(e) => setFilter(e.target.value)}
        />
        <p className="ml-2 flex w-20 items-center">
          {unfilteredLinks.length} links
        </p>
      </div>
      <Categories categories={categories} setCategoryFunction={setCategory}/>
      {unfilteredLinks.length === 0 && (
        <p className="text-center text-lg">you have no links</p>
      )}
      <Card>
        {links(unfilteredLinks).map((link: LinkType) => (
          <Fragment key={link.shortUrl}>
            <LinkRow link={link} categories={categories} groups={groups} />
            <Divider />
          </Fragment>
        ))}
      </Card>
    </>
  );
}
