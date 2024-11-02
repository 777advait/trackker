import { ServiceResponse } from "@/lib/definitions";
import { db } from "../..";
import { InsertUser, SelectUser, user } from "../../schema/user";

export async function insertUser(
  data: InsertUser,
): ServiceResponse<SelectUser> {
  let userData: SelectUser | undefined;

  try {
    userData = (await db.insert(user).values(data).returning())[0];
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }

  return { error: null, data: userData ?? null };
}
