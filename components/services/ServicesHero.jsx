import Link from "next/link";
import { ChevronRight, PaintBucket, Sparkles } from "lucide-react";

/**
 * Services Page Hero Banner
 * Compact hero (not full-viewport) with:
 * - Dark background with decorative shapes
 * - Breadcrumb navigation
 * - Page title and subtitle
 */
export default function ServicesHero() {
  return (
    <section
      className="relative overflow-hidden bg-primary pb-20 pt-32 md:pb-24 md:pt-36 lg:pb-28 lg:pt-40"
      aria-labelledby="services-hero-heading"
    >
      {/* Decorative backgrounds with animations */}
      <div
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/8 blur-3xl animate-float"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-accent/5 blur-3xl animate-float animation-delay-2000"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/4 h-64 w-64 rounded-full bg-accent/3 blur-2xl animate-float animation-delay-4000"
        aria-hidden="true"
      />

      {/* Enhanced dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1.5px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Subtle gradient overlay for depth */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/0 to-primary/40"
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        {/* Breadcrumb with enhanced styling */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 animate-fadeInUp"
        >
          <ol
            className="flex flex-wrap items-center gap-1.5 text-sm text-neutral-400"
            role="list"
          >
            <li>
              <Link
                href="/"
                className="group flex items-center gap-1.5 transition-all duration-300 hover:text-white focus-visible:outline-none focus-visible:text-white"
              >
                <span className="relative">
                  Home
                  <span
                    className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight size={14} className="text-neutral-600" />
            </li>
            <li>
              <span 
                className="text-white font-semibold" 
                aria-current="page"
              >
                Services
              </span>
            </li>
          </ol>
        </nav>

        {/* Icon + heading with enhanced layout */}
        <div className="flex items-start gap-6 animate-fadeInLeft">
          {/* Icon with ring effect */}
          <div
            className="mt-1 hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent/15 transition-all duration-300 hover:bg-accent/25 hover:scale-105 sm:flex"
            aria-hidden="true"
          >
            <div className="relative">
              <PaintBucket size={30} className="text-accent" />
              <Sparkles 
                size={12} 
                className="absolute -right-2 -top-2 text-accent animate-pulse" 
              />
            </div>
          </div>
          
          <div>
            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3.5 py-1.5 border border-accent/20">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-accent">
                Professional Painting Services
              </span>
            </div>

            <h1
              id="services-hero-heading"
              className="text-balance text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Our{" "}
              <span className="relative text-accent">
                Services
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1.5 rounded-full bg-accent/40"
                  aria-hidden="true"
                />
              </span>
            </h1>
            
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300 sm:text-lg md:text-xl animate-fadeInUp animation-delay-200">
              Comprehensive painting and decorating solutions for homes and businesses
              across the UK. Every service is carried out by our skilled tradespeople
              using premium materials and proven techniques.
            </p>

            {/* Quick stats */}
            <div className="mt-6 flex flex-wrap items-center gap-6 sm:gap-8 animate-fadeInUp animation-delay-400">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-accent">500+</span>
                <span className="text-sm text-neutral-400">Projects</span>
              </div>
              <div className="h-6 w-px bg-white/10" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-accent">14</span>
                <span className="text-sm text-neutral-400">Years Experience</span>
              </div>
              <div className="h-6 w-px bg-white/10" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-accent">100%</span>
                <span className="text-sm text-neutral-400">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced bottom wave with gradient */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0F172A" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="#0F172A" stopOpacity="1"/>
            </linearGradient>
          </defs>
          <path
            d="M0 24C240 48 480 0 720 24C960 48 1200 0 1440 24V48H0V24Z"
            fill="url(#waveGradient)"
          />
          <path
            d="M0 24C240 48 480 0 720 24C960 48 1200 0 1440 24V48H0V24Z"
            fill="white"
            opacity="0.5"
          />
        </svg>
      </div>
    </section>
  );
}