import { MainTag } from "@/components/atoms";
import ModeToggle from "@/components/atoms/mode-toggle";
import { UserCircle } from "lucide-react";

export default function Header() {
  return (
    <MainTag className=" text-app-blue-500 flex justify-between items-center py-6 ">
      <h1 className="text-4xl font-bold">Minxy</h1>
      <div className="flex items-center justify-between gap-2">
        <ModeToggle />
        <UserCircle className="w-12 h-12 cursor-pointer"/>
      </div>
    </MainTag>
  )
}