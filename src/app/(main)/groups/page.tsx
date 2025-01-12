import Groups from "~/components/Groups";
import {GetAllGroupsById} from "~/server/actions/groupActions";

export default async function GroupsPage() {

  const groups = await GetAllGroupsById()

  if (groups === undefined) return

  return<Groups groups={groups}/>
}