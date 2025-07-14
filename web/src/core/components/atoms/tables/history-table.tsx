"use client";

import { useEffect, useState } from "react";
import { Copy, LockKeyhole, LockKeyholeOpen, MoreHorizontal, PenIcon, QrCodeIcon, TrashIcon } from "lucide-react";
import { ShortenResponse } from "../link-shortener-field";
import { Fetcher } from "@/lib/fetch";
import Link from "next/link";
import { getFullUrlFromShortId } from "@/lib/utils";
import { toast } from "sonner";
import { AddPasswordToUrlModal } from "../modals/add-password-to-url-modal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function ResponsiveHistoryTable() {
  const [data, setData] = useState<ShortenResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalTarget, setModalTarget] = useState<{ id: string; hasPassword: boolean } | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const result = await Fetcher<ShortenResponse[]>("/urls", { method: "GET" });
        setData(result.data || []);
      } catch (error) {
        console.error("Error getting all urls", error);
        setError("Failed to fetch URLs");
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, []);

  const toggleLock = async (item: ShortenResponse) => {
    if (item.isLocked) {
      await Fetcher(`/urls/${item.id}`, { method: "PATCH", body: { password: "" } });
      toast.success("URL unlocked");
    } else {
      setModalTarget({ id: item.id, hasPassword: false });
    }
  };

  const handleCopy = (shortId: string) => {
    const fullUrl = getFullUrlFromShortId(shortId);
    navigator.clipboard.writeText(fullUrl)
      .then(() => toast.success(`Copied: ${fullUrl}`))
      .catch(() => toast.error("Failed to copy URL."));
  };

  if (loading) return <p className="text-sm p-4">Loading...</p>;
  if (error) return <p className="text-sm p-4 text-red-500">{error}</p>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">Your Shortened Links</h2>

      {modalTarget && (
        <AddPasswordToUrlModal
          id={modalTarget.id}
          initialPassword={modalTarget.hasPassword}
          onClose={() => setModalTarget(null)}
        />
      )}

      <div className="hidden md:block overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {['Mini Link', 'Original Link', 'Clicks', 'Status', 'Date', 'Actions'].map((label, i) => (
                <th key={i} className="text-left px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                  {item.isLocked ? (
                    <LockKeyhole className="text-red-500 cursor-pointer" onClick={() => toggleLock(item)} />
                  ) : (
                    <LockKeyholeOpen className="text-green-500 cursor-pointer" onClick={() => toggleLock(item)} />
                  )}
                  <Link
                    href={getFullUrlFromShortId(item.shortId)}
                    target="_blank"
                    className="text-blue-600 underline truncate max-w-[160px]"
                  >
                    {getFullUrlFromShortId(item.shortId)}
                  </Link>
                  <Copy className="w-4 h-4 cursor-pointer text-gray-500" onClick={() => handleCopy(item.shortId)} />
                </td>
                <td className="px-6 py-4 truncate max-w-[250px]">{item.original}</td>
                <td className="px-6 py-4">{item.clicks}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">{item.createdAt}</td>
                <td className="px-10 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:border-none">
                      <MoreHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-app-text-dark-400 rounded-sm">
                      <DropdownMenuItem className="cursor-pointer hover:bg-app-white-300">Edit</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-app-white-300">Delete</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-app-white-300"><QrCodeIcon /></DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-4">
        {data.map((item, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">Mini Link</span>
              {item.isLocked ? (
                <LockKeyhole className="text-red-500 w-4 h-4" onClick={() => toggleLock(item)} />
              ) : (
                <LockKeyholeOpen className="text-green-500 w-4 h-4" onClick={() => toggleLock(item)} />
              )}
            </div>
            <Link
              href={getFullUrlFromShortId(item.shortId)}
              target="_blank"
              className="text-blue-600 underline text-xs"
            >
              {getFullUrlFromShortId(item.shortId)}
            </Link>
            <button
              onClick={() => handleCopy(item.shortId)}
              className="text-xs text-gray-500 mt-1"
            >
              Copy
            </button>

            <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
              <div><strong>Original:</strong> {item.original}</div>
              <div><strong>Clicks:</strong> {item.clicks}</div>
              <div><strong>Status:</strong> {item.status}</div>
              <div><strong>Date:</strong> {item.createdAt}</div>
            </div>
            <div className="flex gap-3 mt-3">
              <PenIcon className="w-4 h-4 text-blue-500" />
              <TrashIcon className="w-4 h-4 text-red-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
