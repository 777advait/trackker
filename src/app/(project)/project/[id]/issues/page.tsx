import Container from "@/components/Container";
import Navbar from "@/components/Project/Navbar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { getProject } from "@/server/db/queries/select";
import { Plus } from "lucide-react";

import { notFound } from "next/navigation";
import React from "react";
import { SelectIssue } from "@/server/db/schema";
import IssueForm from "@/components/Issue/IssueForm";
import { fetchMembers } from "@/server/actions/members";

const issues: SelectIssue[] = [
  {
    id: "1",
    project_id: "uuid",
    description: null,
    title: "fix the button on home page",
    priority: "Urgent & Important",
    assignee: "advaitjadhav",
    deadline: "2023-01-01",
    status: "Open",
    created_by: "777advait",
  },
  {
    id: "2",
    project_id: "uuid",
    description: null,
    title: "Issue 2",
    priority: "Urgent & Important",
    assignee: "advaitjadhav",
    deadline: "2023-01-02",
    status: "Open",
    created_by: "777advait",
  },
  {
    id: "3",
    project_id: "uuid",
    description: null,
    title: "Issue 3",
    priority: "Urgent & Important",
    assignee: "advaitjadhav",
    deadline: "2023-01-03",
    status: "Open",
    created_by: "777advait",
  },
  {
    id: "4",
    project_id: "uuid",
    description: null,
    title: "Issue 4",
    priority: "Urgent & Important",
    assignee: "advaitjadhav",
    deadline: "2023-01-04",
    status: "Open",
    created_by: "777advait",
  },
  {
    id: "5",
    project_id: "uuid",
    description: null,
    title: "Issue 5",
    priority: "Urgent & Important",
    assignee: "advaitjadhav",
    deadline: "2023-01-05",
    status: "Open",
    created_by: "777advait",
  },
];

function IssueListItem({ issue }: { issue: SelectIssue }) {
  return (
    <li className="rounded-md border bg-muted/30 p-4 hover:!bg-muted/20">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start space-y-1">
          <h2 className="truncate text-start">{issue.title}</h2>
          <p className="text-xs font-medium text-muted-foreground">
            {issue.created_by} •{" "}
            {issue.deadline &&
              new Date(issue.deadline).toLocaleDateString("en-GB")}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm">
            {issue.deadline &&
              new Date(issue.deadline).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </p>
          <p className="rounded-full bg-red-500 px-2 py-1 text-xs">
            Urgent & Important
          </p>
        </div>
      </div>
    </li>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const { data: projectData, error: projectError } = await getProject(
    params.id,
  );

  const { data: membersData, error: membersError } = await fetchMembers(
    params.id,
  );

  if (!projectData || projectError || !membersData || membersError) {
    notFound();
  }

  return (
    <>
      <Navbar projectName={projectData.name} />
      <Container className="py-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-4">
            <h1 className="font-labil text-4xl">Issues</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm">
                  {" "}
                  <span>
                    <Plus />
                  </span>{" "}
                  New Issue
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Create Issue</SheetTitle>
                </SheetHeader>
                <IssueForm
                  projectData={projectData}
                  membersData={membersData}
                />
              </SheetContent>
            </Sheet>
          </div>
          <div className="mx-auto max-w-[95%]">
            <ul className="flex flex-col space-y-3">
              {issues.map((issue) => (
                <Sheet key={issue.id}>
                  <SheetTrigger>
                    <IssueListItem issue={issue} />
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Edit Issue</SheetTitle>
                    </SheetHeader>
                    <IssueForm
                      projectData={projectData}
                      membersData={membersData}
                    />
                  </SheetContent>
                </Sheet>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}
