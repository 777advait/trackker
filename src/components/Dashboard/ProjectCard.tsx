import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function ProjectCard({
  project,
}: {
  project: {
    id: string;
    name: string;
    created_by: string;
    created_at: string;
  };
}) {
  return (
    <Link
      href={`/project/${project.id}`}
      className="group flex h-48 w-full flex-col justify-between rounded-xl border bg-card p-6 shadow-md transition-all duration-300 ease-in-out hover:cursor-pointer hover:bg-muted/25"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1 overflow-hidden">
          <h3 className="truncate text-lg font-semibold">{project.name}</h3>
          <p className="text-sm text-muted-foreground">{project.created_by}</p>
        </div>
        <div className="flex-shrink-0 transition-transform duration-300 ease-in-out group-hover:translate-x-1">
          <ChevronRight className="h-5 w-5" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {new Date(project.created_at).toLocaleDateString("en-GB")}
      </p>
    </Link>
  );
}
