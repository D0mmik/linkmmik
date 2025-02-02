import AuthButton from "~/components/AuthButton";
import {Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { signIn } from "next-auth/react";
import Link from 'next/link'
import {Button} from "@nextui-org/button";
import {Divider} from "@nextui-org/divider";
import {Avatar} from "@nextui-org/avatar";
import {auth} from "~/server/auth";

export default async function Navbar() {

  const session = await auth()

  return (
    <div className="flex h-20 justify-center sticky top-0 z-10 bg-white">
      <div className="flex w-10/12 items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-medium">linkmmik</h1>
        </Link>
        <div className="flex gap-3">
          {session?.user? (
            <div className="flex items-center sm:gap-5">
              <Button className="max-sm:hidden font-medium" color="primary" variant="shadow" as={Link} href="/" prefetch>New Link</Button>
              <Button color="primary" variant="light" as={Link} href="/links" className="font-medium max-sm:hidden" prefetch>Your Links</Button>
              <Button color="primary" variant="light" as={Link} href="/groups" className="font-medium max-sm:hidden" prefetch>Groups</Button>
              <Divider orientation="vertical" className="mx-2 max-sm:hidden"/>
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Avatar src={session?.user?.image ?? ""} />
                </PopoverTrigger>
                <PopoverContent>
                  <p className="text-lg">{session?.user?.name}</p>
                  <Button color="primary" variant="light" as={Link} href="/" className="font-medium" prefetch>New Link</Button>
                  <Button color="primary" variant="light" as={Link} href="/links" className="font-medium" prefetch>Your Links</Button>
                  <Button color="primary" variant="light" as={Link} href="/groups" className="font-medium" prefetch>Groups</Button>
                  <AuthButton />
                </PopoverContent>
              </Popover>
            </div>
          ) :
          <AuthButton/> }
        </div>
      </div>
    </div>
  );
}