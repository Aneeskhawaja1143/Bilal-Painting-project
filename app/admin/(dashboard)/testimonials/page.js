import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { listTestimonials } from "@/lib/db/queries/testimonials";
import TestimonialsEditor from "@/components/admin/testimonials/TestimonialsEditor";

export default async function AdminTestimonialsPage() {
  const items = await listTestimonials();

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
        <h1 className="text-2xl font-bold text-primary">Testimonials</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage customer testimonials. Not shown on the public site yet — database
          and admin only, per the plan agreed in Phase 1.
        </p>
      </div>

      <TestimonialsEditor initialItems={items} />
    </div>
  );
}