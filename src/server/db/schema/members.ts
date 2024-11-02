import { pgTable, text, uuid, timestamp } from "drizzle-orm/pg-core";
import { id, user_id } from "../columns.helpers";
import { projects } from "./projects";

export const members = pgTable("members", {
  id: id(),
  user_id: user_id().notNull(),
  project_id: uuid()
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  roles: text().array(),
  joined_at: timestamp().notNull().defaultNow(),
});

export type InsertMember = typeof members.$inferInsert;
export type SelectMember = typeof members.$inferSelect;
