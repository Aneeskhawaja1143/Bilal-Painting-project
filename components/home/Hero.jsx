import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowRight, Star, CheckCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export default function Hero() {
  const trustBadges = [
    "Free Quotations",
    "Fully Insured",
    "14+ Years Experience",
    "Free Quote Within 5 Miles",
  ];

  return (
    <section
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
      aria-label="Welcome to Bilal Painting & Decorating"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-primary" aria-hidden="true">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/8 blur-3xl animate-float" />
        <div className="absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-accent/5 blur-3xl animate-float animation-delay-2000" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-primary-light/60 blur-3xl animate-float animation-delay-4000" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* ── Hero Content ── */}
      <div className="container-custom relative z-10 pt-14 pb-10 sm:pt-20 sm:pb-16 md:pt-28 md:pb-24 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
        
        {/* ── Left Side: Text Content ── */}
        <div className="max-w-3xl animate-fadeInLeft">
          {/* Top Badge */}
          <div className="mb-3 sm:mb-5 flex items-center gap-2 animate-fadeInUp animation-delay-200">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-xs font-semibold uppercase tracking-widest text-accent border border-accent/20">
              <Star size={9} fill="currentColor" aria-hidden="true" className="sm:size-3" />
              Trusted Birmingham Painters
            </span>
          </div>

          {/* ─── CLEAN HEADING ─── */}
          <h1 className="text-balance mb-3 sm:mb-5 font-bold leading-[1.08] tracking-tight text-white animate-fadeInUp animation-delay-400
            text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem]
          ">
            <span className="text-accent">Painting</span> &amp;{" "}
            <span className="text-accent">Decorating</span>
            <br />
            Services in{" "}
            <span className="relative inline-block text-white">
              Birmingham
              <span
                className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-accent/50"
                aria-hidden="true"
              />
            </span>
          </h1>

          {/* ─── SHORT DESCRIPTION ─── */}
          <p className="mb-5 sm:mb-7 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-neutral-300 animate-fadeInUp animation-delay-600">
            Professional interior, exterior, and commercial painting services
            <span className="hidden sm:inline"> – premium finishes, reliable workmanship, and free quotations.</span>
            <span className="inline sm:hidden"> – premium finishes, free quotes.</span>
          </p>

          {/* ─── TRUST BADGES – CARD STYLE ─── */}
          <div
            className="mb-6 sm:mb-8 grid grid-cols-2 gap-2 animate-fadeInUp animation-delay-800"
            aria-label="Key trust signals"
          >
            {trustBadges.map((badge) => (
              <div 
                key={badge} 
                className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5"
              >
                <CheckCircle
                  size={12}
                  className="text-accent shrink-0"
                  aria-hidden="true"
                />
                <span className="text-[10px] sm:text-xs text-neutral-300 font-medium truncate">
                  {badge}
                </span>
              </div>
            ))}
          </div>

          {/* ─── CTA BUTTONS ─── */}
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center animate-fadeInUp animation-delay-1000">
            <Link
              href="/contact"
              className="btn-primary px-6 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base text-center justify-center"
            >
              Get a Free Quote
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            <a
              href={`tel:${BUSINESS.phone}`}
              className="btn-secondary px-6 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base text-center justify-center"
              aria-label={`Call us on ${BUSINESS.phoneDisplay}`}
            >
              <Phone size={16} aria-hidden="true" />
              {BUSINESS.phoneDisplay}
            </a>
          </div>

          {/* ─── SOCIAL PROOF ─── */}
          <div className="mt-6 sm:mt-8 flex items-center gap-3 animate-fadeInUp animation-delay-1200">
            <div className="flex -space-x-1.5" aria-hidden="true">
              {["bg-orange-400", "bg-blue-400", "bg-green-400", "bg-purple-400"].map(
                (colour, i) => (
                  <div
                    key={i}
                    className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full ${colour} ring-2 ring-primary flex items-center justify-center text-white text-[8px] sm:text-xs font-bold`}
                  >
                    {["J", "S", "A", "M"][i]}
                  </div>
                )
              )}
            </div>
            <div>
              <div className="flex items-center gap-0.5" aria-label="Rated 5 stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className="text-accent"
                    fill="currentColor"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-[10px] sm:text-xs text-neutral-400 mt-0.5">
                <span className="font-semibold text-white">500+</span> happy customers
              </p>
            </div>
          </div>
        </div>

        {/* ── Right Side: 2×2 Image Grid ── */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 relative mt-6 sm:mt-8 lg:mt-0 z-20 animate-fadeInRight">
          {/* Image 1 */}
          <div className="relative aspect-square sm:aspect-auto sm:h-48 md:h-56 lg:h-64 xl:h-72 w-full rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.04] hover:shadow-2xl">
            <Image 
              src="/images/room.jpg" 
              alt="Living room interior painting transformation by Bilal Painting & Decorating UK" 
              fill 
              className="object-cover"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 25vw"
              priority
            />
          </div>
          {/* Image 2 */}
          <div className="relative aspect-square sm:aspect-auto sm:h-48 md:h-56 lg:h-64 xl:h-72 w-full rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.04] hover:shadow-2xl">
            <Image 
              src="/images/paintroller.avif" 
              alt="Professional paint roller applying fresh paint to interior wall by Bilal Painting" 
              fill 
              className="object-cover"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
          {/* Image 3 */}
          <div className="relative aspect-square sm:aspect-auto sm:h-48 md:h-56 lg:h-64 xl:h-72 w-full rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.04] hover:shadow-2xl">
            <Image 
              src="/images/paintboxes.jpg" 
              alt="Premium paint boxes and decorating supplies used by Bilal Painting UK" 
              fill 
              className="object-cover"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
          {/* Image 4 */}
          <div className="relative aspect-square sm:aspect-auto sm:h-48 md:h-56 lg:h-64 xl:h-72 w-full rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.04] hover:shadow-2xl">
            <Image 
              src="/images/office.jpg" 
              alt="Commercial office decorating project completed by Bilal Painting & Decorating UK" 
              fill 
              className="object-cover"
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </div>
      </div>

      {/* ── Decorative bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0 z-20" aria-hidden="true">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}