"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  LogOut, 
  ExternalLink, 
  Menu, 
  X,
  LayoutDashboard,
  Image as ImageIcon,
  Info,
  TrendingUp,
  Briefcase,
  GalleryHorizontalEnd,
  SplitSquareHorizontal,
  HelpCircle,
  Quote,
  Phone,
  Images,
  MessageSquare
} from "lucide-react";

// Admin links specifically for the mobile menu
const NAV_SECTIONS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Hero", href: "/admin/hero", icon: ImageIcon },
  { label: "About", href: "/admin/about", icon: Info },
  { label: "Why Choose Us", href: "/admin/why-choose-us", icon: TrendingUp },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Portfolio", href: "/admin/portfolio", icon: GalleryHorizontalEnd },
  { label: "Before / After", href: "/admin/transformations", icon: SplitSquareHorizontal },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircle },
  { label: "Testimonials", href: "/admin/testimonials", icon: Quote },
  { label: "Contact Info", href: "/admin/contact-info", icon: Phone },
  { label: "Contact Messages", href: "/admin/contact-messages", icon: MessageSquare },
  { label: "Media Library", href: "/admin/media", icon: Images },
];

export default function AdminHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Jab bhi koi link click ho (page change ho), mobile menu khud band ho jaye
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Check if link is active
  const isActive = (href) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <>
      <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-6 relative z-10">
        <div className="flex items-center gap-3">
          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600 transition-colors hover:bg-neutral-200 md:hidden"
            aria-label="Open Admin Menu"
          >
            <Menu size={20} />
          </button>

          <div>
            <h1 className="text-sm font-semibold text-neutral-400">
              <span className="hidden sm:inline">Signed in as </span>
              <span className="mt-0.5 block font-semibold text-primary sm:inline sm:mt-0">
                {session?.user?.email ?? "…"}
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-50 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <span className="hidden sm:inline">View Site</span>
            <span className="sm:hidden">Site</span>
            <ExternalLink size={14} className="ml-0.5" />
          </a>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* --- MOBILE DRAWER OVERLAY --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[999] flex md:hidden">
          {/* Dark Overlay Background */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Slide-out Menu Box */}
          <div className="relative flex h-full w-4/5 max-w-sm flex-col bg-white shadow-2xl animate-in slide-in-from-left-4 duration-300">
            <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
              <span className="text-sm font-bold text-primary">Admin Dashboard</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {NAV_SECTIONS.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                      active
                        ? "bg-accent/10 text-accent"
                        : "text-neutral-600 hover:bg-neutral-50 hover:text-primary"
                    }`}
                  >
                    <Icon size={18} className={active ? "text-accent" : "text-neutral-400"} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}