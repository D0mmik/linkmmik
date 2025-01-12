import {Button, Chip, Input, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {PlusIcon} from "lucide-react";
import {type Dispatch, type SetStateAction, useState} from "react";
import {useSession} from "next-auth/react";
import {CreateCategory} from "~/server/actions";
import {type Category} from "~/types";
import {getColor} from "~/utils";
import Link from "next/link";

export default function Categories({categories, setCategoryFunction} : {categories: Category[], setCategoryFunction: Dispatch<SetStateAction<Category | undefined>>}) {

  const [name, setName] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [activeChip, setActiveChip] = useState(0)

  const session = useSession()

  async function create() {
    if (name.trim()) {
      await CreateCategory({
        name: name.trim(),
        userId: session.data?.user?.id ?? "",
        color: Math.ceil(Math.random() * 4)
      })
      setName("")
      setIsOpen(false)
    }
  }

  function handleSetCategory(index: number){
    setActiveChip(index)
    setCategoryFunction(categories[index - 1])
  }

  const allCategory: Category = { name: "All", id: -1, userId: "", color: 5 };
  const updatedCategories = [allCategory, ...categories];

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-1.5 my-2">
        {updatedCategories.map((category, index) => {
          const active = activeChip === index

          return(
            <Chip
              key={category.id}
              color={getColor(category.color!)}
              variant={active ? "solid" : "light"}
              onClick={() => handleSetCategory(index)}
              className="cursor-pointer"
            >
              {category.name}
            </Chip>
          )
        })}
        <Popover 
          placement="bottom-start" 
          isOpen={isOpen} 
          onOpenChange={setIsOpen}
        >
          <PopoverTrigger>
            <Button
              variant="light"
              color="primary"
              startContent={<PlusIcon size={16} />}
              size="sm"
              className="min-w-[70px]"
            >
              Add
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4 max-w-[90vw] sm:max-w-none">
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg font-medium">Add new category</h3>
                <p className="text-sm text-default-500">
                  Create a new category to organize your links
                </p>
              </div>
              <Input
                placeholder="Category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="bordered"
                labelPlacement="outside"
                autoFocus
                classNames={{
                  input: "text-sm"
                }}
              />
              <div className="flex justify-end gap-2 mt-1">
                <Button 
                  variant="light" 
                  color="default"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  onClick={create}
                  isDisabled={!name.trim()}
                >
                  Create
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}