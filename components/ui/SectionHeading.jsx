/**
 * Reusable Section Heading Component
 *
 * Props:
 * - badge {string}       — small uppercase label above the title (optional)
 * - title {string}       — main heading text (required)
 * - titleHighlight {string} — portion of title to highlight in accent colour (optional)
 * - subtitle {string}    — supporting description below the divider (optional)
 * - align {string}       — "left" | "center" (default: "center")
 * - light {boolean}      — render in light (white) text for dark backgrounds (default: false)
 * - as {string}          — HTML heading tag: "h1" | "h2" | "h3" (default: "h2")
 * - animate {boolean}    — enable fade-in animation (default: false)
 */
export default function SectionHeading({
  badge,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  light = false,
  as: Tag = "h2",
  animate = false,
}) {
  const isCenter = align === "center";

  // Animation classes only if animate is true
  const animationClass = animate ? "animate-on-scroll" : "";
  const delayClass = animate ? "animation-delay-100" : "";

  return (
    <div 
      className={`mb-12 md:mb-14 lg:mb-16 ${isCenter ? "text-center" : "text-left"}`}
    >
      {/* Badge */}
      {badge && (
        <div
          className={`mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] border ${
            light
              ? "bg-white/10 text-white border-white/20"
              : "bg-accent/10 text-accent border-accent/20"
          } ${animationClass} ${delayClass}`}
          aria-label={`Section category: ${badge}`}
        >
          <span 
            className={`h-1.5 w-1.5 rounded-full ${
              light ? "bg-white" : "bg-accent"
            }`}
            aria-hidden="true"
          />
          {badge}
        </div>
      )}

      {/* Title */}
      <Tag
        className={`text-balance font-bold leading-[1.08] tracking-tight ${
          light ? "text-white" : "text-primary"
        } text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl ${animationClass}`}
        style={{ animationDelay: badge ? "0.1s" : "0s" }}
      >
        {title}{" "}
        {titleHighlight && (
          <span className="relative inline-block text-accent">
            {titleHighlight}
            <span
              className={`absolute -bottom-1 left-0 right-0 h-1 rounded-full ${
                light ? "bg-accent/50" : "bg-accent/40"
              }`}
              aria-hidden="true"
            />
          </span>
        )}
      </Tag>

      {/* Accent divider (three decorative lines) */}
      <div
        className={`mt-5 flex items-center gap-3 ${
          isCenter ? "justify-center" : "justify-start"
        }`}
        aria-hidden="true"
      >
        <div className={`h-1 w-12 rounded-full bg-accent ${animationClass}`} />
        <div className={`h-1 w-4 rounded-full bg-accent/40 ${animationClass}`} />
        <div className={`h-1 w-2 rounded-full bg-accent/20 ${animationClass}`} />
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={`mt-6 max-w-3xl text-base leading-relaxed sm:text-lg md:text-xl ${
            light ? "text-neutral-300" : "text-neutral-500"
          } ${isCenter ? "mx-auto" : ""} ${animationClass}`}
          style={{ animationDelay: "0.2s" }}
        >
          {subtitle}
        </p>
      )}

      {/* Optional decorative line below subtitle */}
      {subtitle && (
        <div
          className={`mt-6 h-px w-20 rounded-full ${
            light ? "bg-white/10" : "bg-neutral-200"
          } ${isCenter ? "mx-auto" : ""} ${animationClass}`}
          style={{ animationDelay: "0.3s" }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}