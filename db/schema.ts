import { pgTable, text } from "drizzle-orm/pg-core";

export const collectionEntry = pgTable("collectionEntries", {
  googleId: text(),
});
