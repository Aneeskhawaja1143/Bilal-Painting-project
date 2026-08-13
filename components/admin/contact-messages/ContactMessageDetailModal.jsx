"use client";

import { useState } from "react";
import { X, Mail, Phone, Calendar, Tag, Loader2, Trash2, CheckCircle2, Circle } from "lucide-react";

function formatDate(date) {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * @param {object} props
 * @param {object} props.message - ContactMessage row
 * @param {() => void} props.onClose
 * @param {(updated: object) => void} props.onUpdated
 * @param {(id: string) => void} props.onDeleted
 */
export default function ContactMessageDetailModal({ message, onClose, onUpdated, onDeleted }) {
  const [isToggling, setIsToggling] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleToggleRead = async () => {
    setIsToggling(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/contact-messages/${message.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !message.isRead }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to update message.");
        return;
      }

      onUpdated(data);
    } catch (err) {
      setError("Network error while updating.");
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete the message from "${message.name}"? This can't be undone.`)) return;

    setIsDeleting(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/contact-messages/${message.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Failed to delete message.");
        setIsDeleting(false);
        return;
      }

      onDeleted(message.id);
    } catch (err) {
      setError("Network error while deleting.");
      setIsDeleting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-neutral-100 p-5 sm:p-6">
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center gap-2">
              <h2 className="truncate text-lg font-bold text-primary">{message.name}</h2>
              {message.isRead ? (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-500">
                  <CheckCircle2 size={11} />
                  Read
                </span>
              ) : (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                  <Circle size={11} fill="currentColor" />
                  Unread
                </span>
              )}
            </div>
            {message.subject && (
              <p className="text-sm font-medium text-neutral-600">{message.subject}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-1 gap-2 border-b border-neutral-100 p-5 text-sm sm:grid-cols-2 sm:p-6">
          {/* FIXED: added <a tag here */}
          <a
            href={`mailto:${message.email}`}
            className="flex items-center gap-2 text-neutral-600 hover:text-accent"
          >
            <Mail size={14} className="shrink-0 text-neutral-400" />
            <span className="truncate">{message.email}</span>
          </a>
          
          {message.phone && (
            /* FIXED: added <a tag here */
            <a
              href={`tel:${message.phone}`}
              className="flex items-center gap-2 text-neutral-600 hover:text-accent"
            >
              <Phone size={14} className="shrink-0 text-neutral-400" />
              {message.phone}
            </a>
          )}
          
          <div className="flex items-center gap-2 text-neutral-500">
            <Calendar size={14} className="shrink-0 text-neutral-400" />
            {formatDate(message.createdAt)}
          </div>
          {message.subject && (
            <div className="flex items-center gap-2 text-neutral-500">
              <Tag size={14} className="shrink-0 text-neutral-400" />
              {message.subject}
            </div>
          )}
        </div>

        {/* Message body — rendered as plain text, never HTML */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-neutral-700">
            {message.message}
          </p>
        </div>

        {error && (
          <div className="mx-5 mb-3 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600 sm:mx-6">
            {error}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 border-t border-neutral-100 p-5 sm:p-6">
          <button
            type="button"
            onClick={handleToggleRead}
            disabled={isToggling}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-50 disabled:opacity-60"
          >
            {isToggling ? (
              <Loader2 size={14} className="animate-spin" />
            ) : message.isRead ? (
              <Circle size={14} />
            ) : (
              <CheckCircle2 size={14} />
            )}
            Mark as {message.isRead ? "Unread" : "Read"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50 disabled:opacity-60"
          >
            {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}