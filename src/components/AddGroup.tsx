import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { PlusIcon } from "lucide-react";
import { type Group } from "~/types";
import {AddGroupToLink} from "~/server/db/links";

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
          variant="flat"
          size="sm"
          className="opacity-0 transition-opacity group-hover:opacity-100"
          startContent={<PlusIcon size={16} />}
          onClick={(e) => e.preventDefault()}
        >
          Add to group
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {groups?.map((group) => (
          <DropdownItem key={group.id ?? undefined} onClick={() => AddGroupToLink(linkId, group.id ?? undefined)}>{group.name}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
