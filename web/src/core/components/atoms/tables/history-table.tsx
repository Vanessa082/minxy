"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Copy,
  LockKeyhole,
  LockKeyholeOpen,
  MoreHorizontal,
  PenIcon,
  QrCodeIcon,
  TrashIcon,
  ExternalLink,
  BarChart3,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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

// Utils & Logic
import { Fetcher } from "@/lib/fetch";
import { getFullUrlFromShortId, cn } from "@/lib/utils";
import { ShortenResponse } from "@/core/type";

// Modals
import { AddPasswordToUrlModal } from "../modals/add-password-to-url-modal";
import { EditUrlModal } from "../modals/edit-url-modal";
import { QrCodeModal } from "../modals/qr-code-modal";
import { Skeleton } from "@/components/ui/skeleton";

export function ResponsiveHistoryTable() {
  const [data, setData] = useState<ShortenResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Targets for modals
  const [modalTarget, setModalTarget] = useState<{ id: string; hasPassword: boolean } | null>(null);
  const [editTarget, setEditTarget] = useState<ShortenResponse | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [qrTarget, setQrTarget] = useState<{ url: string; shortId: string } | null>(null);

  const fetchUrls = useCallback(async () => {
    try {
      const result = await Fetcher<ShortenResponse[]>("/urls", { method: "GET" });
      setData(result.data || []);
    } catch (error) {
      setError("Failed to fetch URLs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUrls();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchUrls]);

  const toggleLock = async (item: ShortenResponse) => {
    // Optimistic Update
    const originalState = [...data];
    setData(prev => prev.map(u => u.id === item.id ? { ...u, isLocked: !u.isLocked } : u));

    try {
      if (item.isLocked) {
        await Fetcher(`/urls/${item.id}`, { method: "PATCH", body: { password: "" } });
        toast.success("URL unlocked");
      } else {
        // If locking, we need the modal, so revert optimistic and open modal
        setData(originalState);
        setModalTarget({ id: item.id, hasPassword: false });
      }
    } catch {
      setData(originalState);
      toast.error("Failed to update lock status");
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;

    // 1. Store previous data for rollback
    const previousData = [...data];

    // 2. Optimistically remove from UI
    setData((prev) => prev.filter((item) => item.id !== deleteTargetId));
    setDeleteTargetId(null); // Close modal immediately

    try {
      await Fetcher(`/urls/${deleteTargetId}`, { method: "DELETE" });
      toast.success("Link deleted successfully");
    } catch {
      // 3. Rollback on error
      setData(previousData);
      toast.error("Failed to delete link");
    }
  };
  const handleUpdateLocal = (updatedItem: ShortenResponse) => {
    setData((prev) => prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const handleVisit = (shortId: string) => {
    window.open(getFullUrlFromShortId(shortId), "_blank");
  };

  const handleCopy = (shortId: string) => {
    const fullUrl = getFullUrlFromShortId(shortId);
    navigator.clipboard
      .writeText(fullUrl)
      .then(() => toast.success("URL copied to clipboard"))
      .catch(() => toast.error("Failed to copy URL."));
  };

  const handleOptimisticUpdate = (id: string, updates: Partial<ShortenResponse>) => {
    setData((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  if (loading) return <div className="py-20"><Skeleton /></div>;
  if (error) return <p className="text-sm p-4 text-red-500 text-center font-medium">{error}</p>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">History</h2>
          <p className="text-slate-500 text-sm">Manage and track your shortened links.</p>
        </div>
        <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1">
          {data.length} links
        </Badge>
      </div>

      {/* MODAL COMPONENTS */}
      {modalTarget && (
        <AddPasswordToUrlModal
          id={modalTarget.id}
          onClose={() => setModalTarget(null)}
          onSuccess={(isLocked) => {
            // Optimistically show the lock icon immediately
            handleOptimisticUpdate(modalTarget.id, { isLocked });
            setModalTarget(null);
          }}
        />
      )}

      {editTarget && (
        <EditUrlModal
          item={editTarget}
          onClose={() => setEditTarget(null)}
          onSuccess={(updatedData) => {
            // Optimistically update the URL and original link
            handleUpdateLocal(updatedData);
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

      <AlertDialog
        open={!!deleteTargetId}
        onOpenChange={(open) => {
          if (!open) setDeleteTargetId(null);
        }}
      >
        <AlertDialogContent
          className="bg-white"
          onCloseAutoFocus={(e) => {
            e.preventDefault();
            document.body.style.pointerEvents = 'auto';
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-hidden border border-slate-200 rounded-xl bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {["Mini Link", "Original Link", "Clicks", "Status", "Date", "Actions"].map((label) => (
                <th key={label} className="px-6 py-4 text-left font-semibold text-slate-600 uppercase tracking-wider text-[11px]">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleLock(item)}
                      className="cursor-pointer transition-transform active:scale-90"
                    >
                      {item.isLocked ? (
                        <LockKeyhole className="w-4 h-4 text-amber-500" />
                      ) : (
                        <LockKeyholeOpen className="w-4 h-4 text-slate-300 group-hover:text-emerald-500" />
                      )}
                    </button>
                    <Link
                      href={getFullUrlFromShortId(item.shortId)}
                      target="_blank"
                      className="text-blue-600 font-medium hover:underline truncate max-w-[140px]"
                    >
                      /{item.shortId}
                    </Link>
                    <button
                      onClick={() => handleCopy(item.shortId)}
                      className="cursor-pointer p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-600 transition-colors"
                      title="Copy Link"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 max-w-[220px]">
                  <p className="text-slate-500 truncate" title={item.original}>{item.original}</p>
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/app/analytics/${item.id}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    {item.clicks}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className="capitalize bg-emerald-50 text-emerald-700 border-emerald-100 shadow-none font-medium">
                    {item.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-slate-400 text-[12px]">
                  {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="px-6 py-4 text-right">
                  <LinkActions
                    item={item}
                    onEdit={setEditTarget}
                    onDelete={setDeleteTargetId}
                    onQr={setQrTarget}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {data.map((item) => (
          <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Link href={getFullUrlFromShortId(item.shortId)} target="_blank" className="text-lg font-bold text-slate-900 leading-none">
                    /{item.shortId}
                  </Link>
                  <button onClick={() => toggleLock(item)} className="cursor-pointer">
                    {item.isLocked ? <LockKeyhole className="w-4 h-4 text-amber-500" /> : <LockKeyholeOpen className="w-4 h-4 text-slate-300" />}
                  </button>
                </div>
                <p className="text-sm text-slate-400 truncate max-w-[200px]">{item.original}</p>
              </div>
              <LinkActions item={item} onEdit={setEditTarget} onDelete={setDeleteTargetId} onQr={setQrTarget} />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-3">
                <BarChart3 className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold leading-none mb-1">Clicks</p>
                  <Link href={`/app/analytics/${item.id}`} className="text-sm font-bold text-slate-700 block cursor-pointer">
                    {item.clicks}
                  </Link>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-3">
                <Calendar className="w-4 h-4 text-slate-400" />
                <div>
                  <p className="text-[10px] uppercase text-slate-400 font-bold leading-none mb-1">Date</p>
                  <p className="text-sm font-bold text-slate-700">{new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border-none cursor-pointer font-semibold shadow-none"
              onClick={() => handleCopy(item.shortId)}
            >
              <Copy className="w-4 h-4 mr-2" /> Copy Short Link
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinkActions({ item, onEdit, onDelete, onQr }: any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          onPointerDown={(e) => e.stopPropagation()}
          className="p-2 hover:bg-slate-100 rounded-full outline-none cursor-pointer text-slate-400"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white z-[100]">
        <DropdownMenuLabel className="text-[10px] font-bold uppercase text-slate-400 px-2 py-1.5">
          Management
        </DropdownMenuLabel>

        <DropdownMenuItem
          onSelect={() => window.open(getFullUrlFromShortId(item.shortId), "_blank")}
          className="cursor-pointer"
        >
          <ExternalLink className="w-4 h-4 mr-2 text-blue-500" /> Visit Link
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => onEdit(item)}
          className="cursor-pointer"
        >
          <PenIcon className="w-4 h-4 mr-2" /> Edit Details
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={() => onQr({ url: getFullUrlFromShortId(item.shortId), shortId: item.shortId })}
          className="cursor-pointer"
        >
          <QrCodeIcon className="w-4 h-4 mr-2" /> QR Code
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => onDelete(item.id)}
          className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
        >
          <TrashIcon className="w-4 h-4 mr-2" /> Delete Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}