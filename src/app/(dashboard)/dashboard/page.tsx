// "use client"

import React from "react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  return (
    <div className="">
      <div>Authenticated: {data.user?.email || "not authenticated"}</div>
      <div className="">{data.user ? <Button>Sign out</Button> : null}</div>
    </div>
  );
}
