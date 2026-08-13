"use client";

import OrderedListManager, { Field, inputClass } from "@/components/admin/OrderedListManager";
import { validateWhyChooseUsItem } from "@/lib/validation/whyChooseUs";

const DEFAULT_VALUES = { icon: "", title: "", description: "", stat: "", statLabel: "" };

export default function WhyChooseUsEditor({ initialItems }) {
  return (
    <OrderedListManager
      apiBasePath="/api/admin/why-choose-us"
      initialItems={initialItems}
      itemLabel="item"
      defaultValues={DEFAULT_VALUES}
      validate={validateWhyChooseUsItem}
      renderSummary={(item) => (
        <div>
          <p className="text-sm font-bold text-primary">
            {item.title}{" "}
            <span className="font-normal text-neutral-400">— {item.icon}</span>
          </p>
          <p className="mt-0.5 text-sm text-neutral-500">{item.description}</p>
          <p className="mt-1 text-xs font-semibold text-accent">
            {item.stat} {item.statLabel}
          </p>
        </div>
      )}
      renderFields={({ values, setValue, errors }) => (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Title" error={errors.title}>
              <input
                type="text"
                value={values.title}
                onChange={(e) => setValue("title", e.target.value)}
                className={inputClass(errors.title)}
                placeholder="14+ Years of Experience"
              />
            </Field>
            <Field label="Icon name (lucide-react)" error={errors.icon}>
              <input
                type="text"
                value={values.icon}
                onChange={(e) => setValue("icon", e.target.value)}
                className={inputClass(errors.icon)}
                placeholder="Award"
              />
            </Field>
          </div>
          <Field label="Description" error={errors.description}>
            <textarea
              value={values.description}
              onChange={(e) => setValue("description", e.target.value)}
              rows={2}
              className={inputClass(errors.description)}
              placeholder="Our experienced painters and decorators have…"
            />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Stat" error={errors.stat}>
              <input
                type="text"
                value={values.stat}
                onChange={(e) => setValue("stat", e.target.value)}
                className={inputClass(errors.stat)}
                placeholder="14+"
              />
            </Field>
            <Field label="Stat label" error={errors.statLabel}>
              <input
                type="text"
                value={values.statLabel}
                onChange={(e) => setValue("statLabel", e.target.value)}
                className={inputClass(errors.statLabel)}
                placeholder="Years"
              />
            </Field>
          </div>
        </>
      )}
    />
  );
}