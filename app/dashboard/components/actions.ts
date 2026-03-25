"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { createLink, updateLink, deleteLink } from "@/data/links";

const createLinkSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
  shortCode: z.string().min(3, "Short code must be at least 3 characters").max(20, "Short code must be at most 20 characters").regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens allowed").optional(),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

export async function createLinkAction(input: CreateLinkInput): Promise<{ success: true; shortCode: string } | { error: string }> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { url, shortCode } = parsed.data;

  const code = shortCode ?? generateShortCode();

  try {
    const link = await createLink({ userId, url, shortCode: code });
    return { success: true, shortCode: link.shortCode };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create link";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { error: "That short code is already taken. Please choose another." };
    }
    return { error: "Failed to create link. Please try again." };
  }
}

const updateLinkSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url("Please enter a valid URL"),
  shortCode: z.string().min(3, "Short code must be at least 3 characters").max(20, "Short code must be at most 20 characters").regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens allowed"),
});

export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function updateLinkAction(input: UpdateLinkInput): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const { id, url, shortCode } = parsed.data;

  try {
    await updateLink(id, userId, { url, shortCode });
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update link";
    if (message.includes("unique") || message.includes("duplicate")) {
      return { error: "That short code is already taken. Please choose another." };
    }
    return { error: "Failed to update link. Please try again." };
  }
}

const deleteLinkSchema = z.object({
  id: z.string().uuid(),
});

export type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function deleteLinkAction(input: DeleteLinkInput): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();

  if (!userId) {
    return { error: "Unauthorized" };
  }

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  try {
    await deleteLink(parsed.data.id, userId);
    return { success: true };
  } catch {
    return { error: "Failed to delete link. Please try again." };
  }
}

function generateShortCode(): string {
  return Math.random().toString(36).slice(2, 8);
}
