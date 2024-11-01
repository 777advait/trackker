import { z } from "zod";
import { db } from "@/server/db";
import { user } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export type ServiceResponse<TData = null> = Promise<{
  error: string | null;
  data: TData | null;
}>;


