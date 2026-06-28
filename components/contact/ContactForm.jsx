"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { BUSINESS } from "@/lib/constants";

/**
 * Initial form state helper
 */
const INITIAL_STATE = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

const INITIAL_ERRORS = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const SERVICE_OPTIONS = [
  { value: "", label: "Select a service (optional)" },
  { value: "interior", label: "Interior Painting" },
  { value: "exterior", label: "Exterior Painting" },
  { value: "commercial", label: "Commercial Decorating" },
  { value: "wallpaper", label: "Wallpaper Installation" },
  { value: "other", label: "Other / Not Sure" },
];

/**
 * Contact Form Component
 * Client component with:
 * - Controlled inputs
 * - Real-time validation on blur
 * - Full submit validation
 * - Loading, success, and error states
 * - ARIA attributes for accessibility
 */
export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [touched, setTouched] = useState({});

  /* ── Validation ─────────────────────────────────────────────── */
  const validate = (fields = form) => {
    const newErrors = { ...INITIAL_ERRORS };

    if (!fields.name.trim()) {
      newErrors.name = "Your name is required.";
    } else if (fields.name.trim().length < 2) {
      newErrors.name = "Please enter your full name.";
    }

    if (!fields.email.trim()) {
      newErrors.email = "Your email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (fields.phone && !/^[\d\s+\-().]{7,15}$/.test(fields.phone)) {
      newErrors.phone = "Please enter a valid UK phone number.";
    }

    if (!fields.message.trim()) {
      newErrors.message = "Please describe your project briefly.";
    } else if (fields.message.trim().length < 20) {
      newErrors.message = "Please provide a little more detail (at least 20 characters).";
    }

    return newErrors;
  };

  /* ── Change handler ─────────────────────────────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Revalidate field on change if it's been touched
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  /* ── Blur handler — mark field as touched ───────────────────── */
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate();
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  /* ── Submit handler ─────────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, phone: true, message: true });

    const validationErrors = validate();
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(Boolean);
    if (hasErrors) return;

    setStatus("loading");

    // Simulate API call (replace with real endpoint)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1800));
      setStatus("success");
      setForm(INITIAL_STATE);
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  /* ── Field helper ───────────────────────────────────────────── */
  const fieldProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    onBlur: handleBlur,
    "aria-invalid": touched[name] && !!errors[name] ? "true" : "false",
    "aria-describedby":
      touched[name] && errors[name] ? `${name}-error` : undefined,
  });

  /* ── Render ─────────────────────────────────────────────────── */
  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-green-100 bg-green-50 px-8 py-14 text-center"
        role="alert"
        aria-live="polite"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle size={32} className="text-green-600" aria-hidden="true" />
        </div>
        <div>
          <h3 className="mb-2 text-xl font-bold text-primary">
            Message Sent Successfully!
          </h3>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
            Thank you for getting in touch. We&apos;ll review your enquiry and
            get back to you within 24 hours.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-primary"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-card sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary">Send Us a Message</h2>
        <p className="mt-1.5 text-sm text-neutral-500">
          Fill in the form and we&apos;ll get back to you within 24 hours.
        </p>
      </div>

      {/* General error banner */}
      {status === "error" && (
        <div
          className="mb-5 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3"
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0 text-red-500"
            aria-hidden="true"
          />
          <p className="text-sm text-red-700">
            Something went wrong. Please try again or call us directly.
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        aria-label="Contact form"
        className="space-y-5"
      >
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-semibold text-primary"
          >
            Full Name <span className="text-accent" aria-label="required">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
              <User size={16} className="text-neutral-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              autoComplete="name"
              placeholder="John Smith"
              className={`form-field pl-10 ${
                touched.name && errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""
              }`}
              {...fieldProps("name")}
            />
          </div>
          {touched.name && errors.name && (
            <p
              id="name-error"
              role="alert"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
            >
              <AlertCircle size={12} aria-hidden="true" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-semibold text-primary"
          >
            Email Address <span className="text-accent" aria-label="required">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
              <Mail size={16} className="text-neutral-400" aria-hidden="true" />
            </div>
            <input
              type="email"
              autoComplete="email"
              placeholder="john@example.com"
              className={`form-field pl-10 ${
                touched.email && errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""
              }`}
              {...fieldProps("email")}
            />
          </div>
          {touched.email && errors.email && (
            <p
              id="email-error"
              role="alert"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
            >
              <AlertCircle size={12} aria-hidden="true" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-sm font-semibold text-primary"
          >
            Phone Number{" "}
            <span className="text-xs font-normal text-neutral-400">(optional)</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2">
              <Phone size={16} className="text-neutral-400" aria-hidden="true" />
            </div>
            <input
              type="tel"
              autoComplete="tel"
              placeholder="07700 900000"
              className={`form-field pl-10 ${
                touched.phone && errors.phone ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""
              }`}
              {...fieldProps("phone")}
            />
          </div>
          {touched.phone && errors.phone && (
            <p
              id="phone-error"
              role="alert"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
            >
              <AlertCircle size={12} aria-hidden="true" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Service selector */}
        <div>
          <label
            htmlFor="service"
            className="mb-1.5 block text-sm font-semibold text-primary"
          >
            Service Required
          </label>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className="form-field appearance-none"
          >
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-semibold text-primary"
          >
            Your Message <span className="text-accent" aria-label="required">*</span>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute left-3.5 top-3.5">
              <MessageSquare size={16} className="text-neutral-400" aria-hidden="true" />
            </div>
            <textarea
              rows={4}
              placeholder="Please describe your project — what rooms, surfaces, or areas are involved?"
              className={`form-field resize-none pl-10 ${
                touched.message && errors.message ? "border-red-400 focus:border-red-400 focus:ring-red-200" : ""
              }`}
              {...fieldProps("message")}
            />
          </div>
          {touched.message && errors.message && (
            <p
              id="message-error"
              role="alert"
              className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600"
            >
              <AlertCircle size={12} aria-hidden="true" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Required fields note */}
        <p className="text-xs text-neutral-400">
          <span className="text-accent">*</span> Indicates a required field.
        </p>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full justify-center py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-70"
          aria-busy={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send size={18} aria-hidden="true" />
            </>
          )}
        </button>

        {/* WhatsApp alt */}
        <div className="mt-3 text-center">
          <p className="text-xs text-neutral-400">
            Prefer instant chat?{" "}
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(BUSINESS.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:underline"
            >
              Message us on WhatsApp
            </a>
          </p>
        </div>

        {/* ─── NEW: Free Quote Info ─── */}
        <div className="mt-4 p-4 rounded-xl bg-accent/5 border border-accent/20">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="shrink-0 text-accent mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-primary">
                Free Site Visit & Quote
              </p>
              <p className="text-sm text-neutral-500">
                Within <strong className="text-accent">5 miles</strong> of{" "}
                {BUSINESS.address.street}, {BUSINESS.address.city}.
                <br className="sm:hidden" /> 
                <span className="text-xs text-neutral-400">
                  Outside this area? Contact us anyway — we'll discuss options!
                </span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}