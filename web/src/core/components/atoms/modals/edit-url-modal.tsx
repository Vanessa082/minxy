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
      shortId: item.shortId,
    }
  });

  const onSubmit = async (data: CompleteUrlRequestSchema) => {
    try {
      const res = await Fetcher<ShortenResponse>(`/urls/${item.id}`, {
        method: "PATCH",
        body: data,
      });

      if (res.data) {
        toast.success("Link updated successfully");
        onSuccess(res.data);
      }
    } catch {
      toast.error("Failed to update link");
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Original URL</Label>
            <Input {...register("original")} placeholder="https://..." />
            {errors.original && <p className="text-xs text-red-500">{errors.original.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Custom Path (Short ID)</Label>
            <Input {...register("shortId")} placeholder="my-custom-link" />
            {errors.shortId && <p className="text-xs text-red-500">{errors.shortId.message}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}