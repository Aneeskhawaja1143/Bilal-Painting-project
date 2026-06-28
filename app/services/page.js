import { SITE } from "@/lib/constants";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesGrid from "@/components/services/ServicesGrid";
import ServicesCTA from "@/components/services/ServicesCTA";
import PreFooterCTA from "@/components/home/PreFooterCTA";

/* ─── Page Metadata ──────────────────────────────────────────────────────── */
export const metadata = {
  title: "Painting & Decorating Services in Birmingham | Bilal Painting",
  description: "Professional interior painting, exterior painting, wallpaper installation and commercial decorating services in Birmingham and the West Midlands. Free quotations, fully insured and trusted for over 14 years.",
  
   keywords: [
  "painters and decorators Birmingham",
  "interior painting Birmingham",
  "exterior painting Birmingham",
  "commercial painting Birmingham",
  "wallpaper installation Birmingham",
  "house painters Birmingham",
  "professional decorators Birmingham",
   ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Services — Bilal Painting & Decorating | UK",
    description:
      "Interior, exterior, commercial decorating and wallpaper installation services across the UK. Quality craftsmanship, free quotations.",
    url: `${SITE.url}/services`,
    images: [SITE.ogImage],
    siteName: SITE.name,
    locale: "en_GB",
    type: "website",
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Painting and Decorating",
  provider: {
    "@type": "HousePainter",
    name: "Bilal Painting & Decorating",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Birmingham",
  },
};
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd),
  }}
/>
/* ─── Services Page Component ────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesGrid />
      <ServicesCTA />
      <PreFooterCTA />
    </>
  );
}
