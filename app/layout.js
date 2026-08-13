import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
// NEW: Import HideOnAdmin
import HideOnAdmin from "@/components/layout/HideOnAdmin";
import { SITE, BUSINESS } from "@/lib/constants";
import { getContactInfo } from "@/lib/db/queries/contactInfo";
import { Inter, Poppins } from 'next/font/google';
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

/* ─── Global Metadata (Next.js Metadata API) ────────────────────────────── */
export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | Bilal Painting & Decorating`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  alternates: {
    canonical: "/",
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "Home Services",
  referrer: "origin-when-cross-origin",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: "Bilal Painting & Decorating — Premium UK Painters and Decorators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitterHandle,
    creator: SITE.twitterHandle,
    title: SITE.name,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [{ name: BUSINESS.name }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

/* ─── Root Layout ────────────────────────────────────────────────────────── */
export default async function RootLayout({ children }) {
  let contact = BUSINESS;
  try {
    const dbContact = await getContactInfo();
    if (dbContact) {
      contact = {
        phone: dbContact.phone,
        phoneDisplay: dbContact.phoneDisplay,
        whatsapp: dbContact.whatsapp,
        whatsappMessage: dbContact.whatsappMessage,
      };
    }
  } catch (error) {
    console.error("Failed to load contact info in layout, using fallback:", error);
  }

  return (
    <html lang="en-GB" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0F172A" />
        <meta name="geo.region" content="GB" />
        <meta name="geo.placename" content="Birmingham, United Kingdom" />
      </head>
      <body className="font-sans flex min-h-screen flex-col bg-white text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>

        {/* 1. Wrap Navbar in HideOnAdmin */}
        <HideOnAdmin>
          <Navbar phone={contact.phone} phoneDisplay={contact.phoneDisplay} />
        </HideOnAdmin>

        {/* Page Content */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* 2. Wrap Footer & WhatsApp in HideOnAdmin */}
        <HideOnAdmin>
          <Footer />
          <FloatingWhatsApp whatsapp={contact.whatsapp} whatsappMessage={contact.whatsappMessage} />
        </HideOnAdmin>
        
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
          `}
        </Script>
      </body>
    </html>
  );
}