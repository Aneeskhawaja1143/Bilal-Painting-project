"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Wraps the admin dashboard in NextAuth's client-side SessionProvider so
 * components like the sidebar/header can use `useSession()` and `signOut()`.
 * Scoped entirely to /admin — the public marketing pages never import this.
 */
export default function AdminProviders({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
