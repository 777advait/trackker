"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function generateOTP(email: string): Promise<{
  success: boolean;
  message: string | null;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });

  console.log("Supabase Response:", data, error);

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: null };
}

export async function verifyOTP(
  email: string,
  token: string,
): Promise<{
  success: boolean;
  message: string | null;
}> {
  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: null };
  
}

export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
}
