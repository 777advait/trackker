"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { ButtonLoading } from "../ui/button-loading";
import React from "react";
import { SheetFooter } from "../ui/sheet";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";
import { createIssue } from "@/server/actions/issues";
import { useToast } from "@/hooks/use-toast";
import { SelectMember, SelectProject } from "@/server/db/schema";

const issueSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  priority: z
    .enum(
      [
        "Urgent & Important",
        "Urgent & Not Important",
        "Not Urgent & Important",
        "Not Urgent & Not Important",
      ],
      { message: "Invalid option" },
    )
    .optional(),
  assignee: z.string().optional(),
  deadline: z.date().optional(),
  status: z.enum(["Open", "In Progress", "Closed", "In Review"], {
    message: "Invalid option",
  }),
});

export default function IssueForm({
  projectData,
  membersData,
}: {
  projectData: SelectProject;
  membersData: (SelectMember & { name: string })[];
}) {
  const form = useForm<z.infer<typeof issueSchema>>({
    resolver: zodResolver(issueSchema),
  });
  const { toast } = useToast();

  async function handleCreate(data: z.infer<typeof issueSchema>) {
    const { error } = await createIssue({
      ...data,
      project_id: projectData.id,
      deadline: data.deadline ? data.deadline.toISOString() : null,
    });

    if (error) {
      toast({
        title: "Error creating issue",
        description: error,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Issue created",
      description: "You can now edit the issue",
    });
    

    return;
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6 py-6"
        onSubmit={form.handleSubmit(handleCreate)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} placeholder="add event listener to button" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a priority level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {[
                    "Urgent & Important",
                    "Urgent & Not Important",
                    "Not Urgent & Important",
                    "Not Urgent & Not Important",
                  ].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignee"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Assignee</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an assignee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {membersData.map((member) => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["Open", "In Progress", "Closed", "In Review"].map(
                    (status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Deadline</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SheetFooter>
          {form.formState.isSubmitting ? (
            <ButtonLoading>Creating...</ButtonLoading>
          ) : (
            <Button type="submit">Create Issue</Button>
          )}
        </SheetFooter>
      </form>
    </Form>
  );
}
