"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image"; // <--- Yeh line add karni hai
import { usePathname } from "next/navigation";
import { Menu, X, Phone, PaintBucket } from "lucide-react";
import { BUSINESS, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ── Header ── */}
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-primary/95 backdrop-blur-nav shadow-lg shadow-primary/20 py-2.5 md:py-3"
            : "bg-primary/80 backdrop-blur-nav py-3.5 md:py-4"
        }`}
        role="banner"
      >
        <div className="container-custom">
          <nav
            className="flex items-center justify-between"
            aria-label="Main navigation"
          >
            {/* ── Logo / Brand ── */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-lg transition-transform duration-300 hover:scale-[1.02]"
              aria-label="Bilal Painting & Decorating — Home"
            >
              <Image 
                  src="/images/logo.png" // <--- Yahan se '/public' hata diya hai
                  alt="Bilal Painting Logo" 
                  width={220} 
                  height={70} 
                  className="w-[150px] md:w-[180px] lg:w-[200px] h-auto object-contain" 
                  priority 
                />
            </Link>
            {/* ── Desktop Navigation ── */}
            <ul
              className="hidden md:flex items-center gap-8 lg:gap-10"
              role="list"
              aria-label="Site pages"
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link ${isActive(link.href) ? "active" : ""} text-sm lg:text-base`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ── Desktop CTA ── */}
            <div className="hidden md:flex items-center gap-4 lg:gap-5">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="flex items-center gap-2 text-sm font-medium text-neutral-200 transition-all duration-300 hover:text-white hover:gap-2.5 lg:text-base"
                aria-label={`Call us on ${BUSINESS.phoneDisplay}`}
              >
                <Phone size={15} className="text-accent transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>
              <Link
                href="/contact"
                className="btn-primary py-2.5 px-5 text-sm lg:py-3 lg:px-6 lg:text-base transition-all duration-300 hover:shadow-lg hover:shadow-accent/30"
              >
                Free Quote
              </Link>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden relative z-[60] flex h-11 w-11 items-center justify-center rounded-xl text-white transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              <span className="relative h-5 w-5">
                <span
                  className={`absolute left-0 h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
                    isMobileOpen ? "top-2.5 rotate-45" : "top-0"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`absolute left-0 top-2.5 h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
                    isMobileOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`absolute left-0 h-0.5 w-full rounded-full bg-white transition-all duration-300 ${
                    isMobileOpen ? "top-2.5 -rotate-45" : "top-5"
                  }`}
                  aria-hidden="true"
                />
              </span>
            </button>
          </nav>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── (moved outside header) ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-label="Mobile navigation"
        aria-modal="true"
        className={`md:hidden fixed inset-0 z-[100] transition-all duration-400 ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className={`absolute inset-0 bg-primary/70 backdrop-blur-sm transition-opacity duration-400 ${
            isMobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Menu panel - slides from right */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-primary/98 backdrop-blur-nav border-l border-white/10 shadow-2xl transition-all duration-400 ease-out ${
            isMobileOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div className="flex h-full flex-col overflow-y-auto pt-20 pb-6 px-6">
            {/* Close button inside panel */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95"
              aria-label="Close navigation menu"
            >
              <X size={22} aria-hidden="true" />
            </button>

            {/* Mobile nav links */}
            <ul className="space-y-1.5 mb-6" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-300 ${
                      isActive(link.href)
                        ? "bg-accent/15 text-white"
                        : "text-neutral-200 hover:bg-white/8 hover:text-white hover:pl-5"
                    }`}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {isActive(link.href) ? (
                      <span className="h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                    ) : (
                      <span className="h-2 w-2 rounded-full border border-white/20" aria-hidden="true" />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile contact actions */}
            <div className="mt-auto space-y-3 pt-5 border-t border-white/10">
              <a
                href={`tel:${BUSINESS.phone}`}
                className="flex items-center justify-center gap-2.5 w-full rounded-xl border border-white/20 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 hover:border-white/40 md:py-4 md:text-base"
                onClick={() => setIsMobileOpen(false)}
              >
                <Phone size={17} className="text-accent" aria-hidden="true" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>
              <Link
                href="/contact"
                className="btn-primary w-full justify-center py-3.5 text-base md:py-4"
                onClick={() => setIsMobileOpen(false)}
              >
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}