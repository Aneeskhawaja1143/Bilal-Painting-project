import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { BUSINESS } from "@/lib/constants";

/**
 * Contact Information Panel
 * Displayed alongside the contact form.
 * Contains: address, phone, email, opening hours, WhatsApp button.
 */
export default function ContactInfo() {
  
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    BUSINESS.whatsappMessage
  )}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Main info card */}
      <div className="rounded-2xl bg-primary p-6 sm:p-8 relative overflow-hidden">
        {/* Background decoration */}
        <div
          className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-accent/8 blur-2xl"
          aria-hidden="true"
        />

        <h2 className="mb-6 text-xl font-bold text-white">
          Contact Information
        </h2>

        <address className="not-italic space-y-5">
          {/* Address */}
          <div className="flex items-start gap-3.5">
            <span
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15"
              aria-hidden="true"
            >
              <MapPin size={16} className="text-accent" />
            </span>
            <div>
              <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Address
              </p>
              <p className="text-sm leading-relaxed text-neutral-200">
                {BUSINESS.address.street},<br />
                {BUSINESS.address.city},<br />
                {BUSINESS.address.postcode},<br />
                {BUSINESS.address.country}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3.5">
            <span
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15"
              aria-hidden="true"
            >
              <Phone size={16} className="text-accent" />
            </span>
            <div>
              <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Phone
              </p>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="text-sm text-neutral-200 transition-colors hover:text-white"
              >
                {BUSINESS.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3.5">
            <span
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/15"
              aria-hidden="true"
            >
              <Mail size={16} className="text-accent" />
            </span>
            <div>
              <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Email
              </p>
              <a
                href={`mailto:${BUSINESS.email}`}
                className="break-all text-sm text-neutral-200 transition-colors hover:text-white"
              >
                {BUSINESS.email}
              </a>
            </div>
          </div>
        </address>

        {/* WhatsApp button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition-all duration-300 hover:bg-[#1db954] hover:shadow-[#25D366]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          aria-label="Chat with us on WhatsApp — opens in a new tab"
        >
          {/* WhatsApp SVG */}
          <svg
            viewBox="0 0 24 24"
            fill="white"
            className="h-4.5 w-4.5 h-[18px] w-[18px]"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Chat on WhatsApp
          <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>

     
    </div>
  );
}
