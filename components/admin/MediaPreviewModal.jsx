"use client";

import { useState } from "react";
import { X, Trash2, Save, Loader2 } from "lucide-react";
import { formatBytes } from "@/lib/utils/formatBytes";
import { formatDate } from "@/lib/utils/formatDate";

export default function MediaPreviewModal({ asset, onClose, onUpdated, onDeleted }) {
  const [altText, setAltText] = useState(asset.altText || "");
  const [tagsInput, setTagsInput] = useState((asset.tags || []).join(", "));
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const isVideo = asset.resourceType === "video";

  const handleSave = async () => {
    setIsSaving(true);
    setError("");

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const res = await fetch(`/api/admin/media/${asset.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ altText, tags }),
    });

    setIsSaving(false);

    if (!res.ok) {
      setError("Failed to save changes.");
      return;
    }

    const updated = await res.json();
    onUpdated?.(updated);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete "${asset.filename || asset.id}"? This can't be undone.`)) return;

    setIsDeleting(true);
    const res = await fetch(`/api/admin/media/${asset.id}`, { method: "DELETE" });

    if (res.status === 409) {
      const data = await res.json();
      const usageList = (data.usage || []).join(", ");
      const forceDelete = confirm(
        `This file is currently used by: ${usageList}.\n\nDeleting it may break those sections until they're updated. Delete anyway?`
      );
      if (forceDelete) {
        const forceRes = await fetch(`/api/admin/media/${asset.id}?force=true`, {
          method: "DELETE",
        });
        if (forceRes.ok) onDeleted?.(asset.id);
      }
      setIsDeleting(false);
      return;
    }

    setIsDeleting(false);
    if (res.ok) onDeleted?.(asset.id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white sm:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-1 items-center justify-center bg-neutral-900 sm:w-3/5">
          {isVideo ? (
            <video src={asset.url} controls className="max-h-[50vh] w-full sm:max-h-[90vh]" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={asset.url}
              alt={asset.altText || asset.filename || "Media"}
              className="max-h-[50vh] w-full object-contain sm:max-h-[90vh]"
            />
          )}
        </div>

        <div className="flex w-full flex-col overflow-y-auto p-5 sm:w-2/5">
          <div className="mb-4 flex items-start justify-between">
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-primary">
                {asset.filename || "Untitled"}
              </p>
              <p className="mt-0.5 text-xs text-neutral-400">
                {formatDate(asset.createdAt)} · {formatBytes(asset.bytes)}
                {!isVideo && asset.width && asset.height && ` · ${asset.width}×${asset.height}`}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mb-3 rounded-lg bg-neutral-50 px-3 py-2">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Folder</p>
            <p className="text-sm text-neutral-700">{asset.folder}</p>
          </div>

          <label className="mb-3 block">
            <span className="mb-1 block text-xs font-semibold text-neutral-500">Alt text</span>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Describe this image for accessibility & SEO"
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>

          <label className="mb-4 block">
            <span className="mb-1 block text-xs font-semibold text-neutral-500">
              Tags <span className="font-normal text-neutral-400">(comma separated)</span>
            </span>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. living-room, before, kitchen"
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </label>

          {error && <p className="mb-3 text-xs text-red-500">{error}</p>}

          <div className="mt-auto flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
            >
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 disabled:opacity-60"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
