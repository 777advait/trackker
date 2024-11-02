import { GalleryHorizontalEnd } from "lucide-react";
import React from "react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b px-8 py-4">
      <div className="flex gap-2.5">
        <Link href={"/dashboard"}>
          <span>
            <GalleryHorizontalEnd className="h-10 w-10 text-accent" />
          </span>
        </Link>
        <h1 className="font-labil text-3xl">Dashboard</h1>
      </div>
      <UserAvatar />
    </header>
  );
}
