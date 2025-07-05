"use client";

import { useSidebar } from "@/components/molecules/common/sidebar/sidebar-provider";
import { Input } from "@/components/ui/input";
import ModeToggle from "@/components/atoms/mode-toggle";
import { UserButton } from "./user-button";
import { SidebarTrigger } from "./sidebar/sidebar-trigger";

export const TopBar = () => {
  const { collapsed } = useSidebar();
  const leftOffset = collapsed ? "left-16" : "left-64";

  return (
    <header
      className={`
        fixed top-0 ${leftOffset} right-0 h-16
        bg-white/30 backdrop-blur-md dark:bg-gray-900/30
        border-b z-40 flex items-center px-4
      `}
    >
      <SidebarTrigger />
      {/* … your search + icons … */}
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Search..."
          className="w-full max-w-md px-3 py-2 border rounded-md focus:outline-none"
        />
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />

        <UserButton />
      </div>
    </header>
  );
};