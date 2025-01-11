import LinkList from "~/components/LinkList";
import {auth} from "~/server/auth";
import {selectAllLinks} from "~/server/db/links";
import {redirect} from "next/navigation";
import {selectCategories} from "~/server/db/categories";

export default async function Links() {

  const session = await auth()
  const links = session?.user?.id ? await selectAllLinks(session?.user?.id) : null
  const categories = [
    { id: 1, name: "Work", color: 1, userId: "user1" },
    { id: 2, name: "Personal", color: 2, userId: "user1" },
    { id: 3, name: "Fitness", color: 3, userId: "user1" },
    { id: 4, name: "Shopping", color: 4, userId: "user1" },
    { id: 5, name: "Travel", color: 0, userId: "user1" }
  ];

  if (!links) {
    redirect("/")
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-8/12 flex-col gap-1 max-sm:w-11/12">
        <LinkList title="Your Groups" unfilteredLinks={links.reverse()} categories={categories}/>
      </div>
    </div>
  );
}
