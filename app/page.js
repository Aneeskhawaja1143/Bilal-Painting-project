import { SITE, BUSINESS } from "@/lib/constants";
import Hero from "@/components/home/Hero";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PreFooterCTA from "@/components/home/PreFooterCTA";
import Transformations from "@/components/home/Transformations"; // ← Add this

/* ─── Page-level Metadata ────────────────────────────────────────────────── */
export const metadata = {
  title: "Bilal Painting & Decorating | UK — Premium Painters & Decorators",
  description:
    "Expert painting and decorating services across the UK. Interior, exterior, commercial decorating and wallpaper installation. Free quotes, fully insured, 14+ years experience.",
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
export default function HomePage() {
  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page sections */}
      <Hero />
      <ServicesOverview />
      <WhyChooseUs />
      <Transformations /> {/* ← Now it works */}
      <PreFooterCTA />
    </>
  );
}
