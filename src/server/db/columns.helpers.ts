import { uuid } from "drizzle-orm/pg-core";
import { user } from "./schema/user";

export const id = () =>
  uuid()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID());

export const user_id = () =>
  uuid().references(() => user.id, { onDelete: "cascade" });
