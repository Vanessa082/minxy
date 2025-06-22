"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>
}

const SidebarContext = createContext<SidebarContextType>({
  collapsed: false,
  setCollapsed: () => { }
})

export const SidebarProvider = (children: ReactNode) => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  return context
}