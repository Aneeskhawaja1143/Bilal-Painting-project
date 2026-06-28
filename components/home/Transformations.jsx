"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

const PROJECTS = [
  {
    id: 1,
    before: "/images/before-1.jpeg",
    after: "/images/after-1.jpg",
    title: "Living Room Makeover",
    description: "Dark to light – complete interior transformation",
    category: "Interior",
  },
  {
    id: 2,
    before: "/images/before-2.jpg",
    after: "/images/after-2.jpg",
    title: "Exterior Refresh",
    description: "Weather-worn to weather-proof",
    category: "Exterior",
  },
  {
    id: 3,
    before: "/images/before-3.jpeg",
    after: "/images/after-3.jpeg",
    title: "Office Space Revival",
    description: "Dated to dynamic – commercial makeover",
    category: "Commercial",
  },
  {
    id: 4,
    before: "/images/before-4.jpg",
    after: "/images/after-4.jpg",
    title: "Bedroom Retreat",
    description: "Cosy to captivating",
    category: "Interior",
  },
];

export default function Transformations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAfter, setShowAfter] = useState(false);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
    setShowAfter(false);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
    setShowAfter(false);
  };

  const currentProject = PROJECTS[activeIndex];

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
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                        src={showAfter ? currentProject.after : currentProject.before}
                        alt={showAfter ? `After ${currentProject.title} by Bilal Painting & Decorating UK` : `Before ${currentProject.title} by Bilal Painting & Decorating UK`}
                        fill
                        className="object-cover transition-all duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        />  
                
                {/* Before/After Label */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    showAfter 
                      ? "bg-green-500 text-white" 
                      : "bg-orange-500 text-white"
                  }`}>
                    {showAfter ? "✓ After" : "⟳ Before"}
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-primary">
                    <Sparkles size={12} className="text-accent" />
                    {currentProject.category}
                  </span>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => setShowAfter(!showAfter)}
                  className="absolute bottom-4 right-4 rounded-full bg-white/95 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-primary shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  {showAfter ? "Show Before" : "Show After"}
                </button>
              </div>

              {/* Navigation Arrows */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2">
                <button
                  onClick={prevProject}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Previous project"
                >
                  <ChevronLeft size={20} className="text-primary" />
                </button>
              </div>
              <div className="absolute -right-3 top-1/2 -translate-y-1/2">
                <button
                  onClick={nextProject}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Next project"
                >
                  <ChevronRight size={20} className="text-primary" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-4">
                {PROJECTS.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveIndex(index);
                      setShowAfter(false);
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

            {/* Right: Info */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-primary sm:text-3xl">
                {currentProject.title}
              </h3>
              <p className="mt-2 text-lg text-neutral-500">
                {currentProject.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white p-4 shadow-sm border border-neutral-100">
                  <p className="text-xs text-neutral-400">Duration</p>
                  <p className="font-semibold text-primary">3-5 Days</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-sm border border-neutral-100">
                  <p className="text-xs text-neutral-400">Customer Rating</p>
                  <p className="font-semibold text-primary">⭐⭐⭐⭐⭐</p>
                </div>
              </div>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-base font-bold text-white shadow-accent transition-all duration-300 hover:bg-accent-dark hover:shadow-lg hover:-translate-y-0.5 sm:px-8 sm:py-4"
              >
                Get Your Free Quote
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}