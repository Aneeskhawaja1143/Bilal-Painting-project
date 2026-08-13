import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";

export default function ComingSoon({ title, phase, description }) {
  return (
    <div>
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-primary"
      >
        <ArrowLeft size={15} />
        Back to Dashboard
      </Link>

      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
          <Construction size={26} className="text-accent" />
        </div>
        <h1 className="text-xl font-bold text-primary">{title}</h1>
        <p className="mt-2 max-w-md text-sm text-neutral-500">
          {description ??
            "This section's management screen hasn't been built yet."}
        </p>
        <span className="mt-4 rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Coming in Phase {phase}
        </span>
      </div>
    </div>
  );
}
