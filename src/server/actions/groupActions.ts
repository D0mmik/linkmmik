"use server";

import { type Group } from "~/types";
import {
  insertGroup,
  insertMember, selectGroupIdByCode,
  selectGroupsWithId,
} from "~/server/db/groups";
import { auth } from "~/server/auth";
import { revalidatePath } from "next/cache";

export async function CreateGroup(group: Group) {
  const session = await auth();
  if (session?.user?.id === undefined) return;

  group.creatorId = session?.user?.id;
  group.joinCode = Math.ceil(Math.random() * 10000).toString();

  const result = await insertGroup(group);
  if (!result[0]) return;
  const { insertedId } = result[0];
  await insertMember(session?.user?.id, insertedId);
  revalidatePath("groups");
}

export async function JoinGroup(code: string) {
  const session = await auth();
  if (session?.user?.id === undefined) return;

  const group = await selectGroupIdByCode(code);
  if (!group?.id) return;

  await insertMember(session?.user?.id, group.id);
}

export async function GetAllGroupsById() {
  const session = await auth();
  if (session?.user?.id === undefined) return;

  return await selectGroupsWithId(session.user.id);
}
