"use client";

import {
  Lock,
  Home,
  TriangleAlert,
  Cog,
  GalleryHorizontalEnd,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useParams, usePathname } from "next/navigation"; // Import usePathname
import { cn } from "@/lib/utils";

// Menu items.
const getLinks = (id: string) => [
  {
    title: "Home",
    url: `/project/${id}`,
    icon: Home,
  },
  {
    title: "Issues",
    url: `/project/${id}/issues`,
    icon: TriangleAlert,
  },
  {
    title: "Members",
    url: `/project/${id}/members`,
    icon: Lock,
  },
  {
    title: "Settings",
    url: `/project/${id}/settings`,
    icon: Cog,
  },
];

export default function AppSidebar() {
  const params = useParams();
  const id = params.id as string;
  const links = getLinks(id);

  let pathname = usePathname();
  pathname = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-2.5">
        <Link href="/dashboard" className="flex gap-2.5">
          <span>
            <GalleryHorizontalEnd className="h-10 w-10 text-accent" />
          </span>
          <h1 className="font-labil text-3xl">trackker</h1>
        </Link>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={link.url}
                      className={cn(
                        "flex items-center gap-2.5",
                        pathname === link.url &&
                          "bg-accent text-accent-foreground",
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      <span>{link.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
