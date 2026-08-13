"use client";

import OrderedListManager, { Field, inputClass } from "@/components/admin/OrderedListManager";
import { validateFaq } from "@/lib/validation/faqs";

const DEFAULT_VALUES = { question: "", answer: "" };

export default function FaqsEditor({ initialItems }) {
  return (
    <OrderedListManager
      apiBasePath="/api/admin/faqs"
      initialItems={initialItems}
      itemLabel="FAQ"
      defaultValues={DEFAULT_VALUES}
      validate={validateFaq}
      renderSummary={(item) => (
        <div>
          <p className="text-sm font-bold text-primary">{item.question}</p>
          <p className="mt-0.5 text-sm text-neutral-500">{item.answer}</p>
        </div>
      )}
      renderFields={({ values, setValue, errors }) => (
        <>
          <Field label="Question" error={errors.question}>
            <input
              type="text"
              value={values.question}
              onChange={(e) => setValue("question", e.target.value)}
              className={inputClass(errors.question)}
              placeholder="Do you offer free quotes?"
            />
          </Field>
          <Field label="Answer" error={errors.answer}>
            <textarea
              value={values.answer}
              onChange={(e) => setValue("answer", e.target.value)}
              rows={3}
              className={inputClass(errors.answer)}
              placeholder="Yes. We provide free, no-obligation quotations…"
            />
          </Field>
        </>
      )}
    />
  );
}