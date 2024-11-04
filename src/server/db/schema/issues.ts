import { date, pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { id, user_id } from "../columns.helpers";
import { projects } from "./projects";
import { members } from "./members";

export const priority_levels = pgEnum("priority_levels", [
  "Urgent & Important",
  "Urgent & Not Important",
  "Not Urgent & Important",
  "Not Urgent & Not Important",
]);

export const status_levels = pgEnum("status_levels", [
  "Open",
  "In Progress",
  "Closed",
  "In Review",
]);

export const issues = pgTable("issues", {
  id: id(),
  project_id: uuid()
    .references(() => projects.id)
    .notNull(),
  assignee: uuid().references(() => members.id),
  created_by: user_id().notNull(),
  title: text().notNull(),
  description: text(),
  priority: priority_levels(),
  status: status_levels().notNull().default("Open"),
  deadline: date(),
});

export type SelectIssue = typeof issues.$inferSelect;
export type InsertIssue = typeof issues.$inferInsert;
