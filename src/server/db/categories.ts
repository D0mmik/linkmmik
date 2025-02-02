"use server";
import { type Category } from "~/types";
import { db } from "~/server/db/index";
import { categories } from "~/server/db/schema";
import { eq, inArray } from "drizzle-orm";

export async function insertCategory(category: Category) {
  return db.insert(categories).values(category).execute();
}

export async function deleteCategory(categoryId: number) {
  return db.delete(categories).where(eq(categories.id, categoryId))
}

export async function selectCategories(userId: string) {
  return db.select().from(categories).where(eq(categories.userId, userId));
}
