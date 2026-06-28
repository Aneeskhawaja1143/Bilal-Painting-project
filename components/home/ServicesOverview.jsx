import Link from "next/link";
import {
  Home,
  Building2,
  Briefcase,
  Layers,
  ArrowRight,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { HOME_SERVICES } from "@/lib/constants";

/**
 * Map icon name strings from constants to actual Lucide components.
 * Keeps the constants file free of React/Lucide imports.
 */
const ICON_MAP = {
  Home,
  Building2,
  Briefcase,
  Layers,
};

/**
 * Services Overview Section
 * 4 responsive service cards displayed in a 2x2 grid on tablet,
 * 4-column on desktop.
 */
export default function ServicesOverview() {
  return (
    <section
      className="section-padding bg-white overflow-hidden relative"
      aria-labelledby="services-overview-heading"
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
        {/* Section heading */}
        <SectionHeading
          badge="What We Do"
          title="Our Painting &"
          titleHighlight="Decorating Services"
          subtitle="From a single room refresh to a full commercial project, we bring skill, care, and quality materials to every job we take on."
          id="services-overview-heading"
        />

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12 lg:mt-16">
          {HOME_SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.icon];
            return (
              <article
                key={service.id}
                className="group relative flex flex-col rounded-2xl bg-white p-6 shadow-card transition-all duration-500 hover:shadow-card-hover hover:-translate-y-2 md:p-7 lg:p-8"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease forwards ${index * 0.1}s`
                }}
              >
                {/* Decorative gradient accent */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Top border accent - animated */}
                <div
                  className="absolute left-0 right-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 transition-all duration-500 group-hover:h-1.5 group-hover:from-accent group-hover:via-accent group-hover:to-accent"
                  aria-hidden="true"
                />

                {/* Icon with ring effect */}
                <div className="relative z-10 mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 transition-all duration-500 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/30 group-hover:scale-105">
                  {Icon && (
                    <Icon
                      size={24}
                      className="text-accent transition-all duration-500 group-hover:scale-110 group-hover:text-white"
                    />
                  )}
                  {/* Ring pulse on hover */}
                  <div
                    className="absolute inset-0 rounded-xl border-2 border-accent/0 transition-all duration-500 group-hover:border-accent/20 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col flex-1">
                  <h3 className="mb-3 text-xl font-bold leading-tight text-primary transition-colors duration-300 group-hover:text-accent md:text-xl lg:text-2xl">
                    {service.title}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-neutral-500 sm:text-base">
                    {service.description}
                  </p>

                  {/* Read More link with enhanced animation */}
                  <Link
                    href={service.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all duration-300 hover:gap-3 group/link w-fit"
                    aria-label={`Read more about ${service.title}`}
                  >
                    <span className="relative">
                      Read More
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

        {/* View all services CTA */}
        <div className="mt-14 text-center lg:mt-16">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2.5 rounded-xl border-2 border-primary/20 px-8 py-4 text-base font-semibold text-primary transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:px-10 md:py-4 active:scale-95"
          >
            View All Services
            <ArrowRight 
              size={18} 
              aria-hidden="true" 
              className="transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" 
            />
          </Link>
        </div>
      </div>
    </section>
  );
}