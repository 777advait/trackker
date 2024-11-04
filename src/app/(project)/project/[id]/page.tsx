import Container from "@/components/Container";
import { columns } from "@/components/Project/columns";
import Navbar from "@/components/Project/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { createClient } from "@/lib/supabase/server";
import { fetchIssues } from "@/server/actions/issues";
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

const overviewCards = [
  {
    title: "Total Issues",
    icon: LineChart,
    metric: 10,
  },
  {
    title: "Open Issues",
    icon: AlertTriangle,
    metric: 10,
  },
  {
    title: "Closed Issues",
    icon: ThumbsUp,
    metric: 10,
  },
  {
    title: "Members",
    icon: UserPlus2,
    metric: 10,
  },
];

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

  try {
    // Parallel data fetching to improve performance
    let [{ data: user }, { data: projectData }, { data: issues }] =
      await Promise.all([
        supabase.auth.getUser(),
        getProject(params.id),
        fetchIssues(params.id),
      ]);

    // Check if any essential data is missing or if there's an error
    if (!user.user || !projectData || !issues) {
      throw new Error("Data fetch error");
    }

    const { data: userData, error: userError } = await getUser(user.user.id);

    if (userError || !userData) {
      throw new Error("User data fetch error");
    }

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
              <h1 className="font-labil text-4xl">Hello, {userData.name}</h1>
              <div className="grid grid-cols-4 gap-4">
                {overviewCards.map((card) => (
                  <OverviewCard key={card.title} {...card} />
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
  } catch (error) {
    // Handle errors in data fetching
    return (
      <div className="py-8 text-center font-medium text-muted-foreground">
        Error while fetching data. Please refresh or try again later.
      </div>
    );
  }
}
