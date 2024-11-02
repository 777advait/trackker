import { InsertProject, projects, SelectProject } from "../../schema";
import { ServiceResponse } from "@/lib/definitions";
import { db } from "../..";

export async function insertProject(
  data: InsertProject,
): ServiceResponse<SelectProject> {
  let project: SelectProject | undefined;

  try {
    project = (await db.insert(projects).values(data).returning())[0];
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }

  return { error: null, data: project ?? null };
}
