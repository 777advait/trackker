"use server";

import { ServiceResponse, UpdateIssue } from "@/lib/definitions";
import { insertIssue } from "../db/queries/insert";
import { InsertIssue, SelectIssue } from "../db/schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { getIssues } from "../db/queries/select";
import { updateIssue } from "../db/queries/update";
import { deleteIssue } from "../db/queries/delete";

export async function createIssue(
  data: Omit<InsertIssue, "created_by">,
): ServiceResponse<SelectIssue> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: authError?.message ?? "Unauthorised", data: null };
  }

  const { data: issueData, error } = await insertIssue({
    ...data,
    created_by: user.id,
  });

  if (error) {
    return { error: error, data: null };
  }

  revalidatePath(`/project/${data.project_id}/issues`);

  return { error: null, data: issueData };
}

export async function fetchIssues(
  project_id: string,
): ServiceResponse<SelectIssue[]> {
  const { data: issuesData, error: issuesError } = await getIssues(project_id);

  if (issuesError || !issuesData) {
    return {
      error: issuesError ?? "Error fetching issues",
      data: null,
    };
  }

  return { error: null, data: issuesData };
}

export async function updateIssueAction(
  issueData: UpdateIssue,
): ServiceResponse {
  const { error } = await updateIssue(issueData);

  if (error) {
    return { error: error, data: null };
  }

  revalidatePath(`/project/${issueData.project_id}/issues`);

  return { error: null, data: null };
}

export async function deleteIssueAction(
  issueData: SelectIssue,
): ServiceResponse {
  const { error } = await deleteIssue(issueData.id);

  if (error) {
    return { error: error, data: null };
  }

  revalidatePath(`/project/${issueData.project_id}/issues`);

  return { error: null, data: null };
}

export async function fetchRecentIssues(
  user_id: string,
): ServiceResponse<SelectIssue[]> {
  const { data: issuesData, error: issuesError } = await getIssues(user_id);

  if (issuesError || !issuesData) {
    return {
      error: issuesError ?? "Error fetching issues",
      data: null,
    };
  }

  return { error: null, data: issuesData };
}
