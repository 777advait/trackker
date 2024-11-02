import { ServiceResponse } from "@/lib/definitions";
import { InsertMember, members, SelectMember } from "../../schema";
import { db } from "../..";

export async function insertMember(
  data: InsertMember,
): ServiceResponse<SelectMember> {
  let member: SelectMember | undefined;

  try {
    member = (await db.insert(members).values(data).returning())[0];
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }

  return { error: null, data: member ?? null };
}
