import { GalleryHorizontalEnd } from 'lucide-react';
import React from 'react'
import UserAvatar from './UserAvatar';

export default function Navbar() {
  return (
    <header className="flex items-center justify-between border-b px-8 py-4">
      <div className="flex gap-2.5">
        <span>
          <GalleryHorizontalEnd className="h-10 w-10 text-accent" />
        </span>
        <h1 className="font-labil text-3xl">Dashboard</h1>
      </div>
      <UserAvatar />
    </header>
  );
}
