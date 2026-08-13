import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { getAboutContent } from "@/lib/db/queries/about";

const FALLBACK = {
  badge: "About Bilal Painting & Decorating",
  heading: "Trusted Painters & Decorators in",
  headingAccent: "Birmingham",
  paragraph1:
    "For over 14 years, Bilal Painting & Decorating has been providing professional painting and decorating services across Birmingham. Using trusted paint brands, professional-grade materials, expert craftsmanship, and meticulous preparation, we deliver exceptional finishes backed by reliable service and complete customer satisfaction.",
  paragraph2:
    "We also provide specialist painting services for homeowners, landlords, letting agents, and property managers. Whether you're preparing a property for sale, refreshing a rental, or renovating your family home, our experienced painters deliver high-quality workmanship with minimal disruption and long-lasting results.",
  bulletPoints: [
    "Trusted paint brands & materials",
    "Meticulous surface preparation",
    "Minimal disruption to your routine",
    "Complete customer satisfaction",
  ],
  experienceYears: "14+",
  image: { url: "/images/room.jpg" },
};

export default async function About() {
  let content = null;
  try {
    content = await getAboutContent();
  } catch (error) {
    console.error("Failed to load about content, using fallback:", error);
  }

  const badge = content?.badge || FALLBACK.badge;
  const heading = content?.heading || FALLBACK.heading;
  const headingAccent = content?.headingAccent || FALLBACK.headingAccent;
  const paragraph1 = content?.paragraph1 || FALLBACK.paragraph1;
  const paragraph2 = content?.paragraph2 || FALLBACK.paragraph2;
  const bulletPoints =
    content?.bulletPoints?.length > 0 ? content.bulletPoints : FALLBACK.bulletPoints;
  const experienceYears = content?.experienceYears || FALLBACK.experienceYears;
  const image = content?.image || FALLBACK.image;

  return (
    <section className="section-padding bg-white overflow-hidden" aria-labelledby="about-heading">
      <div className="container-custom">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* Left Side: Text Content */}
          <div className="animate-fadeInLeft">
            <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-accent">
              {badge}
            </span>
            <h2 
              id="about-heading"
              className="mb-6 text-3xl font-bold text-primary sm:text-4xl md:text-5xl"
            >
              {heading} <span className="text-accent">{headingAccent}</span>
            </h2>
            
            <p className="mb-5 text-base leading-relaxed text-neutral-600 sm:text-lg">
              {paragraph1}
            </p>

            <p className="mb-8 text-base leading-relaxed text-neutral-600 sm:text-lg">
              {paragraph2}
            </p>

            {/* Bullet Points */}
            <ul className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {bulletPoints.map((point, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-accent shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium text-primary sm:text-base">{point}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3.5"
            >
              Get Your Free Quote
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Right Side: Image/Visual */}
          <div className="relative animate-fadeInRight">
            {/* Decorative Background */}
            <div className="absolute -inset-4 rounded-3xl bg-accent/5 transform rotate-3" aria-hidden="true" />
            <div className="absolute -inset-4 rounded-3xl bg-primary/5 transform -rotate-3" aria-hidden="true" />
            
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl lg:max-h-[528px] xl:max-h-[592px]">
              <Image
                src={image.url}
                alt="Professional painting and decorating work in Birmingham"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized={image.url.startsWith("http")}
              />
              
              {/* Experience Badge Floating */}
              <div className="absolute bottom-6 left-6 rounded-xl bg-white p-4 shadow-lg flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent font-bold text-xl">
                  {experienceYears}
                </div>
                <div>
                  <p className="text-sm font-bold text-primary">Years</p>
                  <p className="text-xs font-medium text-neutral-500">Experience</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}