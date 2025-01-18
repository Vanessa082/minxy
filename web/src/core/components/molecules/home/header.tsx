"use client"
import { MainTag } from "@/components/atoms";
import ModeToggle from "@/components/atoms/mode-toggle";
import { UserCircle } from "lucide-react";

export default function Header() {
  return (
    <MainTag className="flex justify-between items-center">
      <h1 className="">Minxy</h1>
      <div className="flex items-center">
        <ModeToggle />
        <UserCircle />
      </div>
    </MainTag>
  )
}