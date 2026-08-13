"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, Save } from "lucide-react";
import { Field, inputClass } from "@/components/admin/OrderedListManager";
import { validateContactInfo } from "@/lib/validation/contactInfo";

/**
 * @param {object} props
 * @param {object|null} props.initialContent - ContactInfo row, may be null on a fresh DB
 */
export default function ContactInfoEditor({ initialContent }) {
  const [form, setForm] = useState({
    phone: initialContent?.phone || "",
    phoneDisplay: initialContent?.phoneDisplay || "",
    email: initialContent?.email || "",
    whatsapp: initialContent?.whatsapp || "",
    whatsappMessage: initialContent?.whatsappMessage || "",
    addressStreet: initialContent?.addressStreet || "",
    addressCity: initialContent?.addressCity || "",
    addressCounty: initialContent?.addressCounty || "",
    addressPostcode: initialContent?.addressPostcode || "",
    addressCountry: initialContent?.addressCountry || "",
    freeQuoteRadius: initialContent?.freeQuoteRadius || "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSave = async () => {
    setSaveStatus(null);
    setSaveMessage("");

    const { valid, errors } = validateContactInfo(form);
    if (!valid) {
      setFieldErrors(errors);
      setSaveStatus("error");
      setSaveMessage("Please fix the highlighted fields.");
      return;
    }

    setIsSaving(true);
    setFieldErrors({});

    try {
      const res = await fetch("/api/admin/contact-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setSaveStatus("error");
        setSaveMessage(data.error || "Failed to save. Please check the fields above.");
        return;
      }

      setSaveStatus("success");
      setSaveMessage("Contact info saved.");
    } catch (err) {
      setSaveStatus("error");
      setSaveMessage("Network error — please try again.");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
      <h2 className="mb-4 text-base font-bold text-primary">Contact Details</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Phone (with country code)" error={fieldErrors.phone}>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={inputClass(fieldErrors.phone)}
              placeholder="+44 7722186708"
            />
          </Field>
          <Field label="Phone (display format)" error={fieldErrors.phoneDisplay}>
            <input
              type="text"
              value={form.phoneDisplay}
              onChange={(e) => updateField("phoneDisplay", e.target.value)}
              className={inputClass(fieldErrors.phoneDisplay)}
              placeholder="07722186708"
            />
          </Field>
        </div>

        <Field label="Email" error={fieldErrors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={inputClass(fieldErrors.email)}
            placeholder="info@bilalpaintinguk.co.uk"
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="WhatsApp number" error={fieldErrors.whatsapp}>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => updateField("whatsapp", e.target.value)}
              className={inputClass(fieldErrors.whatsapp)}
              placeholder="447722186708"
            />
          </Field>
          <Field label="Free quote radius (miles)" error={fieldErrors.freeQuoteRadius}>
            <input
              type="text"
              value={form.freeQuoteRadius}
              onChange={(e) => updateField("freeQuoteRadius", e.target.value)}
              className={inputClass(fieldErrors.freeQuoteRadius)}
              placeholder="5"
            />
          </Field>
        </div>

        <Field label="Default WhatsApp message" error={fieldErrors.whatsappMessage}>
          <textarea
            value={form.whatsappMessage}
            onChange={(e) => updateField("whatsappMessage", e.target.value)}
            rows={2}
            className={inputClass(fieldErrors.whatsappMessage)}
            placeholder="Hello! I'd like to get a free quote for painting and decorating."
          />
        </Field>

        <div className="border-t border-neutral-100 pt-4">
          <p className="mb-3 text-sm font-semibold text-neutral-700">Address</p>
          <div className="space-y-4">
            <Field label="Street" error={fieldErrors.addressStreet}>
              <input
                type="text"
                value={form.addressStreet}
                onChange={(e) => updateField("addressStreet", e.target.value)}
                className={inputClass(fieldErrors.addressStreet)}
                placeholder="23 Farnhurst Road"
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="City" error={fieldErrors.addressCity}>
                <input
                  type="text"
                  value={form.addressCity}
                  onChange={(e) => updateField("addressCity", e.target.value)}
                  className={inputClass(fieldErrors.addressCity)}
                  placeholder="Birmingham"
                />
              </Field>
              <Field label="County" error={fieldErrors.addressCounty}>
                <input
                  type="text"
                  value={form.addressCounty}
                  onChange={(e) => updateField("addressCounty", e.target.value)}
                  className={inputClass(fieldErrors.addressCounty)}
                  placeholder="West Midlands"
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Postcode" error={fieldErrors.addressPostcode}>
                <input
                  type="text"
                  value={form.addressPostcode}
                  onChange={(e) => updateField("addressPostcode", e.target.value)}
                  className={inputClass(fieldErrors.addressPostcode)}
                  placeholder="B36 8HS"
                />
              </Field>
              <Field label="Country" error={fieldErrors.addressCountry}>
                <input
                  type="text"
                  value={form.addressCountry}
                  onChange={(e) => updateField("addressCountry", e.target.value)}
                  className={inputClass(fieldErrors.addressCountry)}
                  placeholder="United Kingdom"
                />
              </Field>
            </div>
          </div>
        </div>
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
  );
}