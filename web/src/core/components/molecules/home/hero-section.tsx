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

interface HeroSectionProps {
  user: UserDocument | null;
}

export function HeroSection({ user }: HeroSectionProps) {
  return (
    <MainTag className="flex flex-col justify-center items-center py-6 gap-8">
      <SignedIn>
        <h1 className="text-app-blue-500 font-extrabold text-4xl">
          Shorten Your Looong URL &#58; &#41;
        </h1>

        <p className="text-app-dark-200 text-sm text-center">
          Mini link is an efficient and easy-to-use URL shortening service that
          boasts your online experience.
        </p>

        <LinkShortenerField user={user} />
        <ResponsiveHistoryTable />
      </SignedIn>

      <SignedOut>
        <Hero />
        <Features />
        <FloatingCTA />
        <footer className="text-center py-8 text-sm text-muted-foreground">
          <Link href="https://github.com/vanessa082">
            &copy; 2025 Minxy. All rights reserved.
          </Link>
        </footer>
        <BackgroundBlobs />
      </SignedOut>
    </MainTag>
  );
}
