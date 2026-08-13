import Image from "next/image";
import { listPortfolioImages } from "@/lib/db/queries/portfolio";

// Fallback images — used only if the database has no portfolio images yet.
const FALLBACK_IMAGES = [
  { id: "fallback-1", url: "/images/port-1.jpg", altText: "Modern living room interior painting project completed in Birmingham" },
  { id: "fallback-2", url: "/images/port-2.jpg", altText: "Freshly painted exterior of a residential house in West Midlands" },
  { id: "fallback-3", url: "/images/port-3.jpg", altText: "Commercial office space decorating and painting project" },
  { id: "fallback-4", url: "/images/port-4.jpg", altText: "Elegant wallpaper installation and feature wall in a bedroom" },
];

export default async function Portfolio() {
  let images = FALLBACK_IMAGES;
  try {
    const dbImages = await listPortfolioImages();
    if (dbImages.length > 0) {
      images = dbImages.map((img) => ({
        id: img.id,
        url: img.media.url,
        altText: img.altText,
      }));
    }
  } catch (error) {
    console.error("Failed to load portfolio images, using fallback:", error);
  }

  return (
    <section className="section-padding bg-white" aria-labelledby="portfolio-heading">
      <div className="container-custom">
        {/* Top Content (SEO Optimized) */}
       <div className="mb-14 text-center animate-fadeInUp">
  <span className="mb-4 block text-sm font-semibold uppercase tracking-widest text-accent">
            Portfolio
          </span>
          <h2 id="portfolio-heading" className="text-3xl font-bold text-primary sm:text-4xl md:text-5xl mb-4">
            Our Recent <span className="text-accent">Painting Projects</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto sm:text-lg">
            Explore our portfolio of completed residential and commercial painting projects. Every project showcases our commitment to quality craftsmanship, attention to detail, and customer satisfaction.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 animate-fadeInUp" style={{ animationDelay: "200ms" }}>
          {images.map((img) => (
            <div 
              key={img.id} 
              className="group relative w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl aspect-[4/3] lg:aspect-[16/10]"
            >
              <Image
                src={img.url}
                alt={img.altText}
                fill
               className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized={img.url.startsWith("http")}
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-primary/80 via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-primary/80 via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Quality Guaranteed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}