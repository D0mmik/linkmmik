import {Trash2Icon, UsersIcon} from "lucide-react";
import { type Group } from "~/types";
import { AddGroupToLink } from "~/server/db/links";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import {removeMember} from "~/server/db/groups";
import {auth} from "~/server/auth";
import {useSession} from "next-auth/react";
import {DeleteMember} from "~/server/actions/groupActions";

export default function AddGroup({
  linkId,
  groups,
}: {
  linkId: number;
  groups: Group[];
}) {

  const session = useSession()

  if (session.data?.user?.id == undefined) return "login"

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="light"
          className="opacity-0 transition-opacity group-hover:opacity-100 max-sm:opacity-100"
          size="sm"
          isIconOnly
          onClick={(e) => e.preventDefault()}
        >
          <UsersIcon size={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {groups?.map((group) => (
          <DropdownItem
            key={group.id ?? undefined}
            onClick={() => AddGroupToLink(linkId, group.id ?? undefined)}
          >
            <div className="flex items-center justify-between">
              <p>{group.name}</p>
              <Button
                color="danger"
                variant="light"
                size="sm"
                onClick={() => DeleteMember(group.id!)}
                isIconOnly
                className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ease-in-out p-0 m-0"
              >
                <Trash2Icon size={14}/>
              </Button>
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
