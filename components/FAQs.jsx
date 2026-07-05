"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_DATA = [
  {
    question: "What painting and decorating services do you offer?",
    answer: "We provide professional interior painting, exterior painting, commercial decorating, wallpaper installation, woodwork painting, and property maintenance services for homeowners and businesses across Birmingham and the surrounding areas.",
  },
  {
    question: "Do you offer free quotes?",
    answer: "Yes. We provide free, no-obligation quotations and site visits within 5 miles. We'll assess your project, discuss your requirements, and provide a transparent, competitive quote with no hidden costs.",
  },
  {
    question: "Are you fully insured?",
    answer: "Absolutely. Bilal Painting & Decorating is fully insured, giving you complete peace of mind throughout your painting or decorating project.",
  },
  {
    question: "What areas do you cover?",
    answer: "We proudly serve Birmingham and the surrounding areas, providing reliable painting and decorating services for residential and commercial properties.",
  },
  {
    question: "What type of paint do you use?",
    answer: "We use best-quality paints from trusted brands, including Dulux Trade, Crown Trade, Johnstone's Trade, Farrow & Ball, and other leading manufacturers, ensuring durable and professional-quality finishes.",
  },
  {
    question: "Do you provide commercial painting services?",
    answer: "Yes. We work with offices, retail shops, restaurants, schools, healthcare facilities, warehouses, landlords, and commercial property managers, delivering flexible painting solutions with minimal disruption to your business.",
  },
  {
    question: "How long will my painting project take?",
    answer: "Project duration depends on the size and complexity of the work. Smaller interior projects may take one to three days, while larger residential or commercial decorating projects may take longer. We'll provide a clear schedule before work begins.",
  },
  {
    question: "Do I need to prepare my property before you arrive?",
    answer: "We handle most of the preparation, including protecting furniture and flooring, filling cracks, sanding surfaces, and masking fixtures. We simply recommend removing valuable or fragile items before work starts.",
  },
  {
    question: "Why choose Bilal Painting & Decorating?",
    answer: "With over 14 years of experience, trusted paint brands, high-quality materials, skilled craftsmanship, and a commitment to customer satisfaction, we deliver reliable painting and decorating services that homeowners and businesses can trust.",
  },
  {
    question: "How can I book a painting consultation?",
    answer: "Simply call us, send a WhatsApp message, or complete our online contact form to arrange your free quotation. Our friendly team will discuss your project and schedule a convenient site visit.",
  }
];

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(0); // Pehla sawal open rahega

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="section-padding bg-neutral-50" aria-labelledby="faq-heading">
      <div className="container-custom max-w-4xl">
        <div className="mb-12 text-center animate-fadeInUp">s
          <h2 id="faq-heading" className="text-3xl font-bold text-primary sm:text-4xl md:text-5xl mb-4">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Find answers to common questions about our painting and decorating services in Birmingham.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`rounded-2xl transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                  isOpen ? "border-accent/30 bg-white shadow-lg" : "border-neutral-200 bg-white hover:border-accent/20"
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-primary focus:outline-none sm:p-6 sm:text-lg"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${isOpen ? "bg-accent text-white" : "bg-accent/10 text-accent"}`}>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>
                
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 pt-0 text-sm leading-relaxed text-neutral-600 sm:px-6 sm:pb-6 sm:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}