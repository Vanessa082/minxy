import { LinkIcon } from "lucide-react";
import Link from "next/link";

export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/shorten">
        <button className="flex  justify-between gap-2 px-6 py-3 rounded-full bg-app-blue-500 text-white shadow-lg hover:scale-105 transition">
          <LinkIcon /> Shorten a Link
        </button>
      </Link>
    </div>
  );
}
