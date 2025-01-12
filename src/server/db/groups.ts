"use server";
import { type Group } from "~/types";
import { db } from "~/server/db/index";
import { groupMembers, groups } from "~/server/db/schema";
import {eq, sql} from "drizzle-orm";

export async function insertGroup(group: Group) {
  return db.insert(groups).values(group).returning({ insertedId: groups.id });
}

export async function selectGroupsWithId(userId: string) {
  const memberCountSubquery = sql<number>`(
    SELECT COUNT(*)
    FROM ${groupMembers}
    WHERE ${groupMembers.groupId} = ${groups.id}
  )`.as("memberCount");

  return db
    .select({
      id: groups.id,
      name: groups.name,
      description: groups.description,
      creatorId: groups.creatorId,
      memberCount: memberCountSubquery,
      createdAt: groups.createdAt,
      joinCode: groups.joinCode
    })
    .from(groups)
    .leftJoin(groupMembers, eq(groupMembers.groupId, groups.id))
    .where(eq(groupMembers.memberId, userId));
}

export async function insertMember(memberId: string, groupId: number) {
  return db
    .insert(groupMembers)
    .values({ memberId: memberId, groupId: groupId })
    .execute();
}

export async function selectGroupIdByCode(code: string) {
  return db.query.groups.findFirst({where: eq(groups.joinCode, code), columns: { id: true }})
}
