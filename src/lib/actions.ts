"use server";

import { drizzle } from "drizzle-orm/neon-http";
import { collectionEntry } from "@/db/schema";
import { ActionResult, success, error } from "./action_result";
import { eq } from "drizzle-orm";

function getDb() {
  return drizzle(process.env.POSTGRES_URL ?? "");
}

export async function addBook(id: string): Promise<ActionResult> {
  try {
    const db = getDb();
    const existing = await db
      .select()
      .from(collectionEntry)
      .where(eq(collectionEntry.googleId, id));
    if (existing.length > 0) {
      return error("Book already in collection");
    }
    await db.insert(collectionEntry).values({ googleId: id });
    console.log("adding", id);

    return success();
  } catch (err) {
    console.error(err);
    return error("Failed to add book to collection");
  }
}

export async function getBooks(): Promise<ActionResult<string[]>> {
  try {
    const db = getDb();
    const existing = await db.select().from(collectionEntry);
    const googleIds = existing
      .map((book) => book.googleId)
      .filter((book): book is string => Boolean(book));
    return success(googleIds);
  } catch (err) {
    console.error(err);
    return error("Failed to get books from collection");
  }
}
