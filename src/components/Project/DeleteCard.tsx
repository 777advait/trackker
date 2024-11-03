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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { deleteProjectAction } from "@/server/actions/projects";

export default function DeleteCard({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) {
  const deleteSchema = z.object({
    projectName: z
      .string()
      .min(1, { message: "Please type your project name" })
      .refine((val) => val === projectName, {
        message: "Project name doesn't match",
      }),
    phrase: z
      .string()
      .min(1, { message: "Please type the phrase" })
      .refine((val) => val === "delete my project", {
        message: 'Please type "delete my project" to confirm',
      }),
  });
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof deleteSchema>>({
    resolver: zodResolver(deleteSchema),
  });

  async function onSubmit(data: z.infer<typeof deleteSchema>) {
    const { error } = await deleteProjectAction(projectId);

    if (error) {
      toast({
        title: "Error",
        description: "We couldn't delete your project!",
        variant: "destructive",
      });
      return;
    }

    router.push("/dashboard");
    return;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete Project</CardTitle>
        <CardDescription>
          Permanently delete this project and all of its data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This action cannot be undone. This will permanently delete your
          project and remove all associated data from our servers.
        </p>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Project</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Project</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                project and remove all associated data from our servers.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>
                        Enter the project name{" "}
                        <span className="font-bold">{projectName}</span> to
                        continue:
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder={projectName} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phrase"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>
                        To verify, type{" "}
                        <span className="font-bold">delete my project</span>{" "}
                        below:
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="delete my project" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      className="hover:!bg-muted hover:!text-muted-foreground"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  {form.formState.isSubmitting ? (
                    <ButtonLoading>Deleting...</ButtonLoading>
                  ) : (
                    <Button type="submit">Delete</Button>
                  )}
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
