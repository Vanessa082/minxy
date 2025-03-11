import ModeToggle from "@/components/atoms/mode-toggle";
import Link from "next/link";
import { UserButton } from "./user-button";

export async function NavBar() {
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

          <UserButton />
        </div>
      </nav>
    </div>
  );
}
