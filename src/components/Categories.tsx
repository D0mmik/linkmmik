import {Button, Chip, Input, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {PlusIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {CreateCategory, GetCategories} from "~/server/actions";
import {Category} from "~/types";

export default function Categories({categories} : {categories: Category[]}) {

  const [name, setName] = useState("")
  const [activeChip, setActiveChip] = useState(0)

  const session = useSession()

  async function create() {
    await CreateCategory({name: name, userId: session.data?.user?.id ?? "", color: Math.ceil(Math.random() * 4)})
  }

  const allCategory: Category = { name: "All", id: -1, userId: "", color: 5 };
  const updatedCategories = [allCategory, ...categories];

  function getColor(id: number) {
    switch (id) {
      case 0:
        return "primary";
      case 1:
        return "secondary";
      case 2:
        return "success";
      case 3:
        return "warning";
      case 4:
        return "danger";
      default:
        return "default";
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="my-2 flex items-center gap-1.5">
        {updatedCategories.map((category, index) => {

          const active = activeChip === index

          return(
            <Chip
              key={category.id}
              color={getColor(category.color)}
              variant={active ? "solid" : "light"}
              onClick={() => setActiveChip(index)}
              className="cursor-pointer"
            >
              {category.name}
            </Chip>
          )
        })}
        <Popover placement="right-start">
          <PopoverTrigger>
            <Button
              variant="light"
              color="primary"
              startContent={<PlusIcon size="18" />}
            >
              Add
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <p className="text-lg">Add new category</p>
              <Input
                placeholder="new category"
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                color="primary"
                variant="shadow"
                className="my-2"
                onClick={() => create()}
              >
                Create
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Button variant="light" color="primary">
        Join a Group
      </Button>
    </div>
  );
}