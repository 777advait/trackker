"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { User, Session } from "@supabase/supabase-js";
import { insertUser } from "@/server/db/queries/insert/user";
import { getUser } from "@/server/db/queries/select/user";
import { ServiceResponse } from "@/lib/definitions";

export async function generateOTP(email: string): ServiceResponse<{
  user: null;
  session: null;
  messageId?: string | null;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    return { error: error.message, data: null };
  }

  return { error: null, data };
}

export async function verifyOTP(
  email: string,
  token: string,
): ServiceResponse<{
  user: User | null;
  session: Session | null;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    return { error: error.message, data: null };
  }

  if (!data.user) {
    return { error: "Unable to verify OTP", data: null };
  }

  // Check if the user already exists in the database
  const { data: existingUserData, error: existingUserError } = await getUser(
    data.user.id,
  );

  if (existingUserError) {
    return { error: existingUserError, data: null };
  }

  // If the user does not exist, attempt to insert them into the database
  if (!existingUserData) {
    const { error: insertError } = await insertUser({
      id: data.user.id,
      email: data.user.email as string,
      created_at: new Date(data.user.created_at),
    });

    if (insertError) {
      return { error: insertError, data: null };
    }
  }

  // Return the verified data in both cases
  return { error: null, data };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, message: error.message };
  }

  redirect("/");
}
