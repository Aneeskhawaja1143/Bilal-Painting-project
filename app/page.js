import { SITE, BUSINESS } from "@/lib/constants";
import { getHeroImages } from "@/lib/db/queries/hero";
import { listTransformations } from "@/lib/db/queries/transformations";
import { listFaqs } from "@/lib/db/queries/faqs";
import Hero from "@/components/home/Hero";
import About from "@/components/About"; // ← Naya About component yahan import kiya hai
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PreFooterCTA from "@/components/home/PreFooterCTA";
import Transformations from "@/components/home/Transformations";
import FAQs from "@/components/FAQs";
import Portfolio from "@/components/Portfolio";
/* ─── Page-level Metadata ────────────────────────────────────────────────── */
export const metadata = {
  title: "Painters Birmingham | Painting & Decorating Services | Bilal Painting",
  description: "Trusted painters and decorators in Birmingham offering interior painting, exterior painting, commercial decorating and wallpaper installation. Free quotes, fully insured, 14+ years' experience. Call today!",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Bilal Painting & Decorating | Painters & Decorators in Birmingham",
    description:
      "Premium painting and decorating services across the UK. Interior, exterior, commercial and wallpaper — trusted by 500+ customers.",
    url: SITE.url,
    images: [SITE.ogImage],
    siteName: SITE.name,
    locale: "en_GB",
    type: "website",
  },
};

/* ─── Structured Data (JSON-LD) — Local Business Schema ─────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HousePainter",
  name: BUSINESS.name,
  description: SITE.description,
  url: SITE.url,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.city,
    addressRegion: BUSINESS.address.county,
    postalCode: BUSINESS.address.postcode,
    addressCountry: "GB",
  },
  areaServed: {
    "@type": "Country",
    name: "Birmingham, West Midlands",
  },
  priceRange: "££",
geo: {
  "@type": "GeoCoordinates",
  "latitude": "52.4862",  // Birmingham
  "longitude": "-1.8986",
},
};

/* ─── Home Page Component ────────────────────────────────────────────────── */
export default async function HomePage() {
  // Fetch hero images from the database (managed via /admin/hero).
  // Falls back to `undefined` on any failure — Hero.jsx itself has a
  // hardcoded fallback for that case, so a DB hiccup can never blank out
  // or break the homepage.
  let heroImages;
  try {
    heroImages = await getHeroImages();
  } catch (error) {
    console.error("Failed to load hero images, using fallback:", error);
    heroImages = undefined;
  }

  // Fetch before/after transformation pairs (managed via /admin/transformations).
  // Flattened to before/after (and optional video) URL strings here, since
  // Transformations.jsx (a Client Component) just needs plain strings.
  let transformations;
  try {
    const dbTransformations = await listTransformations();
    transformations = dbTransformations.map((t) => ({
      id: t.id,
      before: t.beforeImage.url,
      after: t.afterImage.url,
      video: t.video?.url || null,
      title: t.title,
      description: t.description,
      category: t.category,
    }));
  } catch (error) {
    console.error("Failed to load transformations, using fallback:", error);
    transformations = undefined;
  }

  // Fetch FAQs (managed via /admin/faqs).
  let faqs;
  try {
    faqs = await listFaqs();
  } catch (error) {
    console.error("Failed to load FAQs, using fallback:", error);
    faqs = undefined;
  }

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page sections */}
      <Hero images={heroImages} />
      <About /> 
      <ServicesOverview />
      <WhyChooseUs />
      <Transformations projects={transformations} /> 
      <Portfolio />
      <FAQs faqs={faqs} />
      <PreFooterCTA />
    </>
  );
}