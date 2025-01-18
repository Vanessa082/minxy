"use client";

import { ThemeProviderProps } from "next-themes";
import { ThemeProvider as NexThemeProvider } from "next-themes";

export default function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NexThemeProvider {...props}>{children}</NexThemeProvider>;
}