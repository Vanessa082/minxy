"use client";

import { FormProvider, useForm } from "react-hook-form";
import { verifyPasswordResolver, VerifyPasswordInput } from "@/core/schema/url";
import { Fetcher } from "@/lib/fetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
interface Props {
  shortId: string;
}

export default function URLGateWayFormPage({ shortId }: Props) {
  const router = useRouter();

  const form = useForm<VerifyPasswordInput>({
    resolver: verifyPasswordResolver,
    defaultValues: { password: "" },
  });

  const onSubmit = form.handleSubmit(async ({ password }) => {
    try {
      const res = await Fetcher<{ original: string }>("/urls/verify-password", {
        method: "POST",
        body: { shortId, password },
      });
      router.push(res.data.original);
    } catch {
      toast.error("Incorrect password");
    }
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit} className="space-y-4 max-w-md mx-auto mt-10">
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter password"
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
        <Button type="submit" className="w-full">
          Unlock
        </Button>
      </form>
    </FormProvider>
  );
}
