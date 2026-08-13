"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check, Trash2, Maximize2, Video as VideoIcon } from "lucide-react";
import { formatBytes } from "@/lib/utils/formatBytes";
import { formatDate } from "@/lib/utils/formatDate";
import { getVideoThumbnailUrl } from "@/lib/cloudinary/clientHelpers";

/**
 * @param {object} props
 * @param {object} props.asset - a MediaAsset row
 * @param {"manage"|"picker"} props.mode
 * @param {(asset: object) => void} [props.onSelect] - picker mode only
 * @param {(id: string) => void} [props.onDeleted] - manage mode only
 * @param {(asset: object) => void} props.onOpenPreview
 */
export default function MediaCard({ asset, mode = "manage", onSelect, onDeleted, onOpenPreview }) {
  const [copied, setCopied] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isVideo = asset.resourceType === "video";

  const handleCopy = async (e) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(asset.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
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
    <div className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={() => onOpenPreview?.(asset)}
        className="relative block aspect-square w-full overflow-hidden bg-neutral-100"
      >
        {isVideo ? (
          <>
            <Image
              src={getVideoThumbnailUrl(asset.url)}
              alt={asset.altText || asset.filename || "Video thumbnail"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90">
                <VideoIcon size={16} className="text-primary" />
              </div>
            </div>
          </>
        ) : (
          <Image
            src={asset.url}
            alt={asset.altText || asset.filename || "Media"}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
            unoptimized
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/20 group-hover:opacity-100">
          <Maximize2 size={18} className="text-white drop-shadow" />
        </div>
      </button>

      <div className="p-3">
        <p className="truncate text-xs font-semibold text-neutral-700" title={asset.filename || undefined}>
          {asset.filename || "Untitled"}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-neutral-400">
          <span>{formatDate(asset.createdAt)}</span>
          <span>·</span>
          <span>{formatBytes(asset.bytes)}</span>
          {!isVideo && asset.width && asset.height && (
            <>
              <span>·</span>
              <span>
                {asset.width}×{asset.height}
              </span>
            </>
          )}
        </div>

        {asset.tags?.length > 0 && (
          <div className="mt-1.5 flex flex-wrap gap-1">
            {asset.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-2.5 flex items-center gap-1.5">
          {mode === "picker" ? (
            <button
              type="button"
              onClick={() => onSelect?.(asset)}
              className="flex-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Select
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCopy}
                className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-neutral-200 px-2 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
              >
                {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                {copied ? "Copied" : "Copy URL"}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center justify-center rounded-lg border border-neutral-200 p-1.5 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
                aria-label="Delete"
              >
                <Trash2 size={13} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
