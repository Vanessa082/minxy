"use client";

import { useEffect, useState } from "react";
import { Copy, LockIcon, PenIcon, TrashIcon } from "lucide-react";
import { ShortenResponse } from "../link-shortener-field";
import { Fetcher } from "@/lib/fetch";
import Link from "next/link";
import { getFullUrlFromShortId } from "@/lib/utils";
import { toast } from "sonner";

export default function ResponsiveHistoryTable() {
  const [data, setData] = useState<ShortenResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const result = await Fetcher<ShortenResponse[]>("/urls", {
          method: "GET",
        });
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

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  const handleCopy = (shortId: string) => {
    const fullUrl = getFullUrlFromShortId(shortId)
    navigator.clipboard.writeText(fullUrl)
      .then(() => {
        toast(`Short URL successfully copied: ${fullUrl}`)
      })
      .catch((error) => {
        console.error("Failed to copy URL:", error);
        toast.error("Failed to copy URL.");
      })
  }

  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-semibold">History</h2>
      {/* Desktop View */}
      <div className="max-lg:hidden xl:block border border-app-dark-300 rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-app-dark-300 text-app-white-500">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Mini Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Original Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-app-dark-500">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-5 py-4 break-words whitespace-normal flex justify-between items-center">
                  <LockIcon />
                  <Link
                    href={getFullUrlFromShortId(item.shortId)}
                    className="text-blue-500 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getFullUrlFromShortId(item.shortId)}
                  </Link>

                  <Copy aria-label="copy url" className="cursor-copy" onClick={() => handleCopy(item.shortId)} />
                </td>
                <td className="px-5 py-4 max-w-[250px] truncate whitespace-nowrap overflow-hidden">
                  {item.original}
                </td>
                <td className="px-5 py-4">{item.clicks}</td>
                <td className="px-5 py-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-app-blue-500 text-app-white-500 rounded-full">
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-xs">{item.createdAt}</td>
                <td className="px-5 py-4 flex items-center gap-3">
                  <button
                    className="w-5 h-5 text-blue-500 hover:text-blue-700 focus:outline-none"
                    title="Edit"
                  >
                    <PenIcon />
                  </button>
                  <button
                    className="w-5 h-5 text-red-700 hover:text-red-900 focus:outline-none"
                    title="Delete"
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="xl:hidden">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-strict-dark-300 p-4 mb-4 rounded-lg shadow"
          >
            <div className="flex justify-between items-center">
              <span className="font-medium text-xs">Mini Link:</span>
              <Link
                href={getFullUrlFromShortId(item.shortId)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 underline"
              >
                {getFullUrlFromShortId(item.shortId)}
              </Link>

              <Copy aria-label="copy url" className="cursor-copy" onClick={() => handleCopy(item.shortId)} />
            </div>
            <div className="mt-2">
              <span className="font-medium text-xs">Original Link:</span>
              <p className="text-xs break-words whitespace-normal">
                {item.original}
              </p>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-medium text-xs">Clicks:</span>
              <span className="text-sm">{item.clicks}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-medium text-xs">Status:</span>
              <span className="text-sm text-app-blue-500">{item.status}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-medium text-xs">Date:</span>
              <span className="text-xs truncate">{item.createdAt}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                className="w-5 h-5 text-blue-500 hover:text-blue-700"
                title="Edit"
              >
                <PenIcon />
              </button>
              <button
                className="w-5 h-5 text-red-700 hover:text-red-900"
                title="Delete"
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
