import LinkList from "~/components/LinkList";
import {auth} from "~/server/auth";
import {selectAllLinks} from "~/server/db/links";
import {redirect} from "next/navigation";

export default async function Links() {

  const session = await auth()
  const links = session?.user?.id ? await selectAllLinks(session?.user?.id) : null

  if (!links) {
    redirect("/")
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-8/12 flex-col gap-1 max-sm:w-11/12">
        <LinkList unfilteredLinks={links.reverse()}/>
      </div>
    </div>
  );
}
