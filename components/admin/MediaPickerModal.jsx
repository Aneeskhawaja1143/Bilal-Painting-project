"use client";

import { X } from "lucide-react";
import MediaLibrary from "./MediaLibrary";

/**
 * Usage (from a future content form, e.g. the Hero editor in Phase 3):
 *
 *   const [pickerOpen, setPickerOpen] = useState(false);
 *
 *   <button onClick={() => setPickerOpen(true)}>Choose Image</button>
 *
 *   <MediaPickerModal
 *     isOpen={pickerOpen}
 *     onClose={() => setPickerOpen(false)}
 *     initialResourceType="image"
 *     onSelect={(asset) => {
 *       setHeroImageId(asset.id); // store the MediaAsset id against HeroImage.mediaId
 *       setPickerOpen(false);
 *     }}
 *   />
 *
 * This component intentionally contains no upload or fetch logic of its
 * own — everything is delegated to MediaLibrary/MediaUploader, so every
 * section that needs a picker gets uploads, search, filtering, and
 * pagination for free.
 */
export default function MediaPickerModal({ isOpen, onClose, onSelect, initialResourceType = "all" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 sm:items-center">
      <div className="w-full max-w-5xl rounded-2xl bg-white p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-primary">Select Media</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
          >
            <X size={18} />
          </button>
        </div>

        <MediaLibrary
          mode="picker"
          initialResourceType={initialResourceType}
          onSelect={(asset) => {
            onSelect?.(asset);
          }}
        />
      </div>
    </div>
  );
}
