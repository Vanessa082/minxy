"use client";

import Link from "next/link";
import { useSidebar } from "./sidebar-provider";
import {
  LayoutDashboard,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/docs", label: "Overview", icon: LayoutDashboard },
  { href: "/docs/contribute", label: "Contribute", icon: Users },
];

export const DashboardSidebar = () => {
  const { collapsed } = useSidebar();

  return (
    <aside
      className={`bg-gray-900 text-white transition-all duration-300 ease-in-out ${collapsed ? "w-16" : "w-64"
        }`}
    >
      <nav className="p-4 space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center space-x-3 p-2 rounded hover:bg-gray-800 transition"
          >
            <Icon className="w-5 h-5" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};


export const SidebarInset = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex-1 relative">{children}</div>
}

