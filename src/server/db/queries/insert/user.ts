import { ServiceResponse } from "@/lib/definitions";
import { db } from "../..";
import { InsertUser, user } from "../../schema/user";

export async function insertUser(data: InsertUser): ServiceResponse {
  try {
    await db.insert(user).values(data);
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }

  return { error: null, data: null };
}
