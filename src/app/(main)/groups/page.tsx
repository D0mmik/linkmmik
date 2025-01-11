"use client"
import {Card} from "@nextui-org/card";
import {Button} from "@nextui-org/react";
import {PlusIcon} from "lucide-react";

export default function GroupsPage() {
  return(
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-8/12 flex-col gap-1 max-sm:w-11/12">
        <h1 className="text-2xl">Your Groups</h1>
        <Card className="w-60 h-60 flex justify-center items-center">
          <Button variant="light" color="primary" endContent={<PlusIcon size="18"/>}>Create new group</Button>
        </Card>
      </div>
    </div>
  )
}