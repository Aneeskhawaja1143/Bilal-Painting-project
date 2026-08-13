"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Play, X } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { getVideoThumbnailUrl } from "@/lib/cloudinary/clientHelpers";

const FALLBACK_PROJECTS = [
  {
    id: "fallback-1",
    before: "/images/before-1.jpeg",
    after: "/images/after-1.jpg",
    video: null,
    title: "Living Room Makeover",
    description: "Dark to light – complete interior transformation",
    category: "Interior",
  },
  {
    id: "fallback-2",
    before: "/images/before-2.jpg",
    after: "/images/after-2.jpg",
    video: null,
    title: "Exterior Refresh",
    description: "Weather-worn to weather-proof",
    category: "Exterior",
  },
  {
    id: "fallback-3",
    before: "/images/before-3.jpeg",
    after: "/images/after-3.jpeg",
    video: null,
    title: "Office Space Revival",
    description: "Dated to dynamic – commercial makeover",
    category: "Commercial",
  },
  {
    id: "fallback-4",
    before: "/images/before-4.jpg",
    after: "/images/after-4.jpg",
    video: null,
    title: "Bedroom Retreat",
    description: "Cosy to captivating",
    category: "Interior",
  },
];

/**
 * @param {object} props
 * @param {Array<{id, before, after, video, title, description, category}>} [props.projects]
 */
export default function Transformations({ projects }) {
  const PROJECTS = projects && projects.length > 0 ? projects : FALLBACK_PROJECTS;

  const [activeIndex, setActiveIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const resetView = () => {
    setShowAfter(false);
    setShowVideo(false);
  };

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
    resetView();
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    resetView();
  };

  const currentProject = PROJECTS[activeIndex];
  const currentImageUrl = showAfter ? currentProject.after : currentProject.before;
  const hasVideo = Boolean(currentProject.video);

  return (
    <section
      className="section-padding bg-neutral-50 overflow-hidden"
      aria-labelledby="transformations-heading"
    >
      <div className="container-custom">
        <SectionHeading
          badge="Portfolio"
          title="Project"
          titleHighlight="Transformations"
          subtitle="See the difference we make – real projects, real results."
          id="transformations-heading"
        />

        <div className="mt-12">
          {/* Changed grid layout to balance the narrower image container */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16 items-center">
            
            {/* Left: Image (Adjusted col-span-5 to make the container naturally narrower) */}
            <div className="relative lg:col-span-5 mx-auto w-full max-w-md lg:max-w-none">
              
              {/* THE FIX: Changed aspect ratio to [3/4] for portrait images. Removed extra padding. */}
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-xl bg-neutral-100 ring-1 ring-black/5">
                {showVideo && hasVideo ? (
                  <>
                    <video
                      key={currentProject.video}
                      src={currentProject.video}
                      poster={getVideoThumbnailUrl(currentProject.video)}
                      controls
                      preload="none"
                      className="relative z-10 h-full w-full object-cover" // Cover is safe here since users expect standard video frames
                    >
                      Your browser does not support video playback.
                    </video>

                    {/* Back to photos */}
                    <button
                      onClick={() => setShowVideo(false)}
                      className="absolute right-3 top-3 z-20 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-sm px-3.5 py-2 text-xs font-semibold text-primary shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                    >
                      <X size={14} />
                      Back to Photos
                    </button>
                  </>
                ) : (
                  <>
                    {/* The Actual Image: Using object-cover now that the container fits the image shape naturally */}
                    <Image
                      src={currentImageUrl}
                      alt={showAfter ? `After ${currentProject.title} by Bilal Painting & Decorating UK` : `Before ${currentProject.title} by Bilal Painting & Decorating UK`}
                      fill
                      className="object-cover relative z-10 transition-all duration-700"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      unoptimized={currentImageUrl.startsWith("http")}
                    />

                    {/* Before/After Label */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider shadow-md ${
                        showAfter 
                          ? "bg-green-500 text-white" 
                          : "bg-orange-500 text-white"
                      }`}>
                        {showAfter ? "✓ After" : "⟳ Before"}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-primary shadow-md">
                        <Sparkles size={12} className="text-accent" />
                        {currentProject.category}
                      </span>
                    </div>

                    {/* Watch Video button */}
                    {hasVideo && (
                      <button
                        onClick={() => setShowVideo(true)}
                        className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                      >
                        <Play size={14} fill="currentColor" />
                        Watch Video
                      </button>
                    )}

                    {/* Toggle Button */}
                    <button
                      onClick={() => setShowAfter(!showAfter)}
                      className={`absolute right-4 z-20 rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-primary shadow-lg transition-all hover:scale-105 hover:shadow-xl ${
                        hasVideo ? "bottom-16" : "bottom-4"
                      }`}
                    >
                      {showAfter ? "Show Before" : "Show After"}
                    </button>
                  </>
                )}
              </div>

              {/* Navigation Arrows */}
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={prevProject}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent border border-neutral-100"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={24} className="text-primary" />
                </button>
              </div>
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-30">
                <button
                  onClick={nextProject}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent border border-neutral-100"
                  aria-label="Next project"
                >
                  <ChevronRight size={24} className="text-primary" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {PROJECTS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index);
                      resetView();
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === activeIndex 
                        ? "w-8 bg-accent" 
                        : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right: Info (col-span-7) */}
            <div className="flex flex-col justify-center lg:col-span-7">
              <h3 className="text-3xl font-bold text-primary sm:text-4xl md:text-5xl leading-tight">
                {currentProject.title}
              </h3>
              <p className="mt-4 text-lg text-neutral-500 md:text-xl max-w-2xl">
                {currentProject.description}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 max-w-lg">
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-neutral-100">
                  <p className="text-sm text-neutral-400 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-lg font-bold text-primary">3-5 Days</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm border border-neutral-100">
                  <p className="text-sm text-neutral-400 uppercase tracking-wider mb-1">Customer Rating</p>
                  <p className="text-lg font-bold text-primary">⭐⭐⭐⭐⭐</p>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 text-lg font-bold text-white shadow-accent transition-all duration-300 hover:bg-accent-dark hover:shadow-xl hover:-translate-y-1"
                >
                  Get Your Free Quote
                  <ArrowRight size={20} aria-hidden="true" />
                </Link>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}