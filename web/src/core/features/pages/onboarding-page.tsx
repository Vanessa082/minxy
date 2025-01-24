"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  OnboardingPageForm,
  onboardingPageFormResolver,
} from "@/core/schema/onboarding";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {} from "@/lib/id";
import { Fetcher } from "@/lib/fetch";

export function OnboardingPage() {
  const { isLoaded, user } = useUser();
  const [loading, setLoading] = useState(false);

  const form = useForm<OnboardingPageForm>({
    resolver: onboardingPageFormResolver,
  });

  const onSubmit = async (data: OnboardingPageForm) => {
    setLoading(true);
    await Fetcher<OnboardingPageForm>("/onboarding", {
      method: "POST",
      body: data,
    });
  };

  useEffect(() => {
    if (isLoaded || user) {
      form.reset({
        clerkId: user?.id || "",
        email: user?.primaryEmailAddress?.emailAddress || "",
        name: user?.username || user?.firstName || user?.fullName || "",
      });
    }

    setLoading(false);
  }, [form, isLoaded, user]);

  return (
    <div className="flex items-center justify-center mx-auto w-app-w h-fit min-h-app-min-h">
      <div className="bg-app-white-500 shadow-md rounded-md w-[400px] p-6">
        <LoaderCircle
          size={24}
          className={cn("animate-spin mx-auto mb-2", {
            hidden: isLoaded,
            flex: loading,
          })}
        />

        <p className="text-sm text-app-white-300 text-center mt-1">
          Welcome! Please fill in the details to get started.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-app-dark-400">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
                      className="border border-app-white-300 rounded px-4 py-2"
                      disabled={!isLoaded || loading}
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-app-dark-400">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Your email"
                      className="border border-app-white-200 rounded px-4 py-2"
                      disabled
                    />
                  </FormControl>
                  {fieldState.error && (
                    <p className="text-red-500 text-sm">
                      {fieldState.error.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-app-dark-300 text-app-white-500 hover:bg-app-dark-500 font-medium py-2 rounded"
              disabled={!isLoaded || loading}
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
