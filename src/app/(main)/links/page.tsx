import LinkList from "~/components/LinkList";
import {auth} from "~/server/auth";
import {selectAllLinks} from "~/server/db/links";
import {redirect} from "next/navigation";
import {selectCategories} from "~/server/db/categories";
import {selectGroupsWithId} from "~/server/db/groups";

export default async function Links() {
  const session = await auth()

  const userId = session?.user?.id
  if (!userId) return <p>login</p>

  const links = await selectAllLinks(userId)
  const categories = await selectCategories(userId)
  const groups = await selectGroupsWithId(userId)

  if (!links) {
    redirect("/")
  }

  return (
    <div className="flex flex-col items-center justify-center sm:mt-4">
      <div className="w-full max-w-6xl px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-4xl font-bold">Your Links</h1>
        </div>
        <LinkList unfilteredLinks={links.reverse()} categories={categories} groups={groups}/>
      </div>
    </div>
  );
}
