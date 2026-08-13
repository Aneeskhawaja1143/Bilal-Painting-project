"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Star, X } from "lucide-react";
import OrderedListManager, { Field, inputClass } from "@/components/admin/OrderedListManager";
import MediaPickerModal from "@/components/admin/MediaPickerModal";
import { validateTestimonial } from "@/lib/validation/testimonials";

const DEFAULT_VALUES = { name: "", role: "", quote: "", rating: 5, photo: null };

export default function TestimonialsEditor({ initialItems }) {
  return (
    <OrderedListManager
      apiBasePath="/api/admin/testimonials"
      initialItems={initialItems}
      itemLabel="testimonial"
      defaultValues={DEFAULT_VALUES}
      validate={(values) =>
        validateTestimonial({ ...values, photoId: values.photo?.id })
      }
      toFormValues={(item) => ({
        name: item.name,
        role: item.role || "",
        quote: item.quote,
        rating: item.rating,
        photo: item.photo,
      })}
      toPayload={(values) => ({
        name: values.name,
        role: values.role,
        quote: values.quote,
        rating: values.rating,
        photoId: values.photo?.id || null,
      })}
      renderSummary={(item) => (
        <div className="flex items-start gap-3">
          {item.photo ? (
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-neutral-100">
              <Image src={item.photo.url} alt={item.name} fill className="object-cover" unoptimized />
            </div>
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
              {item.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-bold text-primary">
              {item.name}
              {item.role && <span className="font-normal text-neutral-400"> — {item.role}</span>}
            </p>
            <div className="my-0.5 flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={11}
                  className={i < item.rating ? "text-accent" : "text-neutral-200"}
                  fill="currentColor"
                />
              ))}
            </div>
            <p className="text-sm text-neutral-500">&ldquo;{item.quote}&rdquo;</p>
          </div>
        </div>
      )}
      renderFields={({ values, setValue, errors }) => (
        <TestimonialFields values={values} setValue={setValue} errors={errors} />
      )}
    />
  );
}

function TestimonialFields({ values, setValue, errors }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            type="text"
            value={values.name}
            onChange={(e) => setValue("name", e.target.value)}
            className={inputClass(errors.name)}
            placeholder="Sarah Johnson"
          />
        </Field>
        <Field label="Role / location (optional)" error={errors.role}>
          <input
            type="text"
            value={values.role}
            onChange={(e) => setValue("role", e.target.value)}
            className={inputClass(errors.role)}
            placeholder="Homeowner, Edgbaston"
          />
        </Field>
      </div>

      <Field label="Quote" error={errors.quote}>
        <textarea
          value={values.quote}
          onChange={(e) => setValue("quote", e.target.value)}
          rows={3}
          className={inputClass(errors.quote)}
          placeholder="Fantastic job on our living room — clean, professional, and on time."
        />
      </Field>

      <Field label="Rating" error={errors.rating}>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue("rating", star)}
              aria-label={`${star} star${star === 1 ? "" : "s"}`}
              className="p-0.5"
            >
              <Star
                size={22}
                className={star <= values.rating ? "text-accent" : "text-neutral-200"}
                fill="currentColor"
              />
            </button>
          ))}
        </div>
      </Field>

      <Field label="Photo (optional)" error={errors.photoId}>
        {values.photo ? (
          <div className="flex items-center gap-3">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-neutral-100">
              <Image src={values.photo.url} alt={values.name} fill className="object-cover" unoptimized />
            </div>
            <button
              type="button"
              onClick={() => setIsPickerOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-600 hover:bg-neutral-50"
            >
              <ImagePlus size={13} />
              Replace
            </button>
            <button
              type="button"
              onClick={() => setValue("photo", null)}
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
            <ImagePlus size={14} />
            Choose a photo
          </button>
        )}
      </Field>

      <MediaPickerModal
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={(asset) => {
          setValue("photo", asset);
          setIsPickerOpen(false);
        }}
        initialResourceType="image"
      />
    </>
  );
}