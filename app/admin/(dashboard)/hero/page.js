import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getHeroContent, getHeroImages } from "@/lib/db/queries/hero";
import HeroEditor from "@/components/admin/hero/HeroEditor";

/**
 * Server Component: reads the current Hero content + images directly via
 * Prisma (no extra API round-trip for the initial load — this route is
 * already behind auth via middleware.js + the (dashboard) layout's own
 * session check). All subsequent mutations (save, add/reorder/delete
 * image, edit alt text) happen client-side through /api/admin/hero/*,
 * handled inside <HeroEditor>.
 *
 * This does NOT affect the public site: app/page.js still reads the
 * hardcoded values in lib/constants.js / components/home/Hero.jsx.
 * Wiring the public homepage to this data is a later, separate step.
 */
export default async function AdminHeroPage() {
  const [content, images] = await Promise.all([getHeroContent(), getHeroImages()]);

  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-primary"
      >
        <ArrowLeft size={15} />
        Back to Dashboard
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Hero Section</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Edit the homepage hero — headline, description, trust badges, and images.
        </p>
      </div>

      <HeroEditor initialContent={content} initialImages={images} />
    </div>
  );
}