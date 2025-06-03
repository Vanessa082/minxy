"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { FormProvider, useForm } from "react-hook-form";
=======
import { useForm, FormProvider } from "react-hook-form";
>>>>>>> Stashed changes
=======
import { useForm, FormProvider } from "react-hook-form";
>>>>>>> Stashed changes
import {
  OnboardingPageForm,
  onboardingPageFormResolver,
} from "@/core/schema/onboarding";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { Fetcher } from "@/lib/fetch";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const { isLoaded, user } = useUser();
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const [loading, setLoading] = useState(false);
=======
  const [initialsDone, setInitialsDone] = useState(false);
>>>>>>> Stashed changes
=======
  const [initialsDone, setInitialsDone] = useState(false);
>>>>>>> Stashed changes
  const router = useRouter();

  // create your RHF instance
  const methods = useForm<OnboardingPageForm>({
    resolver: onboardingPageFormResolver,
  });

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const onSubmit = async (data: OnboardingPageForm) => {
    try {
      setLoading(true);
      await Fetcher<OnboardingPageForm>("/auth/new-user", {
        method: "POST",
        body: data,
      });
      router.push("/app");
    } catch (error) {
      console.log("Error onboarding user", error);
    } finally {
      setLoading(false);
    }
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

=======
  // once Clerk is loaded, seed the form
  useEffect(() => {
    if (isLoaded && user && !initialsDone) {
      methods.reset({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        name: user.username || user.firstName || user.fullName || "",
      });
      setInitialsDone(true);
    }
  }, [isLoaded, user, initialsDone, methods]);

  const onSubmit = async (data: OnboardingPageForm) => {
    console.log("🛫 onSubmit start", { data });
    try {
      const res = await Fetcher<OnboardingPageForm>("/auth/new-user", {
        method: "POST",
        body: data,
      });
      console.log("✅ Fetcher returned:", res);
      router.push("/app");
    } catch (err) {
      console.error("❌ Submit failed", err);
    }
  };

>>>>>>> Stashed changes
=======
  // once Clerk is loaded, seed the form
  useEffect(() => {
    if (isLoaded && user && !initialsDone) {
      methods.reset({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress || "",
        name: user.username || user.firstName || user.fullName || "",
      });
      setInitialsDone(true);
    }
  }, [isLoaded, user, initialsDone, methods]);

  const onSubmit = async (data: OnboardingPageForm) => {
    console.log("🛫 onSubmit start", { data });
    try {
      const res = await Fetcher<OnboardingPageForm>("/auth/new-user", {
        method: "POST",
        body: data,
      });
      console.log("✅ Fetcher returned:", res);
      router.push("/app");
    } catch (err) {
      console.error("❌ Submit failed", err);
    }
  };

>>>>>>> Stashed changes
  return (
    <div className="flex items-center justify-center w-app-w min-h-app-min-h mx-auto">
      <div className="bg-app-white-500 shadow-md rounded-md w-[400px] p-6">
        {/* show a loading spinner until Clerk loads */}
        {!isLoaded && <LoaderCircle size={24} className="animate-spin mx-auto mb-2" />}

        <p className="text-sm text-app-white-300 text-center mt-1">
          Welcome! Please fill in the details to complete sign up
        </p>
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <FormProvider {...form}>
=======
=======
>>>>>>> Stashed changes

        {/* 1) Provide RHF methods via FormProvider  */}
        <FormProvider {...methods}>
          {/* 2) The actual HTML form carries onSubmit */}
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={methods.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter your name"
                      disabled={!isLoaded}
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
              control={methods.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-app-dark-300 text-app-white-500 hover:bg-app-dark-500"
              disabled={!isLoaded}
            >
              Continue
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
