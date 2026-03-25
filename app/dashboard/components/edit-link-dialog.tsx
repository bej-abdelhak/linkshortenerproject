"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLinkAction } from "./actions";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  shortCode: z
    .string()
    .min(3, "Short code must be at least 3 characters")
    .max(20, "Short code must be at most 20 characters")
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens"),
});

type FormValues = z.infer<typeof formSchema>;

interface EditLinkDialogProps {
  id: string;
  url: string;
  shortCode: string;
}

export function EditLinkDialog({ id, url, shortCode }: EditLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { url, shortCode },
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const result = await updateLinkAction({ id, url: values.url, shortCode: values.shortCode });

    if ("error" in result) {
      setServerError(result.error);
      return;
    }

    setOpen(false);
    router.refresh();
  }

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (!value) {
      reset({ url, shortCode });
      setServerError(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Edit link">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit short link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="edit-url">Destination URL</Label>
            <Input
              id="edit-url"
              type="url"
              placeholder="https://example.com/very-long-url"
              {...register("url")}
              aria-invalid={!!errors.url}
            />
            {errors.url && (
              <p className="text-xs text-destructive">{errors.url.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-shortCode">Short code</Label>
            <Input
              id="edit-shortCode"
              placeholder="my-link"
              {...register("shortCode")}
              aria-invalid={!!errors.shortCode}
            />
            <p className="text-xs text-muted-foreground">
              Lowercase letters, numbers, and hyphens only.
            </p>
            {errors.shortCode && (
              <p className="text-xs text-destructive">{errors.shortCode.message}</p>
            )}
          </div>

          {serverError && (
            <p className="text-sm text-destructive">{serverError}</p>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
