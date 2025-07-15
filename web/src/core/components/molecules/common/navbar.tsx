import ModeToggle from "@/components/atoms/mode-toggle";
import Link from "next/link";
import { UserButton } from "./user-button";
// import { SignedIn } from "@clerk/nextjs";

export async function NavBar() {
  return (
    <header className="w-full border-b border-border backdrop-blur-lg z-20 sticky top-0 bg-background/60">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-xl font-bold text-app-blue-500 hover:opacity-90"
        >
          Minxy
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}