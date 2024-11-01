import Onboard from "@/components/Dashboard/Onboard";
import UserAvatar from "@/components/Dashboard/UserAvatar";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/server/db/queries/select/user";
import { GalleryHorizontalEnd } from "lucide-react";
import { notFound } from "next/navigation";
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
      {userData?.username && userData?.name ? (
        <header className="flex items-center justify-between border-b px-8 py-4">
          <div className="flex gap-2.5">
            <span>
              <GalleryHorizontalEnd className="h-10 w-10 text-accent" />
            </span>
            <h1 className="font-labil text-3xl">Dashboard</h1>
          </div>
          <UserAvatar />
        </header>
      ) : (
        <Onboard />
      )}
    </main>
  );
}
