"use client";

import { useState } from "react";
import { MapPin, Navigation, ExternalLink, Home, Award } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

/**
 * Map Component for Home-Based Business
 * 
 * Since Bilal Painting is a home-based service business:
 * - Shows the base location (home address)
 * - Emphasizes the 5-mile free quote radius
 * - Makes it clear they travel nationwide
 * - Uses a simple static map image (no API key needed)
 */
export default function MapPlaceholder() {
  const [imageError, setImageError] = useState(false);
  const { address } = BUSINESS;

  // Full address for Google Maps
  const fullAddress = encodeURIComponent(
    `${address.street}, ${address.city}, ${address.postcode}, ${address.country}`
  );

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${fullAddress}`;
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${fullAddress}`;

  // Static map from OpenStreetMap (free, no API key)
  const staticMapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=800&height=400&center=lon:-1.8986,lat:52.4862&zoom=13&marker=lon:-1.8986,lat:52.4862;color:%23f97316;size:large`;

  return (
    <section
      className="section-padding bg-neutral-50"
      aria-labelledby="map-heading"
    >
      <div className="container-custom">
        {/* Section header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2
              id="map-heading"
              className="text-2xl font-bold text-primary sm:text-3xl"
            >
              Our Location
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              <span className="font-semibold text-primary">Home-based</span> in{" "}
              {address.city}, {address.country} — serving clients across the UK
            </p>
          </div>

          {/* Get Directions button */}
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Get directions to our location — opens Google Maps"
          >
            <Navigation size={15} aria-hidden="true" />
            Get Directions
            <ExternalLink size={13} aria-hidden="true" />
          </a>
        </div>

        {/* Map area */}
        <div className="overflow-hidden rounded-2xl border border-neutral-200 shadow-card">
          <div className="relative h-80 sm:h-96 lg:h-[420px] w-full bg-gradient-to-br from-neutral-50 to-neutral-100">
            
            {!imageError ? (
              // Static Map Image
              <img
                src={staticMapUrl}
                alt={`Map showing ${BUSINESS.name} location in ${address.city}`}
                className="h-full w-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              // Fallback if image fails to load
              <div className="flex h-full flex-col items-center justify-center bg-neutral-100 p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                  <MapPin size={32} className="text-accent" />
                </div>
                <p className="text-lg font-bold text-primary">{BUSINESS.name}</p>
                <p className="text-sm text-neutral-500">{address.street}, {address.city}</p>
                <p className="text-sm text-neutral-500">{address.postcode}</p>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark"
                >
                  View on Google Maps
                </a>
              </div>
            )}

            {/* Overlay badge - Free Quote Radius */}
            <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-2 shadow-lg border border-accent/20">
              <Award size={14} className="text-accent" />
              <span className="text-xs font-semibold text-primary">
                Free Quote Within <span className="text-accent">5 Miles</span>
              </span>
            </div>

            {/* Home-based badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-2 shadow-lg border border-neutral-200">
              <Home size={14} className="text-accent" />
              <span className="text-xs font-medium text-neutral-600">
                Home-Based Business
              </span>
            </div>
          </div>
        </div>

        {/* Address & Service Area Info */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Address Card */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-semibold text-primary">Our Base</p>
                <address className="not-italic text-sm text-neutral-500 leading-relaxed">
                  {address.street}
                  <br />
                  {address.city}, {address.postcode}
                  <br />
                  {address.country}
                </address>
              </div>
            </div>
          </div>

          {/* Free Quote Card */}
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <Award size={18} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-semibold text-primary">
                  Free Quote Within 5 Miles
                </p>
                <p className="text-sm text-neutral-500">
                  We offer free site visits and no-obligation quotes within 
                  <span className="font-semibold text-accent"> 5 miles</span> of our base.
                </p>
              </div>
            </div>
          </div>

          {/* Nationwide Card */}
          <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <Navigation size={18} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-semibold text-primary">
                  Nationwide Service
                </p>
                <p className="text-sm text-neutral-500">
                  We serve clients across the UK. Contact us to confirm coverage
                  in your area.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Note about home-based business */}
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm">
          <Home size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-sm text-neutral-500">
            <span className="font-semibold text-primary">Home-based business:</span>{" "}
            We don't have a physical shop, but we're always available to visit your
            property for a free consultation and quote.
          </p>
        </div>
      </div>
    </section>
  );
}