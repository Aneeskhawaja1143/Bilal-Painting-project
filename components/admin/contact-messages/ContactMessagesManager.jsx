"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, Loader2, Inbox, Circle, CheckCircle2 } from "lucide-react";
import ContactMessageDetailModal from "./ContactMessageDetailModal";

const PAGE_SIZE = 20;

function formatDate(date) {
  if (!date) return "—";
  const d = typeof date === "string" ? new Date(date) : date;
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function ContactMessagesManager() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("all"); // "all" | "unread" | "read"
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Debounce search input so we're not firing a request per keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedSearch(search), 350);
    return () => clearTimeout(timeout);
  }, [search]);

  // Any filter change resets back to page 1.
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, status]);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    setError("");

    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(PAGE_SIZE),
      search: debouncedSearch,
      status,
    });

    try {
      const res = await fetch(`/api/admin/contact-messages?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load messages.");
      const data = await res.json();
      setItems(data.items);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message || "Failed to load messages.");
    } finally {
      setIsLoading(false);
    }
  }, [page, debouncedSearch, status]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const openMessage = async (message) => {
    setSelectedMessage(message);

    // Opening a message marks it read (matches common inbox UX), but the
    // list only updates optimistically here — a full refetch on close
    // keeps counts/badges accurate everywhere else in the admin.
    if (!message.isRead) {
      try {
        const res = await fetch(`/api/admin/contact-messages/${message.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isRead: true }),
        });
        if (res.ok) {
          const updated = await res.json();
          setSelectedMessage(updated);
          setItems((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
        }
      } catch {
        // Non-fatal — the modal's own toggle button still works if this fails.
      }
    }
  };

  const handleUpdated = (updated) => {
    setItems((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    setSelectedMessage(updated);
  };

  const handleDeleted = (id) => {
    setItems((prev) => prev.filter((m) => m.id !== id));
    setTotal((prev) => Math.max(0, prev - 1));
    setSelectedMessage(null);
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, message…"
            className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-lg border border-neutral-200 bg-white px-2.5 py-2 text-sm outline-none focus:border-accent"
          >
            <option value="all">All messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-2xl border border-neutral-200 bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center py-16 text-neutral-400">
            <Loader2 size={22} className="animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
            <Inbox size={26} className="text-neutral-300" />
            <p className="text-sm text-neutral-400">
              {search || status !== "all"
                ? "No messages match your filters."
                : "No contact messages yet."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {items.map((message) => (
              <li key={message.id}>
                <button
                  type="button"
                  onClick={() => openMessage(message)}
                  className="flex w-full items-start gap-3 px-5 py-4 text-left transition-colors hover:bg-neutral-50 sm:px-6"
                >
                  <span className="mt-1.5 shrink-0">
                    {message.isRead ? (
                      <CheckCircle2 size={14} className="text-neutral-300" />
                    ) : (
                      <Circle size={14} className="text-accent" fill="currentColor" />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <p
                        className={`truncate text-sm ${
                          message.isRead ? "font-medium text-neutral-600" : "font-bold text-primary"
                        }`}
                      >
                        {message.name}
                      </p>
                      <span className="shrink-0 text-xs text-neutral-400">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                    <p className="truncate text-xs text-neutral-400">{message.email}</p>
                    {message.subject && (
                      <p className="mt-1 truncate text-xs font-medium text-accent">
                        {message.subject}
                      </p>
                    )}
                    <p className="mt-1 line-clamp-1 text-sm text-neutral-500">
                      {message.message}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {!isLoading && items.length > 0 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <p className="text-neutral-400">
            {total} message{total === 1 ? "" : "s"} · Page {page} of {totalPages}
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
      )}

      {selectedMessage && (
        <ContactMessageDetailModal
          message={selectedMessage}
          onClose={() => {
            setSelectedMessage(null);
            fetchMessages(); // keep counts/list accurate after read-status changes
          }}
          onUpdated={handleUpdated}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}