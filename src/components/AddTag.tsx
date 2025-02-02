import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {TagIcon, Trash2Icon} from "lucide-react";
import { type Category } from "~/types";
import { getColor } from "~/utils";
import { insertTag } from "~/server/db/tags";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import {DeleteCategory} from "~/server/actions";

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
            <div className="flex items-center justify-between">
              <p>{category.name}</p>
              <Button
                color="danger"
                variant="light"
                size="sm"
                onClick={() => DeleteCategory(category.id!)}
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
