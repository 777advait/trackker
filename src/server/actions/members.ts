"use server";

import { ServiceResponse } from "@/lib/definitions";
import { SelectMember } from "../db/schema";
import { getMember, getMembers, getUser } from "../db/queries/select";

export async function fetchMembers(
  project_id: string,
): ServiceResponse<(SelectMember & { name: string })[]> {
  const { data: membersData, error: membersError } =
    await getMembers(project_id);

  if (membersError || !membersData) {
    return {
      error: membersError ?? "Error fetching members",
      data: null,
    };
  }

  const data = membersData.map(async (member) => {
    const { data: userData, error: userError } = await getUser(member.user_id);

    if (userError || !userData) {
      return {
        ...member,
        name: "Error fetching user",
      };
    }

    return {
      ...member,
      name: userData.name as string,
    };
  });

  return {
    error: null,
    data: await Promise.all(data),
  };
}

export async function fetchMember(id: string): ServiceResponse<SelectMember> {
  const { data: memberData, error: memberError } = await getMember(id);

  if (memberError || !memberData) {
    return {
      error: memberError ?? "Error fetching member",
      data: null,
    };
  }

  return { error: null, data: memberData };
}