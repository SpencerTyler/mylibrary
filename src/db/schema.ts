import { pgTable, text, serial } from "drizzle-orm/pg-core";

export const collectionEntry = pgTable("collectionEntries", {
  id: serial().primaryKey(),
  googleId: text().unique(),
});
