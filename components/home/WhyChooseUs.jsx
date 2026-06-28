import { Award, Star, Clock, ThumbsUp } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHY_CHOOSE_US, BUSINESS } from "@/lib/constants";

/**
 * Map icon name strings to Lucide components.
 */
const ICON_MAP = {
  Award,
  Star,
  Clock,
  ThumbsUp,
};

/**
 * Why Choose Us Section
 * Dark background with accent feature cards.
 * Each card shows a stat, icon, title and description.
 */
export default function WhyChooseUs() {
  return (
    <section
      className="section-padding relative overflow-hidden bg-primary"
      aria-labelledby="why-choose-us-heading"
    >
      {/* Decorative background elements with animations */}
      <div 
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-float" 
        aria-hidden="true" 
      />
      <div 
        className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent/5 blur-3xl animate-float animation-delay-2000" 
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

      <div className="container-custom relative z-10">
        {/* Section heading — light variant for dark background */}
        <SectionHeading
          badge="Why Choose Us"
          title="Craftsmanship You Can"
          titleHighlight="Count On"
          subtitle="We've built our reputation on honest advice, quality finishes, and a genuine commitment to customer satisfaction."
          light={true}
          id="why-choose-us-heading"
        />

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12 lg:mt-16">
          {WHY_CHOOSE_US.map((item, index) => {
            const Icon = ICON_MAP[item.icon];
            return (
              <article
                key={item.id}
                className="group relative flex flex-col rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-accent/40 hover:bg-white/10 hover:-translate-y-1 md:p-7 lg:p-8"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease forwards ${index * 0.1 + 0.2}s`
                }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Stat number — prominent display */}
                <div className="relative z-10 mb-3">
                  <div
                    className="text-4xl font-black tracking-tighter text-accent md:text-5xl lg:text-5xl"
                    aria-label={`${item.stat} ${item.statLabel}`}
                  >
                    {item.stat}
                    <span className="ml-1 text-lg font-semibold text-white/60 md:text-xl">
                      {item.statLabel}
                    </span>
                  </div>
                  {/* Decorative line under stat */}
                  <div className="mt-2 h-0.5 w-12 rounded-full bg-accent/30 transition-all duration-300 group-hover:w-16 group-hover:bg-accent/60" />
                </div>

                {/* Icon with enhanced styling */}
                <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 transition-all duration-500 group-hover:bg-accent group-hover:shadow-lg group-hover:shadow-accent/30">
                  {Icon && (
                    <Icon 
                      size={22} 
                      className="text-accent transition-all duration-500 group-hover:scale-110 group-hover:text-white" 
                    />
                  )}
                </div>

                {/* Title and description */}
                <div className="relative z-10">
                  <h3 className="mb-2 text-base font-bold text-white transition-colors duration-300 group-hover:text-accent md:text-lg">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300 md:text-base">
                    {item.description}
                  </p>
                </div>

                {/* Hover accent border bottom - animated */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-accent/0 via-accent to-accent/0 scale-x-0 transition-all duration-500 group-hover:scale-x-100"
                  aria-hidden="true"
                />

                {/* Decorative corner accent */}
                <div
                  className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-accent/5 transition-all duration-500 group-hover:scale-150 group-hover:bg-accent/10"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>

        {/* Bottom trust paragraph - enhanced */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/20 hover:bg-white/8 sm:p-8 lg:mt-16">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-accent/20 transition-all duration-300 group-hover:bg-accent/30 sm:h-14 sm:w-14"
              aria-hidden="true"
            >
              <Award size={30} className="text-accent sm:size-7" />
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">
                Established in {BUSINESS.founded} — Serving Clients Across the UK
              </h3>
              <p className="text-sm leading-relaxed text-neutral-400 sm:text-base">
                With {BUSINESS.yearsExperience} years in the trade and over{" "}
                {BUSINESS.projectsCompleted} completed projects, Bilal Painting &amp;
                Decorating has the expertise to handle any job, big or small.
                Every project comes with our personal quality guarantee.
              </p>
            </div>
            {/* Decorative element */}
            <div
              className="hidden lg:flex h-12 w-12 items-center justify-center rounded-full border border-white/10"
              aria-hidden="true"
            >
              <div className="h-2 w-2 rounded-full bg-accent/40" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}