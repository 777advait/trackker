"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { User, Session } from "@supabase/supabase-js";
import { insertUser } from "@/server/db/queries/insert/user";
import { getUser } from "@/server/db/queries/select/user";
import { ServiceResponse } from "@/lib/definitions";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/");
  // Return the verified data in both cases
  return { error: null, data };
}

export async function onboard(data: {
  username: string;
  name: string;
}): ServiceResponse {
  const supabase = await createClient();
  const {
    data: { user: userData },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return { error: error.message, data: null };
  }

  try {
    const existingUser = await db.query.user.findFirst({
      where: eq(user.username, data.username),
    });

    if (existingUser) {
      return { error: "Username already taken", data: null };
    }

    await db
      .update(user)
      .set(data)
      .where(eq(user.id, userData?.id as string));
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message, data: null };
    }
  }

  revalidatePath("/dashboard");
  return { error: null, data: null };
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, message: error.message };
  }

  redirect("/");
}
