
"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { DropdownMenu, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { DropdownMenuContent, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
// ... other imports ...

export default function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Show placeholder until client-side theme is determined
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="border-none outline-none hover:bg-transparent cursor-pointer"
        aria-label="Loading theme"
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="border-none outline-none hover:bg-transparent cursor-pointer"
        >
          {resolvedTheme === "dark" ? (
            <MoonIcon className="h-[1.2rem] w-[1.2rem] text-app-dark-400" />
          ) : (
            <SunIcon className="h-[1.2rem] w-[1.2rem] text-app-white-400" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-app-white-500 text-app-text-dark-400 py-2 px-4 rounded-lg flex flex-col items-start gap-1 justify-between ">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
