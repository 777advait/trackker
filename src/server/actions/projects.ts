"use server";

import { ServiceResponse } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/server";
import { SelectProject } from "@/server/db/schema";
import { insertMember, insertProject } from "../db/queries/insert";
import { getMetrics, getProjects, getUser } from "../db/queries/select";
import { updateProject } from "../db/queries/update";
import { revalidatePath } from "next/cache";
import { deleteProject } from "../db/queries/delete";

export async function createProject(
  name: string,
): ServiceResponse<SelectProject> {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { error: error?.message ?? "User not found", data: null };
  }

  const { data: projectData, error: insertError } = await insertProject({
    name,
    created_by: user.id,
  });

  if (insertError || !projectData) {
    return { error: insertError ?? "Error creating project", data: null };
  }

  const { error: membersError } = await insertMember({
    user_id: user.id,
    project_id: projectData.id,
  });

  if (membersError) {
    return { error: membersError, data: null };
  }

  return { error: null, data: projectData };
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

export async function renameProject(
  projectId: string,
  name: string,
): ServiceResponse {
  const { error } = await updateProject({ id: projectId, name });

  if (error) {
    return { error: error, data: null };
  }

  revalidatePath(`/project/${projectId}/settings`);

  return { error: null, data: null };
}

export async function deleteProjectAction(projectId: string): ServiceResponse {
  const { error } = await deleteProject(projectId);

  if (error) {
    return { error: error, data: null };
  }

  revalidatePath("/dashboard");

  return { error: null, data: null };
}

export async function fetchMetrics(project_id: string) {
  const { data, error } = await getMetrics(project_id);

  if (error) {
    return { data: null, error };
  }

  return { data, error: null };
}
