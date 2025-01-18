import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export  function MainTag({ className, ...restProp }: ComponentProps<"main">) {
  return (
    <main {...restProp} className={cn("mx-auto min-h-[90vh] w-app-w", className)}></main>
  )
}