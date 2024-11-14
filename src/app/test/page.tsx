"use client"
import { useSession } from "next-auth/react";


export default function HomePage() {

  const session = useSession()
  return (
    <>
      {JSON.stringify(session, null, 2)}
    </>
  );
}
