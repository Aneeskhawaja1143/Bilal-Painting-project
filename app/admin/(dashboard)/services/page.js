import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { listServices } from "@/lib/db/queries/services";
import ServicesEditor from "@/components/admin/services/ServicesEditor";

export default async function AdminServicesPage() {
  const services = await listServices();

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
        <h1 className="text-2xl font-bold text-primary">Services</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage the service cards shown on the homepage and the Services page.
        </p>
      </div>

      <ServicesEditor initialItems={services} />
    </div>
  );
}