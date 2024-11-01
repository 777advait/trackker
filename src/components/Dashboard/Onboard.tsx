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
import { GalleryHorizontalEnd } from "lucide-react";
import { ButtonLoading } from "../ui/button-loading";
import { useToast } from "@/hooks/use-toast";
import { onboard } from "@/server/actions/auth";

const onboardSchema = z.object({
  name: z
    .string()
    .min(1, { message: "We won't sell your data" })
    .max(50, { message: "Too long..." }),
  username: z
    .string()
    .min(1, { message: "We won't sell your data" })
    .max(14, { message: "Too long..." }),
});

export default function Onboard() {
  const form = useForm<z.infer<typeof onboardSchema>>({
    resolver: zodResolver(onboardSchema),
  });
  const { toast } = useToast();

  async function onSubmit(data: z.infer<typeof onboardSchema>) {
    const { error } = await onboard(data);
    console.log(error);
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
      return;
    }
    return;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <span>
                <GalleryHorizontalEnd className="h-12 w-12 text-accent" />
              </span>
              <h1 className="font-labil text-3xl">Welcome to trackker</h1>
              <p className="text-sm text-muted-foreground">
                Complete your sign-up by entering your name and a unique
                username .
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
                      <Input {...field} placeholder="advait" />
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
                      <Input {...field} placeholder="777advait" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {form.formState.isSubmitting ? (
              <ButtonLoading className="w-full">
                Creating account...
              </ButtonLoading>
            ) : (
              <Button className="w-full" type="submit">
                Launch
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
