import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { listPortfolioImages } from "@/lib/db/queries/portfolio";
import PortfolioEditor from "@/components/admin/portfolio/PortfolioEditor";

export default async function AdminPortfolioPage() {
  const images = await listPortfolioImages();

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
        <h1 className="text-2xl font-bold text-primary">Portfolio</h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage the portfolio image grid shown on the homepage.
        </p>
      </div>

      <PortfolioEditor initialItems={images} />
    </div>
  );
}