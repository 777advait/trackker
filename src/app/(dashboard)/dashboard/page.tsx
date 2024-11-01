import UserAvatar from "@/components/Dashboard/UserAvatar";
import { GalleryHorizontalEnd } from "lucide-react";
import React from "react";

export default function Page() {
  return (
    <main>
      <header className="flex items-center justify-between px-8  py-4 border-b ">
        <div className="flex gap-2.5">
          <span>
            <GalleryHorizontalEnd className="h-10 w-10 text-accent" />
          </span>
          <h1 className="font-labil text-3xl">Dashboard</h1>
        </div>
        <UserAvatar />
      </header>
    </main>
  );
}
