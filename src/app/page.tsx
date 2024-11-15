import NewUrlInput from "~/components/NewUrlInput";
import { selectAllLinks } from "~/server/db/links";
import { auth } from "~/server/auth";

export default async function HomePage() {
  const session = await auth()
  const links = session?.user?.id ? await selectAllLinks(session?.user?.id) : null

  return (
    <div className="flex justify-center mt-32">
      <div className="w-1/2">
        <NewUrlInput />
        {JSON.stringify(links)}
      </div>
    </div>
  );
}
