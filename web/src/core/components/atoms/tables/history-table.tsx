"use client";

import { useEffect, useState } from "react";
import {
  Copy,
  LockKeyhole,
  LockKeyholeOpen,
  MoreHorizontal,
  PenIcon,
  QrCodeIcon,
  TrashIcon,
} from "lucide-react";
import { ShortenResponse } from "../link-shortener-field";
import { Fetcher } from "@/lib/fetch";
import Link from "next/link";
import { getFullUrlFromShortId } from "@/lib/utils";
import { toast } from "sonner";
import { AddPasswordToUrlModal } from "../modals/add-password-to-url-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditUrlModal } from "../modals/edit-url-modal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { QrCodeModal } from "../modals/qr-code-modal";

export function ResponsiveHistoryTable() {
  const [data, setData] = useState<ShortenResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  const [modalTarget, setModalTarget] = useState<{
    id: string;
    hasPassword: boolean;
  } | null>(null);
  const [editTarget, setEditTarget] = useState<ShortenResponse | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [qrTarget, setQrTarget] = useState<{ url: string; shortId: string } | null>(null);

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

  const toggleLock = async (item: ShortenResponse) => {
    if (item.isLocked) {
      await Fetcher(`/urls/${item.id}`, {
        method: "PATCH",
        body: { password: "" },
      });
      toast.success("URL unlocked");
    } else {
      setModalTarget({ id: item.id, hasPassword: false });
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      const res = await Fetcher(`/urls/${deleteTargetId}`, { method: "DELETE" });
      if (res.data) {
        setData((prev) => prev.filter((item) => item.id !== deleteTargetId));
        toast.success("Link deleted successfully");
      }
    } catch {
      toast.error("Failed to delete link");
    } finally {
      setDeleteTargetId(null);
    }
  };

  const handleUpdateLocal = (updatedItem: ShortenResponse) => {
    setData((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const handleCopy = (shortId: string) => {
    const fullUrl = getFullUrlFromShortId(shortId);
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => toast.success(`Copied: ${fullUrl}`))
      .catch(() => toast.error("Failed to copy URL."));
  };

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

      {editTarget && (
        <EditUrlModal
          item={editTarget}
          onClose={() => setEditTarget(null)}
          onSuccess={(updated) => {
            handleUpdateLocal(updated);
            setEditTarget(null);
          }}
        />
      )}

      {qrTarget && (
        <QrCodeModal
          url={qrTarget.url}
          shortId={qrTarget.shortId}
          onClose={() => setQrTarget(null)}
        />
      )}

      <AlertDialog open={!!deleteTargetId} onOpenChange={() => setDeleteTargetId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your shortened link.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="hidden md:block overflow-x-auto border rounded-lg shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              {[
                "Mini Link",
                "Original Link",
                "Clicks",
                "Status",
                "Date",
                "Actions",
              ].map((label, i) => (
                <th
                  key={i}
                  className="text-left px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide"
                >
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
                    <LockKeyhole
                      className="text-red-500 cursor-pointer"
                      onClick={() => toggleLock(item)}
                    />
                  ) : (
                    <LockKeyholeOpen
                      className="text-green-500 cursor-pointer"
                      onClick={() => toggleLock(item)}
                    />
                  )}
                  <Link
                    href={getFullUrlFromShortId(item.shortId)}
                    target="_blank"
                    className="text-blue-600 underline truncate max-w-[160px]"
                  >
                    {getFullUrlFromShortId(item.shortId)}
                  </Link>
                  <Copy
                    className="w-4 h-4 cursor-pointer text-gray-500"
                    onClick={() => handleCopy(item.shortId)}
                  />
                </td>
                <td className="px-6 py-4 truncate max-w-[250px]">
                  {item.original}
                </td>
                <td className="px-6 py-4">{item.clicks}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
                <td className="px-10 py-4">
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full outline-none cursor-pointer transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onSelect={() => setEditTarget(item)}
                        className="cursor-pointer"
                      >
                        <PenIcon className="mr-2 w-4 h-4" /> Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onSelect={() => setDeleteTargetId(item.id)}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <TrashIcon className="mr-2 w-4 h-4" /> Delete
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onSelect={() => setQrTarget({
                          url: getFullUrlFromShortId(item.shortId),
                          shortId: item.shortId
                        })}
                        className="cursor-pointer"
                      >
                        <QrCodeIcon className="mr-2 w-4 h-4" /> QR Code
                      </DropdownMenuItem>
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
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                Mini Link
              </span>
              {item.isLocked ? (
                <LockKeyhole
                  className="text-red-500 w-4 h-4"
                  onClick={() => toggleLock(item)}
                />
              ) : (
                <LockKeyholeOpen
                  className="text-green-500 w-4 h-4"
                  onClick={() => toggleLock(item)}
                />
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
              <div>
                <strong>Original:</strong> {item.original}
              </div>
              <div>
                <strong>Clicks:</strong> {item.clicks}
              </div>
              <div>
                <strong>Status:</strong> {item.status}
              </div>
              <div>
                <strong>Date:</strong> {item.createdAt}
              </div>
            </div>
            <div className="flex gap-3 mt-3">
              <PenIcon onClick={() => setEditTarget(item)} className="w-4 h-4 text-blue-500" />
              <TrashIcon onClick={() => setDeleteTargetId(item.id)} className="w-4 h-4 text-red-500" />
              <QrCodeIcon onClick={() => setQrTarget({
                url: getFullUrlFromShortId(item.shortId),
                shortId: item.shortId
              })}
                className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
