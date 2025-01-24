import { MainTag } from "@/components/atoms";
import AnalyticsTable from "@/components/atoms/tables/analytics-table";
import HistoryTable from "@/components/atoms/tables/history-table";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { LinkIcon, ScissorsIcon } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <MainTag className="flex flex-col justify-center items-center py-6 gap-8">
      <h1 className="text-app-blue-500 font-extrabold text-4xl">
        Shorten Your Looong URL &#58; &#41;
      </h1>

      <p className="text-app-dark-200 text-sm text-center">
        Mini link is an efficient and easy-to-use URL shortening service that
        boasts your online experience.
      </p>

      <SignedIn>
        <div className="flex items-center gap-4 px-4 py-3 border-2 border-app-dark-500 rounded-full ">
          <div className="flex items-center gap-2">
            <LinkIcon />
            Enter the link here <hr className="w-1" />
          </div>
          <div className="flex items-center rounded-tr-full rounded-br-full">
            <input
              placeholder="https://long_url_example.com..."
              className="px-4 py-3 border-none bg-transparent focus:outline-none"
            />
            <button className="flex bg-app-blue-500 text-app-text-white-500 px-4 py-3 rounded-full">
              Shorten <ScissorsIcon />
            </button>
          </div>
        </div>

        <HistoryTable />
      </SignedIn>

      <SignedOut>
        {/* Message Box
    <div className="bg-app-white-200 text-app-blue-500 p-4 rounded-lg shadow-lg text-left">
      <p>If you are seeing this message, then an API KEY<br />
      of an important API used by this app is expired.<br /><br />
      I also cannot allow you to shorten links without logging in or signing up.<br /><br />
      If you wanna shorten links without authenticating yourself, please contact the admins 
        <Link href="https://github.com/Vanessa082" classpx-4 py-3Name="text-pink-500 font-bold"> here </Link>
        so we could update our API keys.
      </p>
    </div> */}

        <span className="text-app-dark-200 flex gap-1">
          <Link href="/sign-in" className="text-app-blue-500 font-semibold">
            Login
          </Link>
          to get and see analytics for the links you shorten.
        </span>
        <AnalyticsTable />
      </SignedOut>
    </MainTag>
  );
}
