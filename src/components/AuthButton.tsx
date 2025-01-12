"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";

export default function AuthButton() {

  const session = useSession()

  if (session.data?.user) {
    return (
      <Button onClick={() => signOut()} variant="light">Sign Out</Button>
    )
  }

  return(
    <Button onClick={() => signIn()} color="primary" variant="shadow">Sign in</Button>
  )

}