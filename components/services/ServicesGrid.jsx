import Link from "next/link";
import {
  Home,
  Building2,
  Briefcase,
  Layers,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";

/**
 * Map icon name strings to Lucide components.
 */
const ICON_MAP = {
  Home,
  Building2,
  Briefcase,
  Layers,
};

/**
 * Services Grid
 * Responsive 2-column grid of detailed service cards.
 * Each card contains: icon, badge, title, description, feature list, CTA.
 */
export default function ServicesGrid() {
  return (
    <section
      className="section-padding bg-white overflow-hidden relative"
      aria-labelledby="services-grid-heading"
    >
      {/* Subtle background decoration */}
      <div
        className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        {/* Visually hidden heading for screen readers */}
        <h2
          id="services-grid-heading"
          className="sr-only"
        >
          Our Services in Detail
        </h2>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <article
                key={service.id}
                id={service.id}
                className="group relative flex flex-col rounded-2xl border border-neutral-100 bg-white p-6 shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 hover:border-accent/20 md:p-7 lg:p-8 scroll-mt-24"
                style={{
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease forwards ${index * 0.1 + 0.2}s`
                }}
              >
                {/* Decorative gradient overlay */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Top accent bar */}
                <div
                  className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 transition-all duration-500 group-hover:h-1.5 group-hover:from-accent group-hover:via-accent group-hover:to-accent"
                  aria-hidden="true"
                />

                {/* Card header */}
                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* Icon with enhanced styling */}
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/10 transition-all duration-500 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/30 group-hover:scale-105"
                      aria-hidden="true"
                    >
                      {Icon && (
                        <Icon
                          size={24}
                          className="text-accent transition-all duration-500 group-hover:scale-110 group-hover:text-white"
                        />
                      )}
                    </div>
                    {/* Title */}
                    <h3
                      id={`service-title-${service.id}`}
                      className="text-xl font-bold text-primary transition-colors duration-300 group-hover:text-accent md:text-2xl"
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Optional badge with animation */}
                  {service.badge && (
                    <span className="shrink-0 rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-accent border border-accent/20 transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:border-accent">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-neutral-500 transition-colors duration-300 group-hover:text-neutral-600 sm:text-base">
                  {service.description}
                </p>

                {/* Feature list with enhanced styling */}
                {service.features && service.features.length > 0 && (
                  <ul
                    className="relative z-10 mt-4 space-y-3"
                    role="list"
                    aria-label={`Features of ${service.title}`}
                  >
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-neutral-600 transition-colors duration-300 group-hover:text-neutral-700 sm:text-base"
                        style={{
                          animationDelay: `${i * 50}ms`,
                          opacity: 0,
                          animation: `fadeInUp 0.4s ease forwards ${i * 0.05 + 0.4}s`
                        }}
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                          <CheckCircle2
                            size={14}
                            className="text-accent transition-transform duration-300 group-hover:scale-110"
                            aria-hidden="true"
                          />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* CTA with enhanced styling */}
                <div className="relative z-10 mt-6 pt-5 border-t border-neutral-100 transition-colors duration-300 group-hover:border-accent/20">
                  <Link
                    href="/contact"
                    className="group/link inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all duration-300 hover:gap-3"
                    aria-label={`Request a quote for ${service.title}`}
                  >
                    <span className="relative">
                      Request a Quote
                      <span
                        className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover/link:w-full"
                        aria-hidden="true"
                      />
                    </span>
                    <ArrowRight
                      size={16}
                      aria-hidden="true"
                      className="transition-all duration-300 group-hover/link:translate-x-1 group-hover/link:scale-110"
                    />
                  </Link>
                </div>

                {/* Decorative corner accent */}
                <div
                  className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-accent/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-accent/10"
                  aria-hidden="true"
                />

                {/* Bottom-right subtle accent */}
                <div
                  className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-accent/3 transition-all duration-500 group-hover:scale-150 group-hover:bg-accent/5"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}