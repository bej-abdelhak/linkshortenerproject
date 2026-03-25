"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

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
import { createLinkAction } from "./actions";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  shortCode: z
    .string()
    .min(3, "Short code must be at least 3 characters")
    .max(20, "Short code must be at most 20 characters")
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens")
    .or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

export function CreateLinkDialog() {
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
    defaultValues: { url: "", shortCode: "" },
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const result = await createLinkAction({
      url: values.url,
      shortCode: values.shortCode || undefined,
    });

    if ("error" in result) {
      setServerError(result.error);
      return;
    }

    reset();
    setOpen(false);
    router.refresh();
  }

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (!value) {
      reset();
      setServerError(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new short link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="url">Destination URL</Label>
            <Input
              id="url"
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
            <Label htmlFor="shortCode">
              Short code{" "}
              <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="shortCode"
              placeholder="my-link"
              {...register("shortCode")}
              aria-invalid={!!errors.shortCode}
            />
            <p className="text-xs text-muted-foreground">
              Leave blank to auto-generate. Lowercase letters, numbers, and hyphens only.
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
              {isSubmitting ? "Creating…" : "Create Link"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
