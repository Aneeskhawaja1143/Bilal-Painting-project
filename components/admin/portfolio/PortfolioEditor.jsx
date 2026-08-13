"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus } from "lucide-react";
import OrderedListManager, { Field, inputClass } from "@/components/admin/OrderedListManager";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { validatePortfolioImage } from "@/lib/validation/portfolio";

const DEFAULT_VALUES = { altText: "", media: null };

export default function PortfolioEditor({ initialItems }) {
  return (
    <OrderedListManager
      apiBasePath="/api/admin/portfolio"
      initialItems={initialItems}
      itemLabel="image"
      defaultValues={DEFAULT_VALUES}
      validate={(values) =>
        validatePortfolioImage({ altText: values.altText, mediaId: values.media?.id })
      }
      toFormValues={(item) => ({ altText: item.altText, media: item.media })}
      toPayload={(values) => ({ altText: values.altText, mediaId: values.media?.id })}
      renderSummary={(item) => (
        <div className="flex items-center gap-3">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
            <Image src={item.media.url} alt={item.altText} fill className="object-cover" unoptimized />
          </div>
          <p className="text-sm text-neutral-700">{item.altText}</p>
        </div>
      )}
      renderFields={({ values, setValue, errors }) => (
        <PortfolioFields values={values} setValue={setValue} errors={errors} />
      )}
    />
  );
}

function PortfolioFields({ values, setValue, errors }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <>
      <Field label="Image" error={errors.mediaId}>
        {values.media ? (
          <div className="flex items-center gap-3">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
              <Image src={values.media.url} alt={values.altText || ""} fill className="object-cover" unoptimized />
            </div>
            <button
              type="button"
              onClick={() => setIsPickerOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50"
            >
              <ImagePlus size={13} />
              Replace
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-dashed border-neutral-300 px-3 py-2 text-sm text-neutral-500 hover:border-accent/50 hover:bg-accent/5"
          >
            <ImagePlus size={14} />
            Choose an image
          </button>
        )}
      </Field>

      <Field label="Alt text" error={errors.altText}>
        <input
          type="text"
          value={values.altText}
          onChange={(e) => setValue("altText", e.target.value)}
          className={inputClass(errors.altText)}
          placeholder="Modern living room interior painting project completed in Birmingham"
        />
      </Field>

      <MediaPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={(asset) => {
          setValue("media", asset);
          setIsPickerOpen(false);
        }}
        initialResourceType="image"
      />
    </>
  );
}