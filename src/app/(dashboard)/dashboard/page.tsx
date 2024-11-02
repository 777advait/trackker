import Dashboard from "@/components/Dashboard/Dashboard";
import Onboard from "@/components/Dashboard/Onboard";
import UserAvatar from "@/components/Dashboard/UserAvatar";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/server/db/queries/select/user";
import React from "react";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return <h1>Error</h1>;
  }

  const { data: userData } = await getUser(user.id);

  return (
    <main>
      {userData?.username && userData?.name ? <Dashboard /> : <Onboard />}
    </main>
  );
}
