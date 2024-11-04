import Container from "@/components/Container";
import { columns } from "@/components/Project/columns";
import Navbar from "@/components/Project/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { createClient } from "@/lib/supabase/server";
import { getProject, getUser } from "@/server/db/queries/select";
import {
  AlertTriangle,
  LineChart,
  ThumbsUp,
  UserPlus2,
  LucideIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
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

async function getIssues() {
  return [
    {
      id: "1",
      title: "Issue 1",
      priority: "High",
      assignee: "advaitjadhav",
      deadline: "2023-01-01",
      status: "open",
    },
    {
      id: "2",
      title: "Issue 2",
      priority: "Medium",
      assignee: "advaitjadhav",
      deadline: "2023-01-02",
      status: "open",
    },
    {
      id: "3",
      title: "Issue 3",
      priority: "Low",
      assignee: "advaitjadhav",
      deadline: "2023-01-03",
      status: "open",
    },
    {
      id: "4",
      title: "Issue 4",
      priority: "High",
      assignee: "advaitjadhav",
      deadline: "2023-01-04",
      status: "open",
    },
    {
      id: "5",
      title: "Issue 5",
      priority: "Medium",
      assignee: "advaitjadhav",
      deadline: "2023-01-05",
      status: "open",
    },
  ];
}

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
  const issues = await getIssues();
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const { data: projectData, error: projectError } = await getProject(
    params.id,
  );

  if (error || !user || !projectData || projectError) {
    notFound();
  }

  const { data: userData, error: userError } = await getUser(user.id);

  if (userError || !userData) {
    notFound();
  }

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
}
