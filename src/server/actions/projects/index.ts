"use server";

import { ServiceResponse } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/server";
import { insertProject } from "@/server/db/queries/insert/projects";

export async function createProject(name: string): ServiceResponse {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { error: error?.message ?? "User not found", data: null };
  }

  const { error: insertError } = await insertProject({
    name,
    created_by: user.id,
  });

  if (insertError) {
    return { error: insertError, data: null };
  }

  return { error: null, data: null };
}
