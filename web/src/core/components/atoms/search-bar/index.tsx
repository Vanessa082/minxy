import { Input } from "@/components/ui/input";
import { LinkIcon, ScissorsIcon } from "lucide-react";

function SearchBar() {
  return (
    <div className="flex items-center w-full max-w-xl mx-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full shadow-md px-5 py-3 transition-all ">
      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
        <LinkIcon className="w-5 h-5" />
      </div>

      <Input
        type="url"
        placeholder="Paste your long URL here..."
        className="w-full bg-transparent border-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
        aria-label="Enter a URL to shorten"
      />

      <button className="flex items-center gap-2 bg-app-blue-500 hover:bg-app-blue-500 active:bg-app-blue-500 text-white font-medium px-4 py-2 rounded-full transition-all duration-200 shadow-md">
        <ScissorsIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Shorten</span>
      </button>
    </div>
  );
}

export default SearchBar;
