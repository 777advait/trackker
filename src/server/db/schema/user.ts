import { uuid, text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid().primaryKey(),
  email: text().unique().notNull(),
  username: text().unique(),
  name: text(),
  created_at: timestamp().notNull().defaultNow(),
});

export type InsertUser = typeof user.$inferInsert;
export type SelectUser = typeof user.$inferSelect;