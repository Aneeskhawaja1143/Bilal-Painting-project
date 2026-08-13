"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Plus,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Save,
  ImagePlus,
  Trash2,
} from "lucide-react";
import MediaPickerModal from "@/components/admin/MediaPickerModal";

/**
 * @param {object} props
 * @param {object|null} props.initialContent - AboutContent row (with `image` included), may be null on a fresh DB
 */
export default function AboutEditor({ initialContent }) {
  // ── Content form state ──────────────────────────────────────────────
  const [form, setForm] = useState({
    badge: initialContent?.badge || "",
    heading: initialContent?.heading || "",
    headingAccent: initialContent?.headingAccent || "",
    paragraph1: initialContent?.paragraph1 || "",
    paragraph2: initialContent?.paragraph2 || "",
    experienceYears: initialContent?.experienceYears || "",
  });
  const [bulletPoints, setBulletPoints] = useState(initialContent?.bulletPoints || []);
  const [newBulletPoint, setNewBulletPoint] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // "success" | "error" | null
  const [saveMessage, setSaveMessage] = useState("");

  // ── Image state (single image, unlike Hero's ordered list) ──────────
  const [image, setImage] = useState(initialContent?.image || null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  // ── Client-side validation (mirrors lib/validation/about.js) ────────
  const validateClientSide = () => {
    const errors = {};
    const badge = form.badge.trim();
    const heading = form.heading.trim();
    const headingAccent = form.headingAccent.trim();
    const paragraph1 = form.paragraph1.trim();
    const paragraph2 = form.paragraph2.trim();
    const experienceYears = form.experienceYears.trim();
    const cleanedBullets = bulletPoints.map((b) => b.trim()).filter(Boolean);

    if (!badge) errors.badge = "Badge text is required.";
    else if (badge.length > 120) errors.badge = "Badge text must be 120 characters or fewer.";

    if (!heading) errors.heading = "Heading is required.";
    else if (heading.length > 160) errors.heading = "Heading must be 160 characters or fewer.";

    if (!headingAccent) errors.headingAccent = "Accent heading is required.";
    else if (headingAccent.length > 120)
      errors.headingAccent = "Accent heading must be 120 characters or fewer.";

    if (!paragraph1) errors.paragraph1 = "First paragraph is required.";
    else if (paragraph1.length < 20) errors.paragraph1 = "First paragraph should be at least 20 characters.";
    else if (paragraph1.length > 800) errors.paragraph1 = "First paragraph must be 800 characters or fewer.";

    if (!paragraph2) errors.paragraph2 = "Second paragraph is required.";
    else if (paragraph2.length < 20) errors.paragraph2 = "Second paragraph should be at least 20 characters.";
    else if (paragraph2.length > 800) errors.paragraph2 = "Second paragraph must be 800 characters or fewer.";

    if (!experienceYears) errors.experienceYears = 'Experience (e.g. "14+") is required.';
    else if (experienceYears.length > 10) errors.experienceYears = 'Keep this short, e.g. "14+".';

    if (cleanedBullets.length === 0) errors.bulletPoints = "Add at least one bullet point.";
    else if (cleanedBullets.length > 8) errors.bulletPoints = "Use 8 bullet points or fewer.";

    return errors;
  };

  const addBulletPoint = () => {
    const trimmed = newBulletPoint.trim();
    if (!trimmed) return;
    setBulletPoints((prev) => [...prev, trimmed]);
    setNewBulletPoint("");
    setFieldErrors((prev) => ({ ...prev, bulletPoints: undefined }));
  };

  const removeBulletPoint = (index) => {
    setBulletPoints((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageSelected = (asset) => {
    setImage(asset);
    setIsPickerOpen(false);
    setFieldErrors((prev) => ({ ...prev, imageId: undefined }));
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
      const res = await fetch("/api/admin/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, bulletPoints, imageId: image?.id || null }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setSaveStatus("error");
        setSaveMessage(data.error || "Failed to save. Please check the fields above.");
        return;
      }

      setImage(data.image || null);
      setSaveStatus("success");
      setSaveMessage("About content saved.");
    } catch (err) {
      setSaveStatus("error");
      setSaveMessage("Network error — please try again.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  return (
    <div className="space-y-6">
      {/* ── Content form ─────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
        <h2 className="mb-4 text-base font-bold text-primary">About Content</h2>

        <div className="space-y-4">
          <Field label="Badge" error={fieldErrors.badge}>
            <input
              type="text"
              value={form.badge}
              onChange={(e) => updateField("badge", e.target.value)}
              className={inputClass(fieldErrors.badge)}
              placeholder="About Bilal Painting & Decorating"
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Heading" error={fieldErrors.heading}>
              <input
                type="text"
                value={form.heading}
                onChange={(e) => updateField("heading", e.target.value)}
                className={inputClass(fieldErrors.heading)}
                placeholder="Trusted Painters & Decorators in"
              />
            </Field>
            <Field label="Heading — accent part" error={fieldErrors.headingAccent}>
              <input
                type="text"
                value={form.headingAccent}
                onChange={(e) => updateField("headingAccent", e.target.value)}
                className={inputClass(fieldErrors.headingAccent)}
                placeholder="Birmingham"
              />
            </Field>
          </div>

          <Field label="Paragraph 1" error={fieldErrors.paragraph1}>
            <textarea
              value={form.paragraph1}
              onChange={(e) => updateField("paragraph1", e.target.value)}
              rows={4}
              className={inputClass(fieldErrors.paragraph1)}
              placeholder="For over 14 years, Bilal Painting & Decorating has been…"
            />
          </Field>

          <Field label="Paragraph 2" error={fieldErrors.paragraph2}>
            <textarea
              value={form.paragraph2}
              onChange={(e) => updateField("paragraph2", e.target.value)}
              rows={4}
              className={inputClass(fieldErrors.paragraph2)}
              placeholder="We also provide specialist painting services for…"
            />
          </Field>

          <Field label="Experience years" error={fieldErrors.experienceYears}>
            <input
              type="text"
              value={form.experienceYears}
              onChange={(e) => updateField("experienceYears", e.target.value)}
              className={`${inputClass(fieldErrors.experienceYears)} max-w-[160px]`}
              placeholder="14+"
            />
          </Field>

          <Field label="Bullet points" error={fieldErrors.bulletPoints}>
            <ul className="mb-2 space-y-1.5">
              {bulletPoints.map((point, index) => (
                <li
                  key={`${point}-${index}`}
                  className="flex items-center justify-between gap-2 rounded-lg bg-neutral-50 px-3 py-2 text-sm text-neutral-700"
                >
                  <span>{point}</span>
                  <button
                    type="button"
                    onClick={() => removeBulletPoint(index)}
                    className="shrink-0 rounded-full p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600"
                    aria-label={`Remove ${point}`}
                  >
                    <X size={13} />
                  </button>
                </li>
              ))}
              {bulletPoints.length === 0 && (
                <p className="text-xs text-neutral-400">No bullet points yet — add one below.</p>
              )}
            </ul>
            <div className="flex gap-2">
              <input
                type="text"
                value={newBulletPoint}
                onChange={(e) => setNewBulletPoint(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addBulletPoint();
                  }
                }}
                placeholder="e.g. Meticulous surface preparation"
                className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="button"
                onClick={addBulletPoint}
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

      {/* ── Image ────────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
        <h2 className="mb-4 text-base font-bold text-primary">About Image</h2>

        {image ? (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-100 sm:w-72">
              <Image
                src={image.url}
                alt={image.altText || "About section image"}
                fill
                sizes="(max-width: 640px) 100vw, 288px"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex gap-2 sm:flex-col">
              <button
                type="button"
                onClick={() => setIsPickerOpen(true)}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-neutral-200 px-3.5 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
              >
                <ImagePlus size={14} />
                Replace
              </button>
              <button
                type="button"
                onClick={() => setImage(null)}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3.5 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
              >
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 py-10 text-center transition-colors hover:border-accent/50 hover:bg-accent/5"
          >
            <ImagePlus size={22} className="text-accent" />
            <span className="text-sm font-medium text-neutral-600">Choose an image</span>
            <span className="text-xs text-neutral-400">No image selected yet</span>
          </button>
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