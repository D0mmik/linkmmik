import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { TagIcon } from "lucide-react";
import { Category } from "~/types";
import { getColor } from "~/utils";
import { insertTag } from "~/server/db/tags";
import { useSession } from "next-auth/react";

export default function AddTag({
  linkId,
  categories,
}: {
  linkId: number;
  categories: Category[];
}) {
  const session = useSession();

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
          <TagIcon size={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {categories.map((category) => (
          <DropdownItem
            key={category.id}
            color={getColor(category.color!)}
            onClick={() =>
              insertTag({
                linkId: linkId,
                tagId: category.id!,
                userId: session.data?.user?.id ?? "",
              })
            }
          >
            {category.name}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
