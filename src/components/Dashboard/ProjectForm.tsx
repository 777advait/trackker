"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { GalleryHorizontalEnd, ChevronRight } from "lucide-react";
import { ButtonLoading } from "../ui/button-loading";
import { createProject } from "@/server/actions/projects";
import { useRouter } from "next/navigation";

const projectSchema = z.object({
  name: z
    .string({ required_error: "Your project ain't got no name?" })
    .max(20, { message: "Too long..." }),
});

export default function ProjectForm() {
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
  });
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof projectSchema>) {
    const { error } = await createProject(data.name);

    if (error) {
      form.setError("name", { type: "validate", message: error });
      return;
    }

    router.push("/project");
    return;
  }

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <span className="">
              <GalleryHorizontalEnd className="h-12 w-12 rounded-xl border-2 bg-muted/25 p-2 text-accent shadow-2xl" />
            </span>
            <h1 className="font-labil text-3xl">Create a new project</h1>
            <p className="text-sm text-muted-foreground">
              Start tracking your issues and milestones by creating a new
              project.
            </p>
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="indielettr" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {form.formState.isSubmitting ? (
            <ButtonLoading className="w-full">Creating...</ButtonLoading>
          ) : (
            <Button className="flex w-full items-center" type="submit">
              Create
              <span>
                <ChevronRight />
              </span>
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}
