import { SITE } from "@/lib/constants";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import MapPlaceholder from "@/components/contact/MapPlaceholder";
import Link from "next/link";
import { ChevronRight, MessageSquare } from "lucide-react";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata = {
   title: "Contact Bilal Painting | Painters & Decorators Birmingham",
  description: "Contact Bilal Painting & Decorating for a free quote in Birmingham. Call for interior painting, exterior painting, commercial decorating and wallpaper installation.",
  keywords: [
      "contact painters Birmingham",
      "painting quote Birmingham",
      "decorators Birmingham",
      "painting and decorating Birmingham",
      "free painting quote Birmingham",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Bilal Painting & Decorating | Free Quote",
    description:
      "Get a free painting and decorating quote. Call, WhatsApp or message us — we cover all areas across the UK.",
    url: `${SITE.url}/contact`,
    images: [SITE.ogImage],
      siteName: SITE.name,
      locale: "en_GB",
      type: "website",
  },
  
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Bilal Painting & Decorating",
  url: `${SITE.url}/contact`,
  about: {
    "@type": "HousePainter",
    name: "Bilal Painting & Decorating",
  },
};

/* ─── Contact Page Component ─────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <>
    <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd),
  }}
/>
      {/* ── Page Hero ───────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden bg-primary pb-16 pt-32 md:pb-20 md:pt-36"
        aria-labelledby="contact-hero-heading"
      >
        {/* Background decorations */}
        <div
          className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/8 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-1/4 h-60 w-60 rounded-full bg-accent/5 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container-custom relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-1.5 text-sm text-neutral-400" role="list">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-white focus-visible:outline-none focus-visible:text-white"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} className="text-neutral-600" />
              </li>
              <li>
                <span className="font-medium text-white" aria-current="page">
                  Contact
                </span>
              </li>
            </ol>
          </nav>

          {/* Icon + heading */}
          <div className="flex items-start gap-5">
            <div
              className="mt-1 hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/15 sm:flex"
              aria-hidden="true"
            >
              <MessageSquare size={28} className="text-accent" />
            </div>
            <div>
              <h1
                id="contact-hero-heading"
                className="text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Get in{" "}
                <span className="text-accent">Touch</span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                Ready to transform your home or business? Contact us today for a free quote on interior painting, exterior painting, wallpaper installation or commercial decorating in Birmingham and the West Midlands.
              </p>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg
            viewBox="0 0 1440 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 24C240 48 480 0 720 24C960 48 1200 0 1440 24V48H0V24Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ── Form + Info Grid ─────────────────────────────────────────────── */}
      <section
        className="section-padding bg-white"
        aria-label="Contact form and information"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            {/* Form — wider column */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      {/* ── Map Section ──────────────────────────────────────────────────── */}
      <MapPlaceholder />
    </>
  );
}
