import { Card, CardBody } from "@nextui-org/card";
import type { Link as LinkType } from "~/types";
import { Fragment } from "react";
import Link from "next/link";
import { Button, Divider } from "@nextui-org/react";
import { auth } from "~/server/auth";
import { selectAllLinks } from "~/server/db/links";
import {redirect} from "next/navigation";
import { RemoveLink } from "~/components/RemoveLink";

const BASE_URL = process.env.BASE_URL;

export default async function LinkList() {

  const session = await auth()
  const links = session?.user?.id ? await selectAllLinks(session?.user?.id) : null

  if (!links) {
    redirect("/")
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="m-2">Links page</p>
      <div className="flex w-2/3 flex-col gap-1 max-sm:w-11/12">
        <Card>
          {links.reverse().map((link: LinkType) => (
            <Fragment key={link.shortUrl}>
              <CardBody
                //as={Link}
                //target="_blank"
                //href={`${BASE_URL}/${link.shortUrl ?? ""}`}
              >
                <p>Short url key: {link.shortUrl}</p>
                <p>Long Url {link.longUrl}</p>
                <p>Click to open</p>
                <p>{link.description}</p>
                <div className="w-40 h-40">
                  <img src={link.imageUrl ?? undefined} className="rounded-2xl"></img>
                </div>
                <RemoveLink id={link.id}/>
              </CardBody>
              <Divider />
            </Fragment>
          ))}
        </Card>
      </div>
    </div>
  );
}