import { ServiceResponse } from "@/lib/definitions";
import {
  InsertIssue,
  InsertMember,
  InsertProject,
  InsertUser,
  SelectIssue,
  SelectMember,
  SelectProject,
  SelectUser,
  user,
  issues,
  members,
  projects,
} from "../schema";
import { db } from "../";

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

export async function insertUser(
  data: InsertUser,
): ServiceResponse<SelectUser> {
  let userData: SelectUser | undefined;

  try {
    userData = (await db.insert(user).values(data).returning())[0];
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }

  return { error: null, data: userData ?? null };
}

export async function insertIssue(
  data: InsertIssue,
): ServiceResponse<SelectIssue> {
  let issue: SelectIssue | undefined;

  try {
    issue = (await db.insert(issues).values(data).returning())[0];
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }
  return { error: null, data: issue ?? null };
}
