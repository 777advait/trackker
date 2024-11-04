"use client";

import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { z } from "zod";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { ButtonLoading } from "../ui/button-loading";
import { generateOTP, verifyOTP } from "@/server/actions/auth";
import { useRouter } from "next/navigation";

const authSchema = z.object({
  email: z
    .string({ required_error: "We won't sell your email" })
    .email("Looks invalid"),
  otp: z
    .string()
    .min(6, { message: "Looks like you missed a few digits" })
    .max(6, { message: "Looks like you missed a few digits" })
    .optional(),
});

export default function SignInForm() {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });

  async function onSubmit(data: z.infer<typeof authSchema>) {
    if (step === 0) {
      setIsLoading(true);

      const { error } = await generateOTP(data.email);

      if (error) {
        form.setError("email", {
          type: "validate",
          message: "We couldn't send you a verification code!",
        });

        setIsLoading(false);
        return;
      }

      setStep(step + 1);
      setIsLoading(false);
    } else {
      setIsLoading(true);

      const { error } = await verifyOTP(data.email, data.otp!);

      if (error) {
        form.setError("otp", {
          type: "validate",
          message: "Invalid code!",
        });
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      router.push("/dashboard");
      return;
    }
  }

  return (
    <div className="py-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="!text-lg">
            Join in
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <DialogHeader>
                <DialogTitle>Join in</DialogTitle>
                <DialogDescription>
                  Sign in to your account to make progress.
                </DialogDescription>
              </DialogHeader>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="admin@trackker.xyz"
                        disabled={step !== 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem
                    className={`flex w-full flex-col justify-center ${step !== 1 ? "hidden" : "block"}`}
                  >
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <InputOTP
                        {...field}
                        required={false}
                        maxLength={6}
                        render={({ slots }) => (
                          <>
                            <InputOTPGroup>
                              {slots.map((slot, index) => (
                                <InputOTPSlot key={index} {...slot} />
                              ))}
                            </InputOTPGroup>
                          </>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                {isLoading ? (
                  <ButtonLoading>Signing in...</ButtonLoading>
                ) : (
                  <Button type="submit">Sign in</Button>
                )}
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
