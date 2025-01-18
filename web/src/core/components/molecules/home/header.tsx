import ModeToggle from "@/components/atoms/mode-toggle";
import { UserCircle } from "lucide-react";

export default function Header() {
  return (
    <div className="flex">
      <h1>MinXX</h1>
      <div>
        <ModeToggle />
        <UserCircle />
      </div>
    </div>
  )
}