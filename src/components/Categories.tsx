import {Button, Chip, Input, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import {PlusIcon} from "lucide-react";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {CreateCategory, GetCategories} from "~/server/actions";
import {Category} from "~/types";

export default function Categories({categories} : {categories: Category[]}) {

  const [name, setName] = useState("")
  const session = useSession()

  async function create() {
    await CreateCategory({name: name, userId: session.data?.user?.id ?? "", color: 1})
  }

  return(
    <div className="flex justify-between items-center">
      <div className="my-2 flex items-center gap-1.5">
        {categories.map((category) => <Chip key={category.name}>{category.name}</Chip>)}
        <Popover placement="right-start">
          <PopoverTrigger>
            <Button variant="light" color="primary" startContent={<PlusIcon size="18"/>}>
              Add
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              <p className="text-lg">Add new category</p>
              <Input placeholder="new category" onChange={(e) => setName(e.target.value)}/>
              <Button color="primary" variant="shadow" className="my-2" onClick={() => create()}>Create</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Button variant="light" color="primary">
        Join a Group
      </Button>
    </div>
  )
}