"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { URLShortenerInputField, URLShortenerInputFieldResolver } from "@/core/schema/url";
import { WithCurrentUserComponentProps } from "@/features/providers/current-user";
import { Fetcher } from "@/lib/fetch";
import { LinkIcon, ScissorsIcon } from "lucide-react";
import { useForm } from "react-hook-form";

function LinkShortenerField({ user }: WithCurrentUserComponentProps) {
  const form = useForm<URLShortenerInputField>({
    resolver: URLShortenerInputFieldResolver,
  })

  const onSubmit = async (data: URLShortenerInputField) => {
    const payload = {
      ...data,
      userId: user?.id
    }
    await Fetcher<URLShortenerInputField>("/shorten", {
      method: "POST",
      body: payload
    })
  }
  return (
    <div {...form}>
      <div
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center w-full max-w-xl mx-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full shadow-md px-5 py-3 transition-all ">
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
          <LinkIcon className="w-5 h-5" />
        </div>

        <Input
          {...field}
          type="url"
          placeholder="Paste your long URL here..."
          className="w-full bg-transparent border-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
          aria-label="Enter a URL to shorten"
        />

        <Button type="submit" className="flex items-center gap-2 bg-app-blue-500 hover:bg-app-blue-500 active:bg-app-blue-500 text-white font-medium px-4 py-2 rounded-full transition-all duration-200 shadow-md">
          <ScissorsIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Shorten</span>
        </Button>
      </div>
    </div>
  );
}

export default LinkShortenerField;
