import { eq } from "drizzle-orm";
import { db } from "../..";
import { SelectUser, user } from "../../schema";
import { ServiceResponse } from "@/lib/definitions";

export async function getUser(id: string): ServiceResponse<SelectUser | null> {
  let data: SelectUser | undefined = undefined;

  try {
    data = await db.query.user.findFirst({ where: eq(user.id, id) });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }

  return { error: null, data: data || null };
}
