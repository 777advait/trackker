import { ServiceResponse } from "@/lib/definitions";
import { projects, SelectProject } from "../../schema";
import { db } from "../..";
import { eq } from "drizzle-orm";

export async function getProjects(
  userId: string,
): ServiceResponse<SelectProject[]> {
  let projectsData: SelectProject[] = [];
  try {
    projectsData = await db
      .select()
      .from(projects)
      .where(eq(projects.created_by, userId));
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }

  return { error: null, data: projectsData };
}
