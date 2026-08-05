"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, ExternalLink } from "lucide-react";

export default function AdminHeader() {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-5 py-4 sm:px-8">
      <div>
        <h1 className="text-sm font-semibold text-neutral-400">
          Signed in as{" "}
          <span className="font-semibold text-primary">
            {session?.user?.email ?? "…"}
          </span>
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:bg-neutral-50 sm:text-sm"
        >
          View Site
          <ExternalLink size={13} />
        </a>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 px-3 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-neutral-200 sm:text-sm"
        >
          <LogOut size={13} />
          Sign Out
        </button>
      </div>
    </header>
  );
}
