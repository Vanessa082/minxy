"use client"

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VerifyShortIdSchema, VerifyUrlInput, verifyUrlResolver } from "@/core/schema/url";
import { Fetcher } from "@/lib/fetch";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function URLGateWayFormPage({ shortId }: VerifyShortIdSchema) {
  const router = useRouter();
  const form = useForm<VerifyUrlInput>({
    resolver: verifyUrlResolver,
    defaultValues: { password: "" },
  });

  const onSubmit = form.handleSubmit(async (data: VerifyUrlInput) => {
    try {
      const res = await Fetcher<VerifyUrlInput>(
        "/urls/verify-password",
        {
          method: "POST",
          body: data,
        }
      );
      router.push(res.data.original);
      console.log("click")

    } catch {
      toast.error("An unexpected error occurred");
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-md rounded-md w-full max-w-md p-6">
        <h2 className="text-lg font-medium mb-4">Enter password to unlock link</h2>
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter link password"
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
            <Button type="submit" className="w-full py-2">
              Submit
            </Button>
            <h1 className="text-black">Enter password</h1>
          </form>
        </FormProvider>
      </div>
    </div >
  );
}
