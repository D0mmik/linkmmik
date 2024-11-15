import { Card, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import { auth } from "~/server/auth";
import { selectAllLinks } from "~/server/db/links";
import { Fragment } from "react";
import { type Link as LinkType } from "~/types";
import Link from "next/link";

const BASE_URL = process.env.BASE_URL;

export default async function Links() {
  const session = await auth()
  const links = session?.user?.id ? await selectAllLinks(session?.user?.id) : null

  if (!links) {
    return null
  }

  return(
    <div className="flex justify-center flex-col items-center">
      Links page
      <div className="flex flex-col gap-1 w-2/3">
        <Card>
          {links.map((link: LinkType) =>
            <Fragment key={link.id}>
              <CardBody as={Link} target="_blank" href={`${BASE_URL}/${link.shortUrl ?? ""}`}>
                <p>{link.shortUrl}</p>
                <p>{link.longUrl}</p>
                <p>{link.userId}</p>
              </CardBody>
              <Divider />
            </Fragment>
          )}
        </Card>
      </div>
    </div>
  )
}