"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import OrderedListManager, { Field, inputClass } from "@/components/admin/OrderedListManager";
import { validateService } from "@/lib/validation/services";

const DEFAULT_VALUES = {
  title: "",
  icon: "",
  description: "",
  badge: "",
  features: [],
  showOnHome: true,
};

export default function ServicesEditor({ initialItems }) {
  return (
    <OrderedListManager
      apiBasePath="/api/admin/services"
      initialItems={initialItems}
      itemLabel="service"
      defaultValues={DEFAULT_VALUES}
      validate={validateService}
      renderSummary={(item) => (
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-primary">{item.title}</p>
            {item.badge && (
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                {item.badge}
              </span>
            )}
            {!item.showOnHome && (
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-500">
                Hidden from homepage
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-neutral-500">{item.description}</p>
          <p className="mt-1 text-xs text-neutral-400">
            {item.features.length} feature{item.features.length === 1 ? "" : "s"} · /{item.slug}
          </p>
        </div>
      )}
      renderFields={({ values, setValue, errors }) => (
        <ServiceFields values={values} setValue={setValue} errors={errors} />
      )}
    />
  );
}

function ServiceFields({ values, setValue, errors }) {
  const [newFeature, setNewFeature] = useState("");

  const addFeature = () => {
    const trimmed = newFeature.trim();
    if (!trimmed) return;
    setValue("features", [...(values.features || []), trimmed]);
    setNewFeature("");
  };

  const removeFeature = (index) => {
    setValue(
      "features",
      values.features.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Title" error={errors.title}>
          <input
            type="text"
            value={values.title}
            onChange={(e) => setValue("title", e.target.value)}
            className={inputClass(errors.title)}
            placeholder="Interior Painting"
          />
        </Field>
        <Field label="Icon name (lucide-react)" error={errors.icon}>
          <input
            type="text"
            value={values.icon}
            onChange={(e) => setValue("icon", e.target.value)}
            className={inputClass(errors.icon)}
            placeholder="Home"
          />
        </Field>
      </div>

      <Field label="Description" error={errors.description}>
        <textarea
          value={values.description}
          onChange={(e) => setValue("description", e.target.value)}
          rows={3}
          className={inputClass(errors.description)}
          placeholder="Refresh your home with Bilal Painting & Decorating's…"
        />
      </Field>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Badge (optional)" error={errors.badge}>
          <input
            type="text"
            value={values.badge}
            onChange={(e) => setValue("badge", e.target.value)}
            className={inputClass(errors.badge)}
            placeholder="Most Popular"
          />
        </Field>
        <label className="mb-3 flex items-center gap-2 pt-6">
          <input
            type="checkbox"
            checked={values.showOnHome}
            onChange={(e) => setValue("showOnHome", e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 text-accent focus:ring-accent/20"
          />
          <span className="text-sm font-medium text-neutral-700">Show on homepage</span>
        </label>
      </div>

      <Field label="Features" error={errors.features}>
        <ul className="mb-2 space-y-1.5">
          {(values.features || []).map((feature, index) => (
            <li
              key={`${feature}-${index}`}
              className="flex items-center justify-between gap-2 rounded-lg bg-neutral-50 px-3 py-2 text-sm text-neutral-700"
            >
              <span>{feature}</span>
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="shrink-0 rounded-full p-1 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-600"
                aria-label={`Remove ${feature}`}
              >
                <X size={13} />
              </button>
            </li>
          ))}
          {(!values.features || values.features.length === 0) && (
            <p className="text-xs text-neutral-400">No features yet — add one below.</p>
          )}
        </ul>
        <div className="flex gap-2">
          <input
            type="text"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addFeature();
              }
            }}
            placeholder="e.g. Professional emulsion, eggshell, satin finishes"
            className="flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          <button
            type="button"
            onClick={addFeature}
            className="flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
          >
            <Plus size={14} />
            Add
          </button>
        </div>
      </Field>
    </>
  );
}