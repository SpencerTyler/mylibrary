import { pgTable, text, serial, integer, date } from "drizzle-orm/pg-core";

export const collectionEntry = pgTable("collectionEntries", {
  id: serial().primaryKey(),
  googleId: text()
    .notNull()
    .references(() => googleVolume.id)
    .unique(),
});

export const googleVolume = pgTable("googleVolumes", {
  id: text().primaryKey(),
  title: text().notNull(),
  authors: text().array().notNull(),
  thumbnail: text(),
  pageCount: integer().notNull(),
  publisher: text().notNull(),
  publishedDate: date(),
  description: text().notNull(),
  categories: text().array().notNull(),
});
