import Groups from "~/components/Groups";
import {GetAllGroupsById} from "~/server/actions/groupActions";
import {auth} from "~/server/auth";
import {redirect} from "next/navigation";

export default async function GroupsPage() {

  const session = await auth()
  if (session === null) redirect("/")

  const groups = await GetAllGroupsById()

  if (groups === undefined)
    return (
      <div className="flex justify-center error">
        <p>Groups are empty</p>
      </div>
    );

  return <Groups groups={groups} />;
}