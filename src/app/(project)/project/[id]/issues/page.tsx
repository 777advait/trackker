import Container from "@/components/Container";
import Navbar from "@/components/Project/Navbar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { getIssues, getProject, getUser } from "@/server/db/queries/select";
import { Plus } from "lucide-react";
import { notFound } from "next/navigation";
import React from "react";
import { SelectIssue } from "@/server/db/schema";
import { fetchMembers } from "@/server/actions/members";
import CreateIssueForm from "@/components/Issue/CreateIssueForm";
import EditIssueForm from "@/components/Issue/EditIssueForm";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fetchUser } from "@/server/actions/user";
import { fetchIssues } from "@/server/actions/issues";

async function IssueListItem({
  issue,
  username,
}: {
  issue: SelectIssue;
  username: string;
}) {
  return (
    <li className="rounded-md border bg-muted/30 p-4 hover:!bg-muted/20">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start space-y-1">
          <h2 className="truncate text-start">{issue.title}</h2>
          <p className="text-xs font-medium text-muted-foreground">
            <span>Created By: {username}</span>
            {issue.deadline && (
              <span>
                {" "}
                • Deadline: {format(new Date(issue.deadline), "MMM dd, yyyy")}
              </span>
            )}
          </p>
        </div>
        <div className="">
          {issue.priority && (
            <p
              className={cn(
                "rounded-full border px-2 py-1 text-xs",
                issue.priority === "Urgent & Important" && "bg-red-700/50",
                issue.priority === "Urgent & Not Important" &&
                  "bg-yellow-700/50",
                issue.priority === "Not Urgent & Important" &&
                  "bg-green-700/50",
                issue.priority === "Not Urgent & Not Important" &&
                  "bg-blue-700/50",
              )}
            >
              {issue.priority}
            </p>
          )}
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
    return (
      <div className="py-8 text-center font-medium text-muted-foreground">
        Error fetching issues. Please refresh or try again later
      </div>
    );
  }

  const { data: issuesData, error: issuesError } = await fetchIssues(params.id);
  const { data: creatorData, error: creatorError } = await fetchUser(
    projectData.created_by,
  );

  if (creatorError || !creatorData) {
    return (
      <div className="py-8 text-center font-medium text-muted-foreground">
        Error fetching issues. Please refresh or try again later
      </div>
    );
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
                <CreateIssueForm
                  projectData={projectData}
                  membersData={membersData}
                />
              </SheetContent>
            </Sheet>
          </div>
          <div className="mx-auto max-w-[95%]">
            <ul className="flex flex-col space-y-3">
              {issuesError ? (
                <div className="py-8 text-center text-muted-foreground">
                  No issues found. Create an issue to get started.
                </div>
              ) : issuesData ? (
                issuesData.map(async (issue) => (
                  <Sheet key={issue.id}>
                    <SheetTrigger>
                      <IssueListItem
                        issue={issue}
                        username={creatorData.username!}
                      />
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Edit Issue</SheetTitle>
                      </SheetHeader>
                      <EditIssueForm
                        projectData={projectData}
                        membersData={membersData}
                        issueData={issue}
                      />
                    </SheetContent>
                  </Sheet>
                ))
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  No issues found. Create an issue to get started.
                </div>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}
