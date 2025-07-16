"use server";

import { drizzle } from "drizzle-orm/neon-http";
import { collectionEntry } from "@/db/schema";
import { ActionResult, success, error } from "./action_result";
import { eq } from "drizzle-orm";

export async function addBook(id: string): Promise<ActionResult> {
  try {
    const db = drizzle(process.env.POSTGRES_URL ?? "");
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
