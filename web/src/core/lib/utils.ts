import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getProfileURLFromInitials = (name: string) => {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${name}`;
};
