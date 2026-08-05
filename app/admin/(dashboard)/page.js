import Link from "next/link";
import {
  Image as ImageIcon,
  Info,
  Briefcase,
  GalleryHorizontalEnd,
  SplitSquareHorizontal,
  HelpCircle,
  Quote,
  Phone,
  Images,
  ArrowRight,
} from "lucide-react";

const SECTIONS = [
  {
    label: "Hero",
    href: "/admin/hero",
    icon: ImageIcon,
    description: "Homepage headline, description, trust badges, and hero images.",
    phase: 2,
  },
  {
    label: "About",
    href: "/admin/about",
    icon: Info,
    description: "About section copy and image.",
    phase: 2,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Briefcase,
    description: "Service cards shown on the homepage and the Services page.",
    phase: 2,
  },
  {
    label: "Portfolio",
    href: "/admin/portfolio",
    icon: GalleryHorizontalEnd,
    description: "Portfolio image grid on the homepage.",
    phase: 2,
  },
  {
    label: "Before / After",
    href: "/admin/transformations",
    icon: SplitSquareHorizontal,
    description: "Before/after project pairs in the Transformations slider.",
    phase: 2,
  },
  {
    label: "FAQs",
    href: "/admin/faqs",
    icon: HelpCircle,
    description: "Frequently asked questions on the homepage.",
    phase: 2,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: Quote,
    description: "Customer testimonials — database and admin only for now, not yet shown on the public site.",
    phase: 2,
  },
  {
    label: "Contact Info",
    href: "/admin/contact-info",
    icon: Phone,
    description: "Phone, email, address, and WhatsApp details used across the site.",
    phase: 2,
  },
  {
    label: "Media Library",
    href: "/admin/media",
    icon: Images,
    description: "Upload and manage images and videos (via Cloudinary).",
    phase: 3,
  },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage your website content. Sections below will become fully editable
          as each phase of the admin system is completed.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group relative flex flex-col rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-all duration-300 hover:border-accent/30 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10">
                  <Icon size={20} className="text-accent" />
                </div>
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  Phase {section.phase}
                </span>
              </div>
              <h2 className="mb-1.5 text-base font-bold text-primary">{section.label}</h2>
              <p className="flex-1 text-sm leading-relaxed text-neutral-500">
                {section.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Manage
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
