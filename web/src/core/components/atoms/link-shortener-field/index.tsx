"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { URLShortenerInputField, URLShortenerInputFieldResolver } from "@/core/schema/url";
import { WithCurrentUserComponentProps } from "@/features/providers/current-user";
import { Fetcher } from "@/lib/fetch";
import { getFullUrlFromShortId } from "@/lib/utils";
import { ScissorsIcon, LinkIcon, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { ShortenResponse } from "@/core/type";

interface LinkShortenerFieldProps extends WithCurrentUserComponentProps {
  onSuccess?: () => void;
}

export default function LinkShortenerField({ user, onSuccess }: LinkShortenerFieldProps) {
  const [loading, setLoading] = useState(false);
  const form = useForm<URLShortenerInputField>({
    resolver: URLShortenerInputFieldResolver,
  });

  const onSubmit = async (data: URLShortenerInputField) => {
    const payload = { ...data, userId: user?.id };
    setLoading(true);
    try {
      const result = await Fetcher<ShortenResponse>("/shorten", { method: "POST", body: payload });
      const shortUrl = getFullUrlFromShortId(result.data.shortId);
      toast.success("URL shortened successfully!");
      form.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error("Failed to shorten URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative group p-2 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] transition-all duration-300 hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.2)]"
      >
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="relative flex-1 w-full">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <LinkIcon className="w-5 h-5" />
            </div>
            <Input
              {...form.register("original")}
              type="url"
              placeholder="Paste your long URL here..."
              className="w-full pl-12 pr-4 py-6 bg-white/50 dark:bg-slate-800/50 border-none focus-visible:ring-1 focus-visible:ring-blue-500/50 rounded-xl text-base placeholder:text-slate-400"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all font-bold tracking-wide"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <div className="flex items-center gap-2">
                <ScissorsIcon className="w-4 h-4" />
                <span>Shorten Now</span>
              </div>
            )}
          </Button>
        </div>
      </form>
      {form.formState.errors.original && (
        <p className="mt-3 text-xs text-red-500 font-medium ml-4">
          {form.formState.errors.original.message}
        </p>
      )}
    </div>
  );
}