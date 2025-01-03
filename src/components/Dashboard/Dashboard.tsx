import { ChevronRight, GalleryHorizontalEnd, Plus } from "lucide-react";
import React from "react";
import UserAvatar from "./UserAvatar";
import Container from "../Container";
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { fetchProjects } from "@/server/actions/projects";
import { ProjectCard } from "./ProjectCard";
import { fetchRecentIssues } from "@/server/actions/issues";

async function UserProjects() {
  const { data: projectsData, error: projectsError } = await fetchProjects();

  if (projectsError || !projectsData) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Could not load your projects. Please try again later.
      </div>
    );
  }

  if (projectsData.length === 0) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No projects found. Create a{" "}
        <Link className="underline underline-offset-2" href="/dashboard/new">
          new project
        </Link>{" "}
        to get started.
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-4">
      {projectsData.map((project, idx) => (
        <li key={idx}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}

export default async function Dashboard() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return (
      <div className="py-8 text-center font-medium text-muted-foreground">
        Error while fetching data. Please refresh or try again later.
      </div>
    );
  }

  const { data: recentIssues, error: recentIssuesError } =
    await fetchRecentIssues(user.id);

  if (recentIssuesError || !recentIssues || error || !user) {
    return (
      <div className="py-8 text-center font-medium text-muted-foreground">
        Error while fetching data. Please refresh or try again later.
      </div>
    );
  }

  return (
    <>
      <Container className="max-w-[90%] py-8">
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
                <h2 className="text-lg font-medium">Recent Issues</h2>
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
                          {issues.deadline && (
                            <Badge variant="outline">{issues.deadline}</Badge>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex w-full flex-col gap-12">
              {/* Your Projects Section */}
              <div className="flex w-full flex-col gap-2.5">
                <h2 className="text-lg font-medium">Your Projects</h2>
                <UserProjects />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
