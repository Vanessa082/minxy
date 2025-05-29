"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  URLShortenerInputField,
  URLShortenerInputFieldResolver,
} from "@/core/schema/url";
import { WithCurrentUserComponentProps } from "@/features/providers/current-user";
import { Fetcher } from "@/lib/fetch";
import { LinkIcon, ScissorsIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
export interface ShortenResponse {
  id: string;
  original: string;
  shortId: string;
  userId: string;
  clicks: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

function LinkShortenerField({ user }: WithCurrentUserComponentProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<URLShortenerInputField>({
    resolver: URLShortenerInputFieldResolver,
  });

  const onSubmit = async (data: URLShortenerInputField) => {
    const payload = {
      ...data,
      userId: user?.id,
    };
    setLoading(true);
    try {
      const result = await Fetcher<ShortenResponse>("/shorten", {
        method: "POST",
        body: payload,
      });

      const { shortId } = result.data;
      const shortUrl = `${process.env.NEXT_PUBLIC_FRONT_END_UR}/${shortId}`;
      toast(`short url successfully generated ${shortUrl}`);
      form.reset();
    } catch (error) {
      console.log("Error posting url", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex items-center justify-between w-full max-w-xl mx-auto bg-white dark:bg-app-dark-500 border border-gray-300 dark:border-gray-700 rounded-full shadow-md  transition-all "
    >
      <div className="flex w-[79%] items-center gap-2 text-gray-500 dark:text-gray-400 px-3 rounded-l-full">
        <LinkIcon className="w-5 h-5" />
        <Input
          {...form.register("original")}
          type="url"
          placeholder="Paste your long URL here..."
          className="w-[90%] py-3 border-none text-sm bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
          aria-label="Enter a URL to shorten"
        />
        {form.formState.errors.original && (
          <p>{form.formState.errors.original.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="flex items-center gap-2 bg-app-blue-500 hover:bg-app-blue-500 active:bg-app-blue-500 text-white font-medium p-6 rounded-full transition-all duration-200 shadow-md"
      >
        {loading ? (
          "Shortening…"
        ) : (
          <>
            <ScissorsIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Shorten</span>
          </>
        )}
      </Button>
    </form>
  );
}

export default LinkShortenerField;
