"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Info,
  Briefcase,
  GalleryHorizontalEnd,
  SplitSquareHorizontal,
  HelpCircle,
  Quote,
  Phone,
  Images,
  PaintBucket,
} from "lucide-react";

const NAV_SECTIONS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero", href: "/admin/hero", icon: ImageIcon },
  { label: "About", href: "/admin/about", icon: Info },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Portfolio", href: "/admin/portfolio", icon: GalleryHorizontalEnd },
  { label: "Before / After", href: "/admin/transformations", icon: SplitSquareHorizontal },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Contact Info", href: "/admin/contact-info", icon: Phone },
  { label: "Media Library", href: "/admin/media", icon: Images },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-neutral-200 bg-white md:flex">
      <div className="flex items-center gap-2.5 border-b border-neutral-100 px-6 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
          <PaintBucket size={18} className="text-accent" />
        </div>
        <div>
          <p className="text-sm font-bold text-primary leading-tight">Bilal Painting</p>
          <p className="text-xs text-neutral-400 leading-tight">Admin Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Admin sections">
        {NAV_SECTIONS.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-accent/10 text-accent"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-primary"
              }`}
            >
              <Icon size={17} className={active ? "text-accent" : "text-neutral-400"} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
