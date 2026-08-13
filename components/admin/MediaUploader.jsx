"use client";

import { useCallback, useRef, useState } from "react";
import { UploadCloud, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { MEDIA_FOLDERS } from "@/lib/cloudinary/constants";
import { getCloudinaryUploadUrl } from "@/lib/cloudinary/clientHelpers";

const MAX_SIZE_MB = 100;

/**
 * @param {object} props
 * @param {(asset: object) => void} props.onUploaded - called once per file
 *   after it's uploaded to Cloudinary AND persisted as a MediaAsset row.
 * @param {string} [props.defaultFolder="general"]
 * @param {boolean} [props.allowFolderSelect=true] - hide the folder dropdown
 *   when the calling context already knows the folder (e.g. a future
 *   Hero image picker could pin this to "hero").
 * @param {boolean} [props.compact=false] - smaller variant for embedding
 *   inside a modal/picker rather than the full-page Media Library.
 */
export default function MediaUploader({
  onUploaded,
  defaultFolder = "general",
  allowFolderSelect = true,
  compact = false,
}) {
  const [folder, setFolder] = useState(defaultFolder);
  const [isDragging, setIsDragging] = useState(false);
  const [uploads, setUploads] = useState([]); // { id, name, progress, status, error }
  const inputRef = useRef(null);

  const updateUpload = (id, patch) => {
    setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  };

  const uploadOne = useCallback(
    async (file) => {
      const id = `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`;

      if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
        setUploads((prev) => [
          ...prev,
          { id, name: file.name, progress: 0, status: "error", error: "Only images and videos are supported." },
        ]);
        return;
      }

      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setUploads((prev) => [
          ...prev,
          { id, name: file.name, progress: 0, status: "error", error: `File exceeds ${MAX_SIZE_MB}MB limit.` },
        ]);
        return;
      }

      setUploads((prev) => [
        ...prev,
        { id, name: file.name, progress: 0, status: "uploading", error: null },
      ]);

      try {
        // 1. Get a signed payload for this folder from our server.
        const signRes = await fetch("/api/admin/media/sign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder }),
        });
        if (!signRes.ok) throw new Error("Failed to get upload signature.");
        const signed = await signRes.json();

        // 2. Upload the file directly to Cloudinary (never through our server).
        const cloudinaryResult = await uploadToCloudinary({
          file,
          signed,
          onProgress: (pct) => updateUpload(id, { progress: pct }),
        });

        // 3. Persist the resulting metadata as a MediaAsset row.
        const saveRes = await fetch("/api/admin/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...cloudinaryResult, folder }),
        });
        if (!saveRes.ok) throw new Error("Upload succeeded but saving the record failed.");
        const asset = await saveRes.json();

        updateUpload(id, { progress: 100, status: "done" });
        onUploaded?.(asset);

        // Clear the completed entry after a moment so the list doesn't grow forever.
        setTimeout(() => {
          setUploads((prev) => prev.filter((u) => u.id !== id));
        }, 2000);
      } catch (err) {
        updateUpload(id, { status: "error", error: err.message || "Upload failed." });
      }
    },
    [folder, onUploaded]
  );

  const handleFiles = useCallback(
    (fileList) => {
      Array.from(fileList).forEach((file) => uploadOne(file));
    },
    [uploadOne]
  );

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        {allowFolderSelect && (
          <label className="flex items-center gap-2 text-sm">
            <span className="font-medium text-neutral-600">Folder:</span>
            <select
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              className="rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-accent"
            >
              {MEDIA_FOLDERS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 text-center transition-colors ${
          compact ? "py-6" : "py-10"
        } ${
          isDragging
            ? "border-accent bg-accent/5"
            : "border-neutral-300 bg-neutral-50 hover:border-accent/50 hover:bg-accent/5"
        }`}
      >
        <UploadCloud size={compact ? 22 : 28} className="text-accent" />
        <p className="text-sm font-medium text-neutral-600">
          Drag &amp; drop images or videos, or click to browse
        </p>
        <p className="text-xs text-neutral-400">Up to {MAX_SIZE_MB}MB per file</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
            e.target.value = ""; // allow re-selecting the same file later
          }}
        />
      </div>

      {uploads.length > 0 && (
        <ul className="mt-4 space-y-2">
          {uploads.map((u) => (
            <li
              key={u.id}
              className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3.5 py-2.5"
            >
              {u.status === "uploading" && (
                <Loader2 size={16} className="shrink-0 animate-spin text-accent" />
              )}
              {u.status === "done" && (
                <CheckCircle2 size={16} className="shrink-0 text-green-600" />
              )}
              {u.status === "error" && (
                <XCircle size={16} className="shrink-0 text-red-500" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-700">{u.name}</p>
                {u.status === "uploading" && (
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-200"
                      style={{ width: `${u.progress}%` }}
                    />
                  </div>
                )}
                {u.status === "error" && (
                  <p className="mt-0.5 text-xs text-red-500">{u.error}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Performs the actual direct-to-Cloudinary upload via XMLHttpRequest
 * (rather than fetch) so we can report real upload progress — important
 * for video files, which can take a while.
 */
function uploadToCloudinary({ file, signed, onProgress }) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", signed.apiKey);
    formData.append("timestamp", signed.timestamp);
    formData.append("signature", signed.signature);
    formData.append("folder", signed.folder);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", getCloudinaryUploadUrl(signed.cloudName));

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error("Cloudinary upload failed."));
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload."));
    xhr.send(formData);
  });
}
