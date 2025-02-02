import { signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/button";
import {auth} from "~/server/auth";

export default async function AuthButton() {

  const session = await auth()

  if (session?.user) {
    return (
      <Button onClick={() => signOut()} variant="light" color="danger">Sign Out</Button>
    )
  }

  return(
    <Button onClick={() => signIn()} color="primary" variant="shadow">Sign in</Button>
  )

}