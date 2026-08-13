"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, Loader2, ImageOff } from "lucide-react";
import MediaUploader from "./MediaUploader";
import MediaCard from "./MediaCard";
import MediaPreviewModal from "./MediaPreviewModal";
import { MEDIA_FOLDERS } from "@/lib/cloudinary/constants";

const PAGE_SIZE = 24;

/**
 * @param {object} props
 * @param {"manage"|"picker"} [props.mode="manage"]
 * @param {(asset: object) => void} [props.onSelect] - required in picker mode
 * @param {"all"|"image"|"video"} [props.initialResourceType="all"] - lets a
 *   future picker default to e.g. "video" only, without changing this file
 */
export default function MediaLibrary({ mode = "manage", onSelect, initialResourceType = "all" }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [resourceType, setResourceType] = useState(initialResourceType);
  const [folder, setFolder] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewAsset, setPreviewAsset] = useState(null);

  // Debounce the search input so we're not firing a request per keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timeout);
  }, [search]);

  // Any filter change resets back to page 1.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, resourceType, folder]);

  const fetchMedia = useCallback(async () => {
    setIsLoading(true);
    setError("");

    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
      search: debouncedSearch,
      resourceType,
      folder,
    });

    try {
      const res = await fetch(`/api/admin/media?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load media.");
      const data = await res.json();
      setItems(data.items);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || "Failed to load media.");
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearch, resourceType, folder]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleUploaded = () => {
    fetchMedia();
  };

  const handleDeleted = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    fetchMedia();
  };

  const handleUpdated = (updated) => {
    setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setPreviewAsset(null);
  };

  return (
    // UI FIX: Added Flexbox layout. If it's a modal (picker), it gets a fixed height.
    <div className={mode === "picker" ? "flex flex-col h-[70vh] sm:h-[75vh]" : "flex flex-col"}>
      
      {/* --- TOP SECTION: Fixed Header (Never Scrolls) --- */}
      <div className="shrink-0">
        <div className="mb-4 rounded-2xl border border-neutral-200 bg-white p-3 sm:p-4">
          <MediaUploader onUploaded={handleUploaded} compact={mode === "picker"} />
        </div>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search filename, alt text, tags…"
              className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              className="rounded-lg border border-neutral-200 bg-white px-2.5 py-2 text-sm outline-none focus:border-accent"
            >
              <option value="all">All types</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
            </select>

            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="rounded-lg border border-neutral-200 bg-white px-2.5 py-2 text-sm outline-none focus:border-accent"
            >
              <option value="all">All folders</option>
              {MEDIA_FOLDERS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* --- END TOP SECTION --- */}

      {/* --- BOTTOM SECTION: Scrollable Grid Area --- */}
      {/* UI FIX: Only this specific area will scroll now, preventing overlap! */}
      <div className={mode === "picker" ? "flex-1 overflow-y-auto pr-2 min-h-0 pb-4" : ""}>
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-neutral-400">
            <Loader2 size={22} className="animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 py-16 text-center">
            <ImageOff size={26} className="text-neutral-300" />
            <p className="text-sm text-neutral-400">
              {search || resourceType !== "all" || folder !== "all"
                ? "No media matches your filters."
                : "No media uploaded yet — use the box above to add your first file."}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {items.map((asset) => (
                <MediaCard
                  key={asset.id}
                  asset={asset}
                  mode={mode}
                  onSelect={onSelect}
                  onDeleted={handleDeleted}
                  onOpenPreview={setPreviewAsset}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
              <p className="text-neutral-400">
                {total} file{total === 1 ? "" : "s"} · Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-neutral-200 px-3 py-1.5 font-medium text-neutral-600 transition-colors hover:bg-neutral-50 disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-lg border border-neutral-200 px-3 py-1.5 font-medium text-neutral-600 transition-colors hover:bg-neutral-50 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {/* --- END BOTTOM SECTION --- */}

      {previewAsset && (
        <MediaPreviewModal
          asset={previewAsset}
          onClose={() => setPreviewAsset(null)}
          onUpdated={handleUpdated}
          onDeleted={(id) => {
            setPreviewAsset(null);
            handleDeleted(id);
          }}
        />
      )}
    </div>
  );
}