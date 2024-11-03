import { ServiceResponse } from "@/lib/definitions";
import { projects, SelectProject, SelectUser, user } from "../schema";
import { db } from "../";
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
