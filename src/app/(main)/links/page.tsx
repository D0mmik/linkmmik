import LinkList from "~/components/LinkList";
import { auth } from "~/server/auth";
import { selectAllLinks } from "~/server/db/links";
import { redirect } from "next/navigation";
import { selectCategories } from "~/server/db/categories";
import { selectGroupsWithId } from "~/server/db/groups";
import {GroupListener} from "~/components/GroupListener";
import {UserListener} from "~/components/UserListener";

export default async function Links() {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) return redirect('/api/auth/signin');

  const [links, categories, groups] = await Promise.all([
    selectAllLinks(userId),
    selectCategories(userId),
    selectGroupsWithId(userId),
  ]);

  if (!links) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center sm:mt-4">
      <div className="w-full max-w-6xl px-4">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-4xl font-bold">Your Links</h1>
        </div>
        <LinkList
          unfilteredLinks={links.reverse()}
          categories={categories}
          groups={groups}
        />
        <GroupListener groups={groups}/>
        <UserListener/>
      </div>
    </div>
  );
}
