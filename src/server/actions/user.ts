"use server"

import { ServiceResponse } from "@/lib/definitions";
import { getMember, getUser } from "../db/queries/select";
import { SelectUser } from "../db/schema";

export async function fetchUser(id: string): ServiceResponse<SelectUser> { 
  const { data: userData, error: userError } = await getUser(id);

  if (userError || !userData) {
    return {
      error: userError ?? "Error fetching user",
      data: null,
    };
  }

  return { error: null, data: userData };
}

export async function getUserByMemberId(memberId: string) {
  // Query the `members` table to get `userId` for the given `memberId`
  const { data: memberData, error: memberError } = await getMember(memberId);
  if (memberError || !memberData) {
    return { error: memberError ?? "Error fetching member", data: null };
  }

  // Use `userId` to fetch `username` from the `users` table
  const { data: userData, error: userError } = await getUser(memberData.user_id);
  if (userError || !userData) {
    return { error: userError ?? "Error fetching user", data: null };
  }

  return { error: null, data: userData.username };
}
