"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Video as VideoIcon, X } from "lucide-react";
import OrderedListManager, { Field, inputClass } from "@/components/admin/OrderedListManager";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { validateTransformation } from "@/lib/validation/transformations";
import { getVideoThumbnailUrl } from "@/lib/cloudinary/clientHelpers";

const DEFAULT_VALUES = {
  title: "",
  description: "",
  category: "",
  beforeImage: null,
  afterImage: null,
  video: null,
};

export default function TransformationsEditor({ initialItems }) {
  return (
    <OrderedListManager
      apiBasePath="/api/admin/transformations"
      initialItems={initialItems}
      itemLabel="project"
      defaultValues={DEFAULT_VALUES}
      validate={(values) =>
        validateTransformation({
          title: values.title,
          description: values.description,
          category: values.category,
          beforeImageId: values.beforeImage?.id,
          afterImageId: values.afterImage?.id,
        })
      }
      toFormValues={(item) => ({
        title: item.title,
        description: item.description,
        category: item.category,
        beforeImage: item.beforeImage,
        afterImage: item.afterImage,
        video: item.video || null,
      })}
      toPayload={(values) => ({
        title: values.title,
        description: values.description,
        category: values.category,
        beforeImageId: values.beforeImage?.id,
        afterImageId: values.afterImage?.id,
        videoId: values.video?.id || null,
      })}
      renderSummary={(item) => (
        <div className="flex items-center gap-3">
          <div className="flex shrink-0 -space-x-2">
            <div className="relative h-14 w-14 overflow-hidden rounded-lg border-2 border-white bg-neutral-100 shadow-sm">
              <Image src={item.beforeImage.url} alt="Before" fill className="object-cover" unoptimized />
            </div>
            <div className="relative h-14 w-14 overflow-hidden rounded-lg border-2 border-white bg-neutral-100 shadow-sm">
              <Image src={item.afterImage.url} alt="After" fill className="object-cover" unoptimized />
            </div>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-sm font-bold text-primary">
              {item.title} <span className="font-normal text-neutral-400">— {item.category}</span>
              {item.video && (
                <span className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">
                  <VideoIcon size={10} />
                  Video
                </span>
              )}
            </p>
            <p className="mt-0.5 text-sm text-neutral-500">{item.description}</p>
          </div>
        </div>
      )}
      renderFields={({ values, setValue, errors }) => (
        <TransformationFields values={values} setValue={setValue} errors={errors} />
      )}
    />
  );
}

function TransformationFields({ values, setValue, errors }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Title" error={errors.title}>
          <input
            type="text"
            value={values.title}
            onChange={(e) => setValue("title", e.target.value)}
            className={inputClass(errors.title)}
            placeholder="Living Room Makeover"
          />
        </Field>
        <Field label="Category" error={errors.category}>
          <input
            type="text"
            value={values.category}
            onChange={(e) => setValue("category", e.target.value)}
            className={inputClass(errors.category)}
            placeholder="Interior"
          />
        </Field>
      </div>

      <Field label="Description" error={errors.description}>
        <input
          type="text"
          value={values.description}
          onChange={(e) => setValue("description", e.target.value)}
          className={inputClass(errors.description)}
          placeholder="Dark to light – complete interior transformation"
        />
      </Field>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ImagePickerField
          label="Before image"
          error={errors.beforeImageId}
          image={values.beforeImage}
          onSelect={(asset) => setValue("beforeImage", asset)}
        />
        <ImagePickerField
          label="After image"
          error={errors.afterImageId}
          image={values.afterImage}
          onSelect={(asset) => setValue("afterImage", asset)}
        />
      </div>

      <VideoPickerField
        error={errors.videoId}
        video={values.video}
        onSelect={(asset) => setValue("video", asset)}
        onRemove={() => setValue("video", null)}
      />
    </>
  );
}

function ImagePickerField({ label, error, image, onSelect }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <Field label={label} error={error}>
      {image ? (
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
            <Image src={image.url} alt={label} fill className="object-cover" unoptimized />
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
          Choose image
        </button>
      )}

      <MediaPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={(asset) => {
          onSelect(asset);
          setIsPickerOpen(false);
        }}
        initialResourceType="image"
      />
    </Field>
  );
}

/**
 * Optional video attachment for a transformation — most projects are
 * photo-only, so this field is never required. Uses the same
 * MediaPickerModal as every image field, restricted to videos already
 * uploaded via the Media Library (no separate upload path here).
 */
function VideoPickerField({ error, video, onSelect, onRemove }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <Field label="Transformation video (optional)" error={error}>
      {video ? (
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-neutral-900">
            <Image
              src={getVideoThumbnailUrl(video.url)}
              alt="Video thumbnail"
              fill
              className="object-cover opacity-80"
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <VideoIcon size={16} className="text-white" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50"
          >
            <VideoIcon size={13} />
            Replace
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50"
          >
            <X size={13} />
            Remove
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsPickerOpen(true)}
          className="flex items-center gap-1.5 rounded-lg border border-dashed border-neutral-300 px-3 py-2 text-sm text-neutral-500 hover:border-accent/50 hover:bg-accent/5"
        >
          <VideoIcon size={14} />
          Attach a video
        </button>
      )}

      <MediaPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={(asset) => {
          onSelect(asset);
          setIsPickerOpen(false);
        }}
        initialResourceType="video"
      />
    </Field>
  );
}