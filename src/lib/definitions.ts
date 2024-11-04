import { SelectIssue, SelectProject } from "@/server/db/schema";

export type ServiceResponse<TData = null> = Promise<{
  error: string | null;
  data: TData | null;
}>;

export type UpdateProject = {
  id: string;
} & Partial<Omit<SelectProject, "id">>;

export type UpdateIssue = {
  id: string;
} & Partial<Omit<SelectIssue, "id">>;