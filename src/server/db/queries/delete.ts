import { ServiceResponse } from "@/lib/definitions";
import { db } from "..";
import { projects } from "../schema";
import { eq } from "drizzle-orm";

export async function deleteProject(id: string): ServiceResponse {
  try {
    await db.delete(projects).where(eq(projects.id, id));
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }

  return { error: null, data: null };
}
