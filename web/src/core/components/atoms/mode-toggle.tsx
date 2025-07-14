"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "lucide-react";

export default function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

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
      <DropdownMenuContent className="bg-app-white-500 text-app-text-dark-400">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
