import { Card, CardBody } from "@nextui-org/card";
import type { Link as LinkType } from "~/types";
import { Fragment } from "react";
import Link from "next/link";
import { Divider } from "@nextui-org/react";
import { auth } from "~/server/auth";
import { selectAllLinks } from "~/server/db/links";
import {redirect} from "next/navigation";

const BASE_URL = process.env.BASE_URL;

export default async function LinkList() {

  const session = await auth()
  const links = session?.user?.id ? await selectAllLinks(session?.user?.id) : null

  if (!links) {
    redirect("/")
  }

  return (
    <div className="flex justify-center flex-col items-center">
      <p className="m-2">Links page</p>
      <div className="flex flex-col gap-1 w-2/3 max-sm:w-11/12">
        <Card>
          {links.reverse().map((link: LinkType) =>
            <Fragment key={link.shortUrl}>
              <CardBody as={Link} target="_blank" href={`${BASE_URL}/${link.shortUrl ?? ""}`}>
                <p>Short url key: {link.shortUrl}</p>
                <p>Long Url {link.longUrl}</p>
                <p>Click to open</p>
              </CardBody>
              <Divider />
            </Fragment>
          )}
        </Card>
      </div>
    </div>
  )
}