"use client"
import { useSidebar } from "./sidebar-provider"

export const SidebarTrigger = () => {
  const { collapsed, setCollapsed } = useSidebar()
  return (
    <button
      className="absolute top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded"
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed ? ">" : "<"}
    </button>
  )
}