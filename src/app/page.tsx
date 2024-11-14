import { auth } from "~/server/auth";

export default async function HomePage() {

  const session = await auth()
  return (
    <>
      {JSON.stringify(session, null, 2)}
    </>
  );
}
