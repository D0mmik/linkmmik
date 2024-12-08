"use client"

import { Button } from "@nextui-org/react";
import { DeleteLink } from "~/server/actions";
import { type MouseEvent } from "react";

export function RemoveLink({id} : {id?: number}) {

  async function remove(e: MouseEvent) {
    console.log("autobus")
    e.stopPropagation();
    await DeleteLink(id)
  }


  return (
    <Button color="danger" className="w-40" onClick={(e) => remove(e)}>Remove</Button>
  )
}