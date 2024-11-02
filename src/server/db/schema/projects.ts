import { pgTable, text, uuid, date } from "drizzle-orm/pg-core";
import { id, user_id } from "../columns.helpers";

export const projects = pgTable("projects", {
  id: id(),
  name: text().notNull(),
  created_by: user_id().notNull(),
  created_at: date().notNull().defaultNow(),
});

export type InsertProject = typeof projects.$inferInsert;
export type SelectProject = typeof projects.$inferSelect;
