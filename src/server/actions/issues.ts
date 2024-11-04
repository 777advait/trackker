"use server";

import { ServiceResponse } from "@/lib/definitions";
import { insertIssue } from "../db/queries/insert";
import { InsertIssue, SelectIssue } from "../db/schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

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
