"use server";

import { ServiceResponse } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/server";
import { insertProject } from "@/server/db/queries/insert/projects";
import { getProjects } from "@/server/db/queries/select/projects";
import { getUser } from "@/server/db/queries/select/user";
import { SelectProject } from "@/server/db/schema";

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

export async function fetchProjects(): ServiceResponse<SelectProject[]> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.warn("Error fetching user:", error?.message ?? "User not found");
    return { error: null, data: [] }; // Return an empty array if user fetch fails
  }

  let { data: projectsData, error: projectsError } = await getProjects(user.id);

  if (projectsError || !projectsData) {
    console.warn("Error fetching projects:", projectsError);
    // Return whatever data is available or empty array, while logging the error
    return { error: null, data: [] };
  }

  projectsData = await Promise.all(
    projectsData.map(async (project) => {
      const { data: userData } = await getUser(project.created_by);
      return {
        ...project,
        created_by: userData?.username || project.created_by,
      };
    }),
  );

  return { error: null, data: projectsData };
}
