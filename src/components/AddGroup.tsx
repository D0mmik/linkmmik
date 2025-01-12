import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { UsersIcon } from "lucide-react";
import { type Group } from "~/types";
import { AddGroupToLink } from "~/server/db/links";

export default function AddGroup({
  linkId,
  groups,
}: {
  linkId: number;
  groups: Group[];
}) {
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
            {group.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
