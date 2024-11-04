import Container from "@/components/Container";
import { columns } from "@/components/Project/columns";
import Navbar from "@/components/Project/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { createClient } from "@/lib/supabase/server";
import { fetchIssues } from "@/server/actions/issues";
import { fetchMetrics } from "@/server/actions/projects";
import { getUserByMemberId } from "@/server/actions/user";
import { getProject, getUser } from "@/server/db/queries/select";
import {
  AlertTriangle,
  LineChart,
  ThumbsUp,
  UserPlus2,
  LucideIcon,
} from "lucide-react";
import React from "react";

function OverviewCard({
  title,
  icon: Icon,
  metric,
}: {
  title: string;
  icon: LucideIcon;
  metric: number;
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{metric}</div>
      </CardContent>
      <div
        className="absolute -bottom-24 -right-24 h-52 w-52 rounded-full opacity-80 blur-xl"
        style={{
          background: `radial-gradient(circle, rgba(0, 100, 255, 0.35) 0%, transparent 80%)`,
        }}
      />
    </Card>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = await createClient();

  // Parallel data fetching to improve performance
  let [
    { data: user },
    { data: projectData, error: projectError },
    { data: issues, error: issuesError },
    { data: metrics, error: metricsError },
  ] = await Promise.all([
    supabase.auth.getUser(),
    getProject(params.id),
    fetchIssues(params.id),
    fetchMetrics(params.id),
  ]);

  // Log any errors encountered
  if (projectError) console.error("Project data fetch error:", projectError);
  if (issuesError) console.error("Issues data fetch error:", issuesError);
  if (metricsError) console.error("Metrics data fetch error:", metricsError);

  // Exit early if essential data like user, projectData, or issues is missing
  if (!user?.user || !projectData || !issues) {
    console.error("Data fetch error: Essential data missing.");
    return (
      <div className="py-8 text-center font-medium text-muted-foreground">
        Error while fetching data. Please refresh or try again later.
      </div>
    );
  }

  // Fetch user data for the logged-in user
  const { data: userData, error: userError } = await getUser(user.user.id);
  if (userError || !userData) {
    console.error("User data fetch error:", userError);
  }

  // Map issues to include assignee `username` using `getUserByMemberId`
  issues = await Promise.all(
    issues.map(async (issue) => {
      if (issue.assignee) {
        const { data: assigneeUsername, error: assigneeError } =
          await getUserByMemberId(issue.assignee);
        if (assigneeError) {
          console.error(
            `Error fetching username for assignee ${issue.assignee}:`,
            assigneeError,
          );
          return { ...issue, assignee: "Unknown User" }; // Fallback if user fetch fails
        }
        return { ...issue, assignee: assigneeUsername };
      }
      return issue;
    }),
  );

  // Render component if all data is available
  return (
    <>
      <Navbar projectName={projectData.name} />
      <Container className="max-w-[90%] py-8">
        <div className="space-y-6">
          <div className="space-y-6 border-b pb-6">
            <h1 className="font-labil text-4xl">Hello, {userData?.name}</h1>
            <div className="grid grid-cols-4 gap-4">
              {metrics?.map((metric) => (
                <OverviewCard key={metric.title} {...metric} />
              ))}
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">Current Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={issues} />
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
}
