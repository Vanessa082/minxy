"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  URLShortenerInputField,
  URLShortenerInputFieldResolver,
} from "@/core/schema/url";
import { WithCurrentUserComponentProps } from "@/features/providers/current-user";
import { Fetcher } from "@/lib/fetch";
import { getFullUrlFromShortId } from "@/lib/utils";
import { ScissorsIcon, LinkIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";

export interface ShortenResponse {
  id: string;
  original: string;
  shortId: string;
  userId: string;
  clicks: number;
  status: string;
  isLocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function LinkShortenerField({ user }: WithCurrentUserComponentProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<URLShortenerInputField>({
    resolver: URLShortenerInputFieldResolver,
  });

  const onSubmit = async (data: URLShortenerInputField) => {
    const payload = { ...data, userId: user?.id };
    setLoading(true);

    try {
      const result = await Fetcher<ShortenResponse>("/shorten", {
        method: "POST",
        body: payload,
      });

      const shortUrl = getFullUrlFromShortId(result.data.shortId);
      toast.success(`Short URL created: ${shortUrl}`);
      form.reset();
    } catch (error) {
      toast.error("Failed to shorten URL");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="w-full max-w-2xl mx-auto px-4 py-5 sm:px-6 bg-white/80bg-gray-800/70 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl transition-all"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
            <LinkIcon className="w-5 h-5" />
          </span>
          <Input
            {...form.register("original")}
            type="url"
            placeholder="Paste your long URL here..."
            className="w-full pl-10 pr-4 py-3 text-sm bg-white text-gray-500  border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="URL to shorten"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-200"
        >
          {loading ? "Shortening..." : (
            <>
              <ScissorsIcon className="w-4 h-4" />
              <span>Shorten</span>
            </>
          )}
        </Button>
      </div>

      {form.formState.errors.original && (
        <p className="mt-2 text-sm text-red-500 text-center">
          {form.formState.errors.original.message}
        </p>
      )}
    </form>
  );
}
