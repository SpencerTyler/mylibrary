"use server";

import { drizzle } from "drizzle-orm/neon-http";
import { collectionEntry, googleVolume } from "@/db/schema";
import { ActionResult, success, error } from "./action_result";
import { eq } from "drizzle-orm";
import { fetchBook } from "./googleapi";
import { format, parse } from "date-fns";
import { Book } from "@/models/books";

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

    const existingVolume = await db
      .select()
      .from(googleVolume)
      .where(eq(googleVolume.id, id));
    if (existingVolume.length === 0) {
      const newBook = await fetchBook(id);
      await db
        .insert(googleVolume)
        .values({
          id: newBook.googleId,
          title: newBook.title,
          authors: newBook.authors,
          thumbnail: newBook.thumbnail ?? null,
          pageCount: newBook.pageCount,
          publisher: newBook.publisher,
          publishedDate: newBook.publishedDate
            ? format(newBook.publishedDate, "yyyy-MM-dd")
            : null,
          description: newBook.description,
          categories: newBook.categories,
        })
        .onConflictDoNothing();
    }

    await db.insert(collectionEntry).values({ googleId: id });
    console.log("adding", id);

    return success();
  } catch (err) {
    console.error(err);
    return error("Failed to add book to collection");
  }
}

export async function removeBook(id: string): Promise<ActionResult> {
  try {
    console.log("removing", id);
    const db = getDb();
    const existing = await db
      .select()
      .from(collectionEntry)
      .where(eq(collectionEntry.googleId, id));
    if (existing.length === 0) {
      return error("Book not in collection");
    }
    await db.delete(collectionEntry).where(eq(collectionEntry.googleId, id));

    return success();
  } catch (err) {
    console.error(err);
    return error("Failed to remove book from collection");
  }
}

export async function getBooks(): Promise<ActionResult<Book[]>> {
  try {
    const db = getDb();
    const existing = await db
      .select()
      .from(collectionEntry)
      .innerJoin(googleVolume, eq(collectionEntry.googleId, googleVolume.id));
    const books = existing.map(({ googleVolumes }) => ({
      googleId: googleVolumes.id,
      title: googleVolumes.title,
      authors: googleVolumes.authors,
      thumbnail: googleVolumes.thumbnail ?? undefined,
      pageCount: googleVolumes.pageCount,
      publisher: googleVolumes.publisher,
      publishedDate: googleVolumes.publishedDate
        ? parse(googleVolumes.publishedDate, "yyyy-MM-dd", new Date())
        : undefined,
      description: googleVolumes.description,
      categories: googleVolumes.categories,
    }));
    return success(books);
  } catch (err) {
    console.error(err);
    return error("Failed to get books from collection");
  }
}
