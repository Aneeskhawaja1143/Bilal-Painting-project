import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getContactInfo } from "@/lib/db/queries/contactInfo";
import ContactInfoEditor from "@/components/admin/contact-info/ContactInfoEditor";

export default async function AdminContactInfoPage() {
  const content = await getContactInfo();

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
        <h1 className="text-2xl font-bold text-primary">Contact Info</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Phone, email, address, and WhatsApp details used across the site.
        </p>
      </div>

      <ContactInfoEditor initialContent={content} />
    </div>
  );
}