import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { listFaqs } from "@/lib/db/queries/faqs";
import FaqsEditor from "@/components/admin/faqs/FaqsEditor";

export default async function AdminFaqsPage() {
  const items = await listFaqs();

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
        <h1 className="text-2xl font-bold text-primary">FAQs</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage the frequently asked questions shown on the homepage.
        </p>
      </div>

      <FaqsEditor initialItems={items} />
    </div>
  );
}