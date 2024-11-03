"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { ButtonLoading } from "../ui/button-loading";
import { Button } from "../ui/button";
import { renameProject } from "@/server/actions/projects";

const projectSchema = z.object({
  name: z
    .string({ required_error: "Your project ain't got no name?" })
    .min(1, { message: "Your project ain't got no name?" })
    .max(20, { message: "Too long..." }),
});

export default function RenameCard({
  projectName,
  projectId,
}: {
  projectName: string;
  projectId: string;
}) {
  const form = useForm<z.infer<typeof projectSchema>>({
    defaultValues: { name: projectName },
    resolver: zodResolver(projectSchema),
  });

  async function onSubmit(data: z.infer<typeof projectSchema>) {
    const { error } = await renameProject(projectId, data.name);

    if (error) {
      form.setError("name", { type: "validate", message: error });
      return;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rename project</CardTitle>
        <CardDescription>Change the name of your project</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="indielettr" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            {form.formState.isSubmitting ? (
              <ButtonLoading>Renaming...</ButtonLoading>
            ) : (
              <Button type="submit">Rename</Button>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
