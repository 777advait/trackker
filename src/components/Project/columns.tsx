"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { SelectIssue } from "@/server/db/schema";
import { Badge } from "../ui/badge";

export const columns: ColumnDef<SelectIssue>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="!border-border"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="!border-border"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) =>
      row.getValue("assignee") ? (
        <Badge variant="secondary">{row.getValue("priority")}</Badge>
      ) : (
        <Badge variant="outline">Unassigned</Badge>
      ),
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ row }) =>
      row.getValue("assignee") ? (
        <Badge variant="secondary">{row.getValue("assignee")}</Badge>
      ) : (
        <Badge variant="outline">Unassigned</Badge>
      ),
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) =>
      row.getValue("deadline") ? (
        <div className="font-medium text-muted-foreground">
          {row.getValue("deadline")}
        </div>
      ) : (
        <div className="font-medium text-muted-foreground">-</div>
      ),
  },
];
