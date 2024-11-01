"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User2, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { signOut } from "@/server/actions/auth";
import { useToast } from "@/hooks/use-toast";

export default function UserAvatar() {
  const supabase = createClient();
  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full bg-muted text-muted-foreground p-2">
        <User2 className="" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {supabase.auth.getUser().then((user) => user.data.user?.email)}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const { success } = await signOut();

            if (!success) {
              toast({
                title: "Error",
                description: "We couldn't sign you out!",
                variant: "destructive",
              });
              return;
            }
          }}
          className="hover:!bg-destructive hover:!text-destructive-foreground"
        >
          <span>
            <LogOut />
          </span>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
