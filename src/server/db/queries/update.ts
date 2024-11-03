import { ServiceResponse, UpdateProject } from "@/lib/definitions";
import { db } from "..";
import { projects, SelectProject } from "../schema";
import { eq } from "drizzle-orm";

export async function updateProject(data: UpdateProject): ServiceResponse {
  const { id, ...updateData } = data;

  const filteredData = Object.fromEntries(
    Object.entries(updateData).filter(([_, value]) => value !== undefined),
  );

  try {
    await db.update(projects).set(filteredData).where(eq(projects.id, data.id));
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }

  return { error: null, data: null };
}
