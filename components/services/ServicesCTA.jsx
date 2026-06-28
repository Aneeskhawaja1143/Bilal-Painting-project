import Link from "next/link";
import { Phone, ArrowRight, CheckCircle, Shield, Clock, Award, MapPin } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

/**
 * Services Page CTA Section
 * Light grey background band with reassurance points and contact actions.
 */
export default function ServicesCTA() {
  const promises = [
    "Free, no-obligation quotations",
    "Transparent, competitive pricing",
    "Friendly and professional team",
    "Fully insured and certified",
    "FREE site visit within 5 miles", // ← NEW
  ];
  
  const trustBadges = [
    { icon: Shield, label: "Fully Insured" },
    { icon: Clock, label: "On-Time Delivery" },
    { icon: Award, label: "Quality Guaranteed" },
  ];

  return (
    <section
      className="section-padding bg-neutral-50 overflow-hidden"
      aria-labelledby="services-cta-heading"
    >
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 sm:px-10 md:px-12 md:py-16 lg:px-14 lg:py-20">
          {/* Background decorations with animations */}
          <div
            className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/8 blur-3xl animate-float"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-accent/5 blur-3xl animate-float animation-delay-2000"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-accent/3 blur-2xl animate-float animation-delay-4000"
            aria-hidden="true"
          />

          {/* Dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            aria-hidden="true"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Left: Copy + promises */}
            <div className="max-w-2xl animate-fadeInLeft">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-accent border border-accent/20">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                Get Started Today
              </span>
              <h2
                id="services-cta-heading"
                className="mb-4 text-3xl font-bold text-white sm:text-4xl md:text-4xl lg:text-5xl"
              >
                Not Sure Which Service{" "}
                <span className="relative text-accent">
                  You Need?
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-accent/40"
                    aria-hidden="true"
                  />
                </span>
              </h2>
              <p className="mb-6 text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl">
                We&apos;re here to help. Contact us and we&apos;ll assess your project,
                recommend the right solution, and provide a detailed free quote — with
                no pressure and no obligation.
              </p>

              {/* Promise list with enhanced styling */}
              <ul className="space-y-3 mb-8" role="list">
                {promises.map((promise, index) => (
                  <li 
                    key={promise} 
                    className="flex items-center gap-3 group"
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                      opacity: 0,
                      animation: `fadeInUp 0.5s ease forwards ${index * 0.1 + 0.4}s`
                    }}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/20 transition-all duration-300 group-hover:bg-accent/30 group-hover:scale-110">
                      <CheckCircle
                        size={14}
                        className="text-accent transition-transform duration-300 group-hover:scale-110"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="text-sm text-neutral-300 transition-colors duration-300 group-hover:text-white sm:text-base">
                      {promise}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {trustBadges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={badge.label}
                      className="flex items-center gap-2"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        opacity: 0,
                        animation: `fadeInUp 0.5s ease forwards ${index * 0.1 + 0.7}s`
                      }}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                        <Icon size={15} className="text-accent" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-medium text-neutral-400 sm:text-sm">
                        {badge.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: CTA buttons */}
            <div className="flex shrink-0 flex-col w-full gap-3 sm:flex-row sm:w-auto lg:flex-col xl:flex-row animate-fadeInRight">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-accent px-8 py-4 text-base font-bold text-white shadow-accent transition-all duration-300 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:px-7 sm:py-3.5 md:px-8 md:py-4 lg:px-9 lg:py-4.5"
              >
                Get a Free Quote
                <ArrowRight size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border-2 border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/8 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:px-7 sm:py-3.5 md:px-8 md:py-4 lg:px-9 lg:py-4.5"
                aria-label={`Call us on ${BUSINESS.phoneDisplay}`}
              >
                <Phone size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:scale-110" />
                <span>{BUSINESS.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Decorative bottom accent */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}