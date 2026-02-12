"use client";

import { MainTag } from "@/components/atoms";
import LinkShortenerField from "@/components/atoms/link-shortener-field";
import { ResponsiveHistoryTable } from "@/components/atoms/tables/history-table";
import type { UserDocument } from "@/server/models/user";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Hero } from "./hero";
import { BackgroundBlobs } from "@/components/molecules/home/background-blobs";
import { Features } from "@/components/molecules/home/feature";
import Link from "next/link";
import { FloatingCTA } from "@/components/molecules/home/floating-cta";
import { useState } from "react";

interface HeroSectionProps {
  user: UserDocument | null;
}

export function HeroSection({ user }: HeroSectionProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  return (
    <MainTag className="relative min-h-screen pt-12 pb-20 px-4 overflow-hidden">
      <SignedIn>
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-12">
          <div className="text-center space-y-4 max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-[900] text-slate-900 dark:text-white tracking-tight leading-[1.1]">
              Shorten Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Links</span> Instantly.
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
              Mini Link is the premium URL shortener for modern creators.
              Track, manage, and optimize your online presence.
            </p>
          </div>

          <div className="w-full space-y-16">
            <LinkShortenerField user={user} onSuccess={triggerRefresh} />

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                  Recent History
                </span>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
              </div>
              <ResponsiveHistoryTable key={refreshKey} />
            </div>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <Hero />
        <Features />
        <FloatingCTA />
        <footer className="mt-20 text-center text-slate-400 text-sm">
          <Link href="https://github.com/vanessa082" className="hover:text-blue-500 transition-colors">
            &copy; 2026 Minxy. All rights reserved.
          </Link>
        </footer>
        <BackgroundBlobs />
      </SignedOut>
    </MainTag>
  );
}