"use client";

import { MainTag } from "@/components/atoms";
import LinkShortenerField from "@/components/atoms/link-shortener-field";
import { ResponsiveHistoryTable } from "@/components/atoms/tables/history-table";
import type { UserDocument } from "@/server/models/user";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { BarChart, LockIcon, Repeat } from "lucide-react";

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

        <div className="flex flex-col justify-center items-center">

          <section className="relative overflow-hidden py-20 px-6">
            <div className="absolute inset-0 transform translate-y-[-50%] opacity-10">
              {/* <!-- subtle radial or geometric background --> */}
            </div>
            <div className="relative max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Smart. Secure. Simple URL Links.</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">Our URL shortener gives you powerful analytics and password protection — tailored for pros.</p>
                <div className="flex flex-wrap gap-4">
                  <a href="/sign-in" className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition">Get Started</a>
                  <a href="#features" className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition">Learn More</a>
                </div>
              </div>
              <div className="md:w-1/2">
                {/* <!-- Insert your dashboard/mockup image here --> */}
                <img src="/dashboard-mockup.png" alt="Minxy Dashboard" className="rounded-lg shadow-lg" />
              </div>
            </div>
          </section>

          {/* <!-- Features --> */}
          <section id="features" className="py-16 px-6">
            <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 border rounded-lg hover:shadow transition">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <LockIcon />
                </div>
                <h3 className="text-xl font-semibold mb-2">Password Protection</h3>
                <p className="text-gray-600 dark:text-gray-400">Secure your links with optional passwords so only intended users can access.</p>
              </div>
              <div className="p-6 border rounded-lg hover:shadow transition">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <BarChart />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400">See real-time clicks, stats, and referrer insights for each link.</p>
              </div>
              <div className="p-6 border rounded-lg hover:shadow transition">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Repeat />
                </div>
                <h3 className="text-xl font-semibold mb-2">Link History</h3>
                <p className="text-gray-600 dark:text-gray-400">Manage all your links in one place — view, edit, or delete with ease.</p>
              </div>
            </div>
          </section>

          <a href="https://github.com/vanessa082" className="items-center hover:text-gray-800">Source Code on GitHub  &copy; 2025 Minxy. All rights reserved.</a>
        </div>

      </SignedOut>
    </MainTag>
  );
}
