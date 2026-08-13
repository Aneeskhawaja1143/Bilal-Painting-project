"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  X,
  ArrowUp,
  ArrowDown,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Pencil,
  Save,
} from "lucide-react";
import MediaPickerModal from "@/components/admin/MediaPickerModal";

/**
 * @param {object} props
 * @param {object|null} props.initialContent - HeroContent row (may be null on a fresh DB)
 * @param {Array} props.initialImages - HeroImage rows with `media` included, ordered
 */
export default function HeroEditor({ initialContent, initialImages }) {
  // ── Content form state ──────────────────────────────────────────────
  const [form, setForm] = useState({
    badge: initialContent?.badge || "",
    headingAccent: initialContent?.headingAccent || "",
    headingMain: initialContent?.headingMain || "",
    description: initialContent?.description || "",
  });
  const [trustBadges, setTrustBadges] = useState(initialContent?.trustBadges || []);
  const [newBadge, setNewBadge] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // "success" | "error" | null
  const [saveMessage, setSaveMessage] = useState("");

  // ── Images state ─────────────────────────────────────────────────────
  const [images, setImages] = useState(initialImages || []);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pendingImageAction, setPendingImageAction] = useState(null); // { id, type: "move"|"delete"|"edit"|"add" }
  const [editingImageId, setEditingImageId] = useState(null);
  const [editingAltText, setEditingAltText] = useState("");
  const [imagesError, setImagesError] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // ── Client-side validation (mirrors lib/validation/hero.js so the admin
  // gets instant feedback before the round-trip to the server, which is
  // still the authoritative check). ────────────────────────────────────
  const validateClientSide = () => {
    const errors = {};
    const badge = form.badge.trim();
    const headingAccent = form.headingAccent.trim();
    const headingMain = form.headingMain.trim();
    const description = form.description.trim();
    const cleanedBadges = trustBadges.map((b) => b.trim()).filter(Boolean);

    if (!badge) errors.badge = "Badge text is required.";
    else if (badge.length > 120) errors.badge = "Badge text must be 120 characters or fewer.";

    if (!headingAccent) errors.headingAccent = "Accent heading is required.";
    else if (headingAccent.length > 120)
      errors.headingAccent = "Accent heading must be 120 characters or fewer.";

    if (!headingMain) errors.headingMain = "Main heading is required.";
    else if (headingMain.length > 160)
      errors.headingMain = "Main heading must be 160 characters or fewer.";

    if (!description) errors.description = "Description is required.";
    else if (description.length < 20) errors.description = "Description should be at least 20 characters.";
    else if (description.length > 600) errors.description = "Description must be 600 characters or fewer.";

    if (cleanedBadges.length === 0) errors.trustBadges = "Add at least one trust badge.";
    else if (cleanedBadges.length > 8) errors.trustBadges = "Use 8 trust badges or fewer.";

    return errors;
  };

  const addTrustBadge = () => {
    const trimmed = newBadge.trim();
    if (!trimmed) return;
    setTrustBadges((prev) => [...prev, trimmed]);
    setNewBadge("");
    setFieldErrors((prev) => ({ ...prev, trustBadges: undefined }));
  };

  const removeTrustBadge = (index) => {
    setTrustBadges((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaveStatus(null);
    setSaveMessage("");

    const clientErrors = validateClientSide();
    if (Object.keys(clientErrors).length > 0) {
      setFieldErrors(clientErrors);
      setSaveStatus("error");
      setSaveMessage("Please fix the highlighted fields.");
      return;
    }

    setIsSaving(true);
    setFieldErrors({});

    try {
      const res = await fetch("/api/admin/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, trustBadges }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setSaveStatus("error");
        setSaveMessage(data.error || "Failed to save. Please check the fields above.");
        return;
      }

      setSaveStatus("success");
      setSaveMessage("Hero content saved.");
    } catch (err) {
      setSaveStatus("error");
      setSaveMessage("Network error — please try again.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  // ── Image mutations ──────────────────────────────────────────────────

  const handleImageSelected = async (asset) => {
    setIsPickerOpen(false);
    setImagesError("");
    setPendingImageAction({ id: "new", type: "add" });

    const fallbackAlt = asset.altText || asset.filename || "Hero image";

    try {
      const res = await fetch("/api/admin/hero/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaId: asset.id, altText: fallbackAlt }),
      });
      const data = await res.json();

      if (!res.ok) {
        setImagesError(data.error || "Failed to add image.");
        return;
      }

      setImages((prev) => [...prev, data]);
    } catch (err) {
      setImagesError("Network error while adding image.");
    } finally {
      setPendingImageAction(null);
    }
  };

  const handleMove = async (imageId, direction) => {
    setImagesError("");
    setPendingImageAction({ id: imageId, type: "move" });

    try {
      const res = await fetch("/api/admin/hero/images/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageId, direction }),
      });
      const data = await res.json();

      if (!res.ok) {
        setImagesError(data.error || "Failed to reorder image.");
        return;
      }

      setImages(data);
    } catch (err) {
      setImagesError("Network error while reordering.");
    } finally {
      setPendingImageAction(null);
    }
  };

  const handleDeleteImage = async (imageId) => {
    if (!confirm("Remove this image from the Hero section?")) return;

    setImagesError("");
    setPendingImageAction({ id: imageId, type: "delete" });

    try {
      const res = await fetch(`/api/admin/hero/images/${imageId}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setImagesError(data.error || "Failed to delete image.");
        return;
      }
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      setImagesError("Network error while deleting.");
    } finally {
      setPendingImageAction(null);
    }
  };

  const startEditingAlt = (image) => {
    setEditingImageId(image.id);
    setEditingAltText(image.altText || "");
  };

  const saveAltText = async (imageId) => {
    const trimmed = editingAltText.trim();
    if (!trimmed) {
      setImagesError("Alt text is required.");
      return;
    }

    setPendingImageAction({ id: imageId, type: "edit" });
    setImagesError("");

    try {
      const res = await fetch(`/api/admin/hero/images/${imageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ altText: trimmed }),
      });
      const data = await res.json();

      if (!res.ok) {
        setImagesError(data.error || "Failed to update alt text.");
        return;
      }

      setImages((prev) => prev.map((img) => (img.id === imageId ? data : img)));
      setEditingImageId(null);
    } catch (err) {
      setImagesError("Network error while saving alt text.");
    } finally {
      setPendingImageAction(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Content form ─────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
        <h2 className="mb-4 text-base font-bold text-primary">Hero Content</h2>

        <div className="space-y-4">
          <Field label="Badge" error={fieldErrors.badge}>
            <input
              type="text"
              value={form.badge}
              onChange={(e) => updateField("badge", e.target.value)}
              className={inputClass(fieldErrors.badge)}
              placeholder="Expert Services for Homes & Businesses"
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Heading — accent part" error={fieldErrors.headingAccent}>
              <input
                type="text"
                value={form.headingAccent}
                onChange={(e) => updateField("headingAccent", e.target.value)}
                className={inputClass(fieldErrors.headingAccent)}
                placeholder="Professional Painters"
              />
            </Field>
            <Field label="Heading — main part" error={fieldErrors.headingMain}>
              <input
                type="text"
                value={form.headingMain}
                onChange={(e) => updateField("headingMain", e.target.value)}
                className={inputClass(fieldErrors.headingMain)}
                placeholder="& Decorators in Birmingham"
              />
            </Field>
          </div>

          <Field label="Description" error={fieldErrors.description}>
            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={4}
              className={inputClass(fieldErrors.description)}
              placeholder="Transform your property with…"
            />
          </Field>

          <Field label="Trust badges" error={fieldErrors.trustBadges}>
            <div className="mb-2 flex flex-wrap gap-2">
              {trustBadges.map((badge, index) => (
                <span
                  key={`${badge}-${index}`}
                  className="flex items-center gap-1.5 rounded-full bg-accent/10 py-1 pl-3 pr-1.5 text-xs font-semibold text-accent"
                >
                  {badge}
                  <button
                    type="button"
                    onClick={() => removeTrustBadge(index)}
                    className="rounded-full p-0.5 hover:bg-accent/20"
                    aria-label={`Remove ${badge}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
              {trustBadges.length === 0 && (
                <p className="text-xs text-neutral-400">No trust badges yet — add one below.</p>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTrustBadge();
                  }
                }}
                placeholder="e.g. Fully Insured"
                className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="button"
                onClick={addTrustBadge}
                className="flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
              >
                <Plus size={14} />
                Add
              </button>
            </div>
          </Field>
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-neutral-100 pt-5">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {isSaving ? "Saving…" : "Save Changes"}
          </button>

          {saveStatus === "success" && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
              <CheckCircle2 size={15} />
              {saveMessage}
            </span>
          )}
          {saveStatus === "error" && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-red-500">
              <AlertCircle size={15} />
              {saveMessage}
            </span>
          )}
        </div>
      </div>

      {/* ── Images ───────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-primary">Hero Images</h2>
            <p className="mt-0.5 text-xs text-neutral-400">
              Shown in order on the homepage. Use the arrows to reorder.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            disabled={pendingImageAction?.type === "add"}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
          >
            {pendingImageAction?.type === "add" ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Plus size={14} />
            )}
            Add Image
          </button>
        </div>

        {imagesError && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
            <AlertCircle size={15} />
            {imagesError}
          </div>
        )}

        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 py-12 text-center">
            <p className="text-sm text-neutral-400">
              No hero images yet. Add at least one so the homepage hero has something to show.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {images.map((image, index) => {
              const isBusy = pendingImageAction?.id === image.id;
              const isEditing = editingImageId === image.id;

              return (
                <li
                  key={image.id}
                  className="overflow-hidden rounded-xl border border-neutral-200 bg-white"
                >
                  <div className="relative aspect-video w-full bg-neutral-100">
                    <Image
                      src={image.media.url}
                      alt={image.altText || "Hero image"}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover"
                      unoptimized
                    />
                    <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-semibold text-white">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="p-3">
                    {isEditing ? (
                      <div className="mb-2">
                        <input
                          type="text"
                          value={editingAltText}
                          onChange={(e) => setEditingAltText(e.target.value)}
                          className="w-full rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                          placeholder="Alt text"
                          autoFocus
                        />
                        <div className="mt-1.5 flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => saveAltText(image.id)}
                            disabled={isBusy}
                            className="flex-1 rounded-lg bg-accent px-2 py-1 text-[11px] font-semibold text-white disabled:opacity-60"
                          >
                            {isBusy ? "Saving…" : "Save"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingImageId(null)}
                            className="rounded-lg border border-neutral-200 px-2 py-1 text-[11px] font-medium text-neutral-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => startEditingAlt(image)}
                        className="mb-2 flex w-full items-start gap-1 text-left text-xs text-neutral-500 hover:text-neutral-700"
                      >
                        <Pencil size={11} className="mt-0.5 shrink-0" />
                        <span className="line-clamp-2">{image.altText || "Add alt text…"}</span>
                      </button>
                    )}

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMove(image.id, "up")}
                        disabled={index === 0 || isBusy}
                        className="flex flex-1 items-center justify-center rounded-lg border border-neutral-200 py-1.5 text-neutral-500 transition-colors hover:bg-neutral-50 disabled:opacity-30"
                        aria-label="Move up"
                      >
                        {isBusy && pendingImageAction?.type === "move" ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <ArrowUp size={13} />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(image.id, "down")}
                        disabled={index === images.length - 1 || isBusy}
                        className="flex flex-1 items-center justify-center rounded-lg border border-neutral-200 py-1.5 text-neutral-500 transition-colors hover:bg-neutral-50 disabled:opacity-30"
                        aria-label="Move down"
                      >
                        <ArrowDown size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(image.id)}
                        disabled={isBusy}
                        className="flex items-center justify-center rounded-lg border border-red-200 p-1.5 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-30"
                        aria-label="Remove image"
                      >
                        {isBusy && pendingImageAction?.type === "delete" ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <Trash2 size={13} />
                        )}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <MediaPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={handleImageSelected}
        initialResourceType="image"
      />
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-neutral-700">{label}</span>
      {children}
      {error && (
        <span className="mt-1 flex items-center gap-1 text-xs text-red-500">
          <AlertCircle size={11} />
          {error}
        </span>
      )}
    </label>
  );
}

function inputClass(error) {
  return `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 ${
    error
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-neutral-200 focus:border-accent focus:ring-accent/20"
  }`;
}