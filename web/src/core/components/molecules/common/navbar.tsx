import ModeToggle from "@/components/atoms/mode-toggle";
import Link from "next/link";
import { UserButton } from "./user-button";
// import { SignedIn } from "@clerk/nextjs";

export async function NavBar() {
  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800  shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-app-blue-500 hover:opacity-90 transition">
          Minxy
        </Link>

        {/* <SignedIn>
          <nav>
            <span>Shorten Link</span>
            <span>Generate QR-code with link</span>
          </nav>
        </SignedIn> */}

        <div className="flex items-center justify-between gap-2">
          <ModeToggle />

          <UserButton />
        </div>
      </div>
    </header>
  );
}
