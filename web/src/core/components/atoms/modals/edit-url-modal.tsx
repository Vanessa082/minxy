"use client";

import { useForm } from "react-hook-form";
import { CompleteUrlRequestSchema, completeUrlRequestSchemaResolver } from "@/core/schema/url";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fetcher } from "@/lib/fetch";
import { toast } from "sonner";
import { ShortenResponse } from "@/core/type";

interface EditUrlModalProps {
  item: ShortenResponse;
  onClose: () => void;
  onSuccess: (updated: ShortenResponse) => void;
}

export function EditUrlModal({ item, onClose, onSuccess }: EditUrlModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CompleteUrlRequestSchema>({
    resolver: completeUrlRequestSchemaResolver,
    defaultValues: {
      original: item.original,
    }
  });

  const onSubmit = async (data: Partial<CompleteUrlRequestSchema>) => {
    onSuccess({ ...item, original: data.original! });
    onClose();

    try {
      const res = await Fetcher<ShortenResponse>(`/urls/${item.id}`, {
        method: "PATCH",
        body: data,
      });
      toast.success("Link updated successfully");
    } catch {
      toast.error("Failed to update link. Please refresh.");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Short Link (Read Only)</Label>
            <div className="px-3 py-2 bg-slate-50 border border-slate-200 rounded text-slate-500 font-mono text-sm">
              /{item.shortId}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Destination URL</Label>
            <Input {...register("original")} placeholder="https://..." />
            {errors.original && <p className="text-xs text-red-500">{errors.original.message}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}