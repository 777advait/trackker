import { ServiceResponse } from "@/lib/definitions";
import { db } from "..";
import { projects, issues } from "../schema";
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

export async function deleteIssue(id: string): ServiceResponse {
  try {
    await db.delete(issues).where(eq(issues.id, id));
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }
  
  return { error: null, data: null };
}