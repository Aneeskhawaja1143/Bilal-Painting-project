import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { listTransformations } from "@/lib/db/queries/transformations";
import TransformationsEditor from "@/components/admin/transformations/TransformationsEditor";

export default async function AdminTransformationsPage() {
  const items = await listTransformations();

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
        <h1 className="text-2xl font-bold text-primary">Before / After</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage the before/after project pairs shown in the Transformations slider.
        </p>
      </div>

      <TransformationsEditor initialItems={items} />
    </div>
  );
}