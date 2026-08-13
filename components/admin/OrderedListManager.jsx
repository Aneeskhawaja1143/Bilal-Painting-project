"use client";

import { useState } from "react";
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Trash2,
  Pencil,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
} from "lucide-react";

/**
 * @param {object} props
 * @param {string} props.apiBasePath - e.g. "/api/admin/faqs"
 * @param {Array} props.initialItems
 * @param {string} props.itemLabel - e.g. "FAQ", used in confirm/empty messages
 * @param {object} props.defaultValues - shape of a blank new-item form
 * @param {(values: object) => {valid: boolean, errors: object}} props.validate
 * @param {(item: object) => object} [props.toFormValues] - item -> editable form values (default: identity)
 * @param {(values: object) => object} [props.toPayload] - form values -> API payload (default: identity)
 * @param {(args: {values: object, setValue: (key: string, val: any) => void, errors: object}) => React.ReactNode} props.renderFields
 * @param {(item: object) => React.ReactNode} props.renderSummary - collapsed row content
 */
export default function OrderedListManager({
  apiBasePath,
  initialItems,
  itemLabel,
  defaultValues,
  validate,
  toFormValues = (item) => item,
  toPayload = (values) => values,
  renderFields,
  renderSummary,
}) {
  const [items, setItems] = useState(initialItems || []);
  const [listError, setListError] = useState("");
  const [pendingAction, setPendingAction] = useState(null); // { id, type: "move"|"delete"|"save" }

  const [isAdding, setIsAdding] = useState(false);
  const [newValues, setNewValues] = useState(defaultValues);
  const [newErrors, setNewErrors] = useState({});

  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [editErrors, setEditErrors] = useState({});

  const startAdd = () => {
    setIsAdding(true);
    setNewValues(defaultValues);
    setNewErrors({});
    setListError("");
  };

  const cancelAdd = () => {
    setIsAdding(false);
    setNewErrors({});
  };

  const submitAdd = async () => {
    const { valid, errors } = validate(newValues);
    if (!valid) {
      setNewErrors(errors);
      return;
    }

    setPendingAction({ id: "new", type: "save" });
    setListError("");

    try {
      const res = await fetch(apiBasePath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(newValues)),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setNewErrors(data.fieldErrors);
        setListError(data.error || `Failed to add ${itemLabel}.`);
        return;
      }

      setItems((prev) => [...prev, data]);
      setIsAdding(false);
    } catch (err) {
      setListError("Network error while adding.");
    } finally {
      setPendingAction(null);
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditValues(toFormValues(item));
    setEditErrors({});
    setListError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditErrors({});
  };

  const submitEdit = async (id) => {
    const { valid, errors } = validate(editValues);
    if (!valid) {
      setEditErrors(errors);
      return;
    }

    setPendingAction({ id, type: "save" });
    setListError("");

    try {
      const res = await fetch(`${apiBasePath}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(editValues)),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setEditErrors(data.fieldErrors);
        setListError(data.error || `Failed to update ${itemLabel}.`);
        return;
      }

      setItems((prev) => prev.map((item) => (item.id === id ? data : item)));
      setEditingId(null);
    } catch (err) {
      setListError("Network error while saving.");
    } finally {
      setPendingAction(null);
    }
  };

  const handleDelete = async (item) => {
    if (!confirm(`Delete this ${itemLabel}? This can't be undone.`)) return;

    setPendingAction({ id: item.id, type: "delete" });
    setListError("");

    try {
      const res = await fetch(`${apiBasePath}/${item.id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setListError(data.error || `Failed to delete ${itemLabel}.`);
        return;
      }
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    } catch (err) {
      setListError("Network error while deleting.");
    } finally {
      setPendingAction(null);
    }
  };

  const handleMove = async (id, direction) => {
    setPendingAction({ id, type: "move" });
    setListError("");

    try {
      const res = await fetch(`${apiBasePath}/reorder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, direction }),
      });
      const data = await res.json();

      if (!res.ok) {
        setListError(data.error || "Failed to reorder.");
        return;
      }

      setItems(data);
    } catch (err) {
      setListError("Network error while reordering.");
    } finally {
      setPendingAction(null);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-xs text-neutral-400">
          {items.length} item{items.length === 1 ? "" : "s"}
        </p>
        {!isAdding && (
          <button
            type="button"
            onClick={startAdd}
            className="flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            <Plus size={14} />
            Add {itemLabel}
          </button>
        )}
      </div>

      {listError && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
          <AlertCircle size={15} />
          {listError}
        </div>
      )}

      {isAdding && (
        <div className="mb-4 rounded-xl border border-accent/30 bg-accent/5 p-4">
          <h3 className="mb-3 text-sm font-bold text-primary">New {itemLabel}</h3>
          {renderFields({
            values: newValues,
            setValue: (key, val) => setNewValues((prev) => ({ ...prev, [key]: val })),
            errors: newErrors,
          })}
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={submitAdd}
              disabled={pendingAction?.id === "new"}
              className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
            >
              {pendingAction?.id === "new" ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Save size={14} />
              )}
              Save
            </button>
            <button
              type="button"
              onClick={cancelAdd}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-500 hover:bg-neutral-50"
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </div>
      )}

      {items.length === 0 && !isAdding ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 py-12 text-center">
          <p className="text-sm text-neutral-400">No {itemLabel.toLowerCase()}s yet. Add one above.</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => {
            const isBusy = pendingAction?.id === item.id;
            const isEditing = editingId === item.id;

            return (
              <li key={item.id} className="rounded-xl border border-neutral-200">
                {isEditing ? (
                  <div className="p-4">
                    {renderFields({
                      values: editValues,
                      setValue: (key, val) => setEditValues((prev) => ({ ...prev, [key]: val })),
                      errors: editErrors,
                    })}
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => submitEdit(item.id)}
                        disabled={isBusy}
                        className="flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
                      >
                        {isBusy && pendingAction?.type === "save" ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Save size={14} />
                        )}
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-500 hover:bg-neutral-50"
                      >
                        <X size={14} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-3 p-4">
                    <div className="min-w-0 flex-1">{renderSummary(item)}</div>
                    <div className="flex shrink-0 items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleMove(item.id, "up")}
                        disabled={index === 0 || isBusy}
                        className="flex items-center justify-center rounded-lg border border-neutral-200 p-1.5 text-neutral-500 transition-colors hover:bg-neutral-50 disabled:opacity-30"
                        aria-label="Move up"
                      >
                        {isBusy && pendingAction?.type === "move" ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <ArrowUp size={13} />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMove(item.id, "down")}
                        disabled={index === items.length - 1 || isBusy}
                        className="flex items-center justify-center rounded-lg border border-neutral-200 p-1.5 text-neutral-500 transition-colors hover:bg-neutral-50 disabled:opacity-30"
                        aria-label="Move down"
                      >
                        <ArrowDown size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        disabled={isBusy}
                        className="flex items-center justify-center rounded-lg border border-neutral-200 p-1.5 text-neutral-500 transition-colors hover:bg-neutral-50 disabled:opacity-30"
                        aria-label="Edit"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item)}
                        disabled={isBusy}
                        className="flex items-center justify-center rounded-lg border border-red-200 p-1.5 text-red-500 transition-colors hover:bg-red-50 disabled:opacity-30"
                        aria-label="Delete"
                      >
                        {isBusy && pendingAction?.type === "delete" ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <Trash2 size={13} />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/** Shared field wrapper — visually consistent with HeroEditor/AboutEditor. */
export function Field({ label, error, children }) {
  return (
    <label className="mb-3 block">
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

/** Shared input styling — visually consistent with HeroEditor/AboutEditor. */
export function inputClass(error) {
  return `w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors focus:ring-2 ${
    error
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-neutral-200 focus:border-accent focus:ring-accent/20"
  }`;
}