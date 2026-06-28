import Link from "next/link";
import { Phone, ArrowRight, MessageCircle, MapPin } from "lucide-react"; // ← Added MapPin and removed duplicates
import { BUSINESS } from "@/lib/constants";

/**
 * Pre-Footer CTA Section
 * High-contrast accent-coloured band above the footer.
 * - "Ready to refresh your space?" headline
 * - Phone number with click-to-call
 * - Contact page button
 */
export default function PreFooterCTA() {
  const whatsappUrl = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    BUSINESS.whatsappMessage
  )}`;

  return (
    <section
      className="relative overflow-hidden bg-accent py-16 md:py-20 lg:py-24"
      aria-labelledby="cta-heading"
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1.5px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative animated shapes */}
      <div
        className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float animation-delay-2000"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl animate-float animation-delay-4000"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:justify-between lg:text-left">

          {/* Copy */}
          <div className="max-w-2xl animate-fadeInLeft">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-white/70 sm:text-base">
              Let&apos;s Get Started
            </p>
            <h2
              id="cta-heading"
              className="text-balance text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-5xl"
            >
              Ready to Refresh Your{" "}
              <span className="relative inline-block">
                Space?
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-white/40"
                  aria-hidden="true"
                />
              </span>
            </h2>

            {/* ─── FREE QUOTE NOTICE ─── */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 border border-white/20">
              <MapPin size={14} className="text-accent" aria-hidden="true" />
              <span className="text-sm text-white/80">
                Free site visit &amp; quote within <strong className="text-accent">5 miles</strong>
              </span>
            </div>

            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg md:text-xl max-w-xl">
              Contact us today for a free, no-obligation quote. We cover all
              areas across the UK and are always happy to discuss your project.
            </p>

            {/* Trust indicator */}
            <div className="mt-6 flex items-center justify-center gap-6 lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {["#F59E0B", "#10B981", "#3B82F6", "#8B5CF6"].map((color, i) => (
                    <div
                      key={i}
                      className="h-6 w-6 rounded-full ring-2 ring-white/30"
                      style={{ backgroundColor: color }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-xs text-white/70">
                  Trusted by 500+ customers
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-3.5 w-3.5 text-white/60"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row sm:items-center animate-fadeInRight">
            {/* Phone */}
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-base font-bold text-accent shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent sm:w-auto sm:px-7 sm:py-3.5 md:px-8 md:py-4 lg:px-8 lg:py-4"
              aria-label={`Call us on ${BUSINESS.phoneDisplay}`}
            >
              <Phone size={20} aria-hidden="true" className="shrink-0" />
              <span className="whitespace-nowrap">{BUSINESS.phoneDisplay}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-xl border-2 border-white/60 px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent sm:w-auto sm:px-7 sm:py-3.5 md:px-8 md:py-4 lg:px-8 lg:py-4"
              aria-label="Chat with us on WhatsApp"
            >
              <MessageCircle size={20} aria-hidden="true" className="shrink-0" />
              <span className="whitespace-nowrap">WhatsApp Us</span>
            </a>

            {/* Contact form */}
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-white/20 px-6 py-4 text-base font-semibold text-white/90 transition-all duration-300 hover:border-white/60 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-accent sm:w-auto sm:px-7 sm:py-3.5 md:px-8 md:py-4 lg:px-8 lg:py-4"
            >
              <span className="whitespace-nowrap">Send a Message</span>
              <ArrowRight size={18} aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}