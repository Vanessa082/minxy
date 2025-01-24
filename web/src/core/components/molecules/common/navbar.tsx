import ModeToggle from "@/components/atoms/mode-toggle";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UserCircle } from "lucide-react";
import Link from "next/link";

export function NavBar() {
  return (
    <div className="w-full h-fit shadow dark:shadow-gray-800">
      <nav className="mx-auto w-app-w text-app-blue-500 flex justify-between items-center py-3">
        <Link href="/app">
          <h1 className="text-xl lg:text-2xl font-bold cursor-pointer">
            Minxy
          </h1>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <ModeToggle />
          <SignedOut>
            <Link href="/sign-in">
              <UserCircle className="size-8 cursor-pointer" />
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
}
