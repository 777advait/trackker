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
import IssueForm from "@/components/Issue/CreateIssueForm";
import { fetchMembers } from "@/server/actions/members";
import CreateIssueForm from "@/components/Issue/CreateIssueForm";
import EditIssueForm from "@/components/Issue/EditIssueForm";

async function IssueListItem({ issue }: { issue: SelectIssue }) {
  const { data, error } = await getUser(issue.created_by);

  if (error || !data) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        Error fetching issues. Please refresh the page.
      </div>
    );
  }

  return (
    <li className="rounded-md border bg-muted/30 p-4 hover:!bg-muted/20">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start space-y-1">
          <h2 className="truncate text-start">{issue.title}</h2>
          <p className="text-xs font-medium text-muted-foreground">
            {data.username} •{" "}
            {new Date(issue.created_at).toLocaleDateString("en-GB")}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          {issue.deadline && (
            <p className="text-sm">
              {new Date(issue.deadline).toLocaleDateString("en-GB")}
            </p>
          )}
          {issue.priority && (
            <p className="rounded-full border bg-red-700/50 px-2 py-1 text-xs">
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
    notFound();
  }

  const { data: issuesData, error: issuesError } = await getIssues(params.id);

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
                issuesData.map((issue) => (
                  <Sheet key={issue.id}>
                    <SheetTrigger>
                      <IssueListItem issue={issue} />
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
