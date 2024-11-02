import { ChevronRight, GalleryHorizontalEnd, Plus } from "lucide-react";
import React from "react";
import UserAvatar from "./UserAvatar";
import Container from "../Container";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Link from "next/link";

const recentIssues: {
  id: number;
  title: string;
  status: string;
  deadline: Date;
}[] = [
  {
    id: 1,
    title: "Issue 1",
    status: "Open",
    deadline: new Date(),
  },
  {
    id: 2,
    title: "Issue 2",
    status: "Open",
    deadline: new Date(),
  },
  {
    id: 3,
    title: "Issue 3",
    status: "Open",
    deadline: new Date(),
  },
  {
    id: 4,
    title: "Issue 4",
    status: "Open",
    deadline: new Date(),
  },
  {
    id: 5,
    title: "Issue 5",
    status: "Open",
    deadline: new Date(),
  },
];

const yourProjects = [
  {
    id: 1,
    title: "Project 1",
    created_by: "advaitjadhav",
    created_at: new Date(),
  },
];

const sharedProjects = [
  {
    id: 1,
    title: "Project 1 is really long title idk why",
    created_by: "advaitjadhav",
    created_at: new Date(),
  },
  {
    id: 2,
    title: "Project 2",
    created_by: "advaitjadhav",
    created_at: new Date(),
  },
  {
    id: 3,
    title: "Project 3",
    created_by: "advaitjadhav",
    created_at: new Date(),
  },
];

function ProjectCard({
  project,
}: {
  project: {
    id: number;
    title: string;
    created_by: string;
    created_at: Date;
  };
}) {
  return (
    <div className="group flex h-48 w-full flex-col justify-between rounded-xl border bg-card p-6 shadow-md transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-muted/25">
      <div className="flex items-center justify-between">
        <div className="space-y-1 overflow-hidden">
          <h3 className="truncate text-lg font-semibold">{project.title}</h3>
          <p className="text-sm text-muted-foreground">{project.created_by}</p>
        </div>
        <div className="flex-shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-1">
          <ChevronRight className="h-5 w-5" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {project.created_at.toLocaleDateString("en-GB")}
      </p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <>
      <Container className="max-w-[95%] py-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="">
              <Link
                className={buttonVariants({ variant: "default" })}
                href="/dashboard/new"
              >
                <span>
                  <Plus />
                </span>
                New Project
              </Link>
            </div>
          </div>
          <div className="flex items-start gap-12">
            {/*  Recent Issues Section */}
            {recentIssues?.length > 0 && (
              <div className="flex w-full max-w-[25%] flex-col gap-2.5">
                <h2 className="text-lg">Recent Issues</h2>
                <div className="space-y-4 rounded-lg border bg-card p-4 shadow-md">
                  <ul className={cn("space-y-2")}>
                    {recentIssues.map((issues, idx) => (
                      <li
                        key={issues.id}
                        className={cn(
                          "space-y-2.5 px-1 pb-4",
                          idx !== recentIssues.length - 1 && "border-b",
                        )}
                      >
                        <Link
                          className={cn("underline-offset-4 hover:underline")}
                          href="#"
                        >
                          {issues.title}
                        </Link>
                        <div className="flex items-center gap-1">
                          <Badge variant="secondary">{issues.status}</Badge>
                          <Badge variant="outline">
                            {issues.deadline.toLocaleDateString("en-GB")}
                          </Badge>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex w-full flex-col gap-12">
              {/* Your Projects Section */}
              {yourProjects?.length > 0 && (
                <div className="flex w-full flex-col gap-2.5">
                  <h2 className="text-lg">Your Projects</h2>
                  <ul className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-4">
                    {yourProjects.map((project, idx) => (
                      <li key={idx}>
                        <ProjectCard project={project} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Shared Projects Section */}
              {sharedProjects?.length > 0 && (
                <div className="flex w-full flex-col gap-2.5">
                  <h2 className="text-lg">Shared Projects</h2>
                  <ul className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-4">
                    {sharedProjects.map((project, idx) => (
                      <li key={idx}>
                        <ProjectCard project={project} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
