import Link from "next/link";
import {
  PaintBucket,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  Heart,
} from "lucide-react";
import { BUSINESS, NAV_LINKS, SITE } from "@/lib/constants";

/**
 * Site-wide footer with:
 * - Brand identity
 * - Company description
 * - Quick navigation links
 * - Contact information with icons
 * - Social media links
 * - Legal copyright line
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { label: "Interior Painting", href: "/services#interior" },
    { label: "Exterior Painting", href: "/services#exterior" },
    { label: "Commercial Decorating", href: "/services#commercial" },
    { label: "Wallpaper Installation", href: "/services#wallpaper" },
  ];

  return (
    <footer
      className="bg-primary text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ── Main Footer Content ──────────────────────────────────────────── */}
      <div className="container-custom py-14 md:py-18 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* ── Column 1: Brand ───────────────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo with hover effect */}
            <Link
              href="/"
              className="group mb-5 flex items-center gap-2.5 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg transition-transform duration-300 hover:scale-[1.02]"
              aria-label="Bilal Painting & Decorating — Home"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent transition-all duration-300 group-hover:bg-accent-dark group-hover:shadow-lg group-hover:shadow-accent/30">
                <PaintBucket size={20} className="text-white transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              </span>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold text-white tracking-tight md:text-lg">
                  Bilal Painting
                </span>
                <span className="text-[10px] text-accent font-medium tracking-[0.2em] uppercase md:text-xs">
                  &amp; Decorating
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-neutral-400 mb-6 max-w-xs sm:text-base">
              Premium painting and decorating services across the UK. Trusted
              by homeowners and businesses for over 14 years.
            </p>

            {/* Social icons with enhanced styling */}
           
          </div>

          {/* ── Column 2: Quick Links ─────────────────────────────────── */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-neutral-300 md:text-base">
              Quick Links
            </h3>
            <ul className="space-y-3.5" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 text-sm text-neutral-400 transition-all duration-200 hover:text-white md:text-base"
                  >
                    <ArrowRight
                      size={13}
                      className="text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <span className="relative">
                      {link.label}
                      <span
                        className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Services ───────────────────────────────────── */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-neutral-300 md:text-base">
              Our Services
            </h3>
            <ul className="space-y-3.5" role="list">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2.5 text-sm text-neutral-400 transition-all duration-200 hover:text-white md:text-base"
                  >
                    <ArrowRight
                      size={13}
                      className="text-accent transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
                      aria-hidden="true"
                    />
                    <span className="relative">
                      {link.label}
                      <span
                        className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact ─────────────────────────────────────── */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.15em] text-neutral-300 md:text-base">
              Get in Touch
            </h3>
            <address className="not-italic space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3.5 group">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/8 transition-all duration-300 group-hover:bg-accent/20">
                  <MapPin size={15} className="text-accent transition-all duration-300 group-hover:scale-110" aria-hidden="true" />
                </span>
                <p className="text-sm text-neutral-400 leading-relaxed transition-colors duration-300 group-hover:text-neutral-300 md:text-base">
                  {BUSINESS.address.street},
                  <br />
                  {BUSINESS.address.city}, {BUSINESS.address.postcode}
                  <br />
                  {BUSINESS.address.country}
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3.5 group">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/8 transition-all duration-300 group-hover:bg-accent/20">
                  <Phone size={15} className="text-accent transition-all duration-300 group-hover:scale-110" aria-hidden="true" />
                </span>
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="text-sm text-neutral-400 transition-all duration-300 hover:text-white md:text-base"
                >
                  {BUSINESS.phoneDisplay}
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3.5 group">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/8 transition-all duration-300 group-hover:bg-accent/20">
                  <Mail size={15} className="text-accent transition-all duration-300 group-hover:scale-110" aria-hidden="true" />
                </span>
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-sm text-neutral-400 transition-all duration-300 hover:text-white break-all md:text-base"
                >
                  {BUSINESS.email}
                </a>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="container-custom py-5 md:py-6">
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-xs text-neutral-500 md:text-sm">
              &copy; {currentYear} {BUSINESS.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-1.5 text-xs text-neutral-500 md:text-sm">
              Crafted with{" "}
              <Heart 
                size={12} 
                className="text-accent transition-all duration-300 hover:scale-125 hover:rotate-12" 
                aria-hidden="true" 
                fill="currentColor" 
              />{" "}
              in the United Kingdom
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}