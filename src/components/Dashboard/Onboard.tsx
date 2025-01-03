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
import { GalleryHorizontalEnd, Rocket } from "lucide-react";
import { ButtonLoading } from "../ui/button-loading";
import { onboard } from "@/server/actions/auth";

const onboardSchema = z.object({
  name: z
    .string({ required_error: "We won't sell your data" })
    .min(1, { message: "We won't sell your data" })
    .max(50, { message: "Too long..." }),
  username: z
    .string({ required_error: "We won't sell your data" })
    .min(1, { message: "We won't sell your data" })
    .max(14, { message: "Too long..." })
    .regex(/^[a-z0-9._]+$/, {
      message:
        "Username can only contain lowercase letters, numbers, underscores, and dots",
    })
    .transform((val: string) => val.toLowerCase()),
});

export default function Onboard() {
  const form = useForm<z.infer<typeof onboardSchema>>({
    resolver: zodResolver(onboardSchema),
  });

  async function onSubmit(data: z.infer<typeof onboardSchema>) {
    const { error } = await onboard(data);

    if (error) {
      form.setError("username", { type: "validate", message: error });
      return;
    }
    return;
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <span className="">
                <GalleryHorizontalEnd className="h-12 w-12 rounded-xl border-2 bg-muted/25 p-2 text-accent shadow-2xl" />
              </span>
              <h1 className="font-labil text-3xl">Welcome to trackker</h1>
              <p className="text-sm text-muted-foreground">
                Complete your sign-up by entering your name and a unique
                username.
              </p>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your username" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.formState.isSubmitting ? (
              <ButtonLoading className="w-full">Setting up...</ButtonLoading>
            ) : (
              <Button className="flex w-full items-center" type="submit">
                <span>
                  <Rocket />
                </span>
                Launch
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
