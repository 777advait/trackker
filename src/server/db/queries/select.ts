import { ServiceResponse } from "@/lib/definitions";
import {
  issues,
  members,
  projects,
  SelectIssue,
  SelectMember,
  SelectProject,
  SelectUser,
  user,
} from "../schema";
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
      console.error("Error fetching user:", error.message);
      return { error: error.message, data: null };
    }
  }

  return { error: null, data: data ?? null };
}

export async function getProject(id: string): ServiceResponse<SelectProject> {
  let data: SelectProject | undefined = undefined;

  try {
    data = await db.query.projects.findFirst({ where: eq(projects.id, id) });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }
  return { error: null, data: data ?? null };
}

export async function getMembers(
  project_id: string,
): ServiceResponse<SelectMember[]> {
  let data: SelectMember[] = [];

  try {
    data = await db.query.members.findMany({
      where: eq(members.project_id, project_id),
    });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }

  return { error: null, data };
}

export async function getMember(id: string): ServiceResponse<SelectMember> {
  let data: SelectMember | undefined = undefined;

  try {
    data = await db.query.members.findFirst({ where: eq(members.id, id) });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }
  return { error: null, data: data ?? null };
}

export async function getIssues(
  project_id: string,
): ServiceResponse<SelectIssue[]> {
  let data: SelectIssue[] = [];

  try {
    data = await db.query.issues.findMany({
      where: eq(issues.project_id, project_id),
    });
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }

  return { error: null, data };
}
