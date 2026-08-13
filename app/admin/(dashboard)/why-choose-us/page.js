import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { listWhyChooseUs } from "@/lib/db/queries/whyChooseUs";
import WhyChooseUsEditor from "@/components/admin/why-choose-us/WhyChooseUsEditor";

export default async function AdminWhyChooseUsPage() {
  const items = await listWhyChooseUs();

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
        <h1 className="text-2xl font-bold text-primary">Why Choose Us</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage the four stat cards shown on the homepage.
        </p>
      </div>

      <WhyChooseUsEditor initialItems={items} />
    </div>
  );
}