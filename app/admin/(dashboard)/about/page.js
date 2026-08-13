import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAboutContent } from "@/lib/db/queries/about";
import AboutEditor from "@/components/admin/about/AboutEditor";

/**
 * Server Component: reads the current About content directly via Prisma
 * (no extra API round-trip for the initial load — same pattern as
 * app/admin/(dashboard)/hero/page.js). All subsequent mutations (save)
 * happen client-side through /api/admin/about, handled inside
 * <AboutEditor>.
 *
 * This does NOT affect the public site: components/About.jsx still reads
 * the hardcoded values in lib/constants.js. Wiring the public About
 * section to this data is a later, separate step.
 */
export default async function AdminAboutPage() {
  const content = await getAboutContent();

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
        <h1 className="text-2xl font-bold text-primary">About Section</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Edit the homepage About section — copy, bullet points, and image.
        </p>
      </div>

      <AboutEditor initialContent={content} />
    </div>
  );
}