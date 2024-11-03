import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import UserAvatar from "../Dashboard/UserAvatar";
import { Button } from "../ui/button";
import { Share } from "lucide-react";

export default function Navbar({ projectName }: { projectName: string }) {
  return (
    <header className="flex w-full items-center justify-between border-b px-4 py-2.5">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="" />
        <h1 className="text-xl font-semibold">{projectName}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button size="sm">
          <span>
            <Share />
          </span>
          Share
        </Button>
        <UserAvatar />
      </div>
    </header>
  );
}
