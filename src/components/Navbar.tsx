"use client"
import AuthButton from "~/components/AuthButton";
import { Avatar, Button, Divider, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from 'next/link'

export default  function Navbar() {

  const session = useSession()

  return (
    <div className="flex h-20 justify-center">
      <div className="flex w-10/12 items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-medium">linkmmik</h1>
        </Link>
        <div className="flex gap-3">
          {session.data?.user ? (
            <div className="flex items-center gap-5">
              <Button color="primary" as={Link} href="/links">link library</Button>
              <Divider orientation="vertical"/>
              <Popover placement="bottom">
                <PopoverTrigger>
                  <Avatar src={session.data?.user?.image ?? ""} />
                </PopoverTrigger>
                <PopoverContent>
                  <p className="text-lg">{session.data.user.name}</p>
                  <AuthButton />
                </PopoverContent>
              </Popover>
            </div>
          ) :
          <Button onClick={() => signIn()} color="primary" variant="shadow">Sign in</Button> }
        </div>
      </div>
    </div>
  );
}