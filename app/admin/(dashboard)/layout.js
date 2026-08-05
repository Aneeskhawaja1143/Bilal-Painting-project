import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import AdminProviders from "../providers";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

/**
 * Layout for every authenticated admin page (everything under /admin
 * EXCEPT /admin/login, which lives outside this route group on purpose —
 * see app/admin/login/page.js).
 *
 * `middleware.js` already redirects unauthenticated requests before they
 * ever reach this layout, but we check the session again here server-side.
 * This is deliberate defense-in-depth: middleware runs on the Edge runtime
 * and checks the JWT cookie only, so a second, explicit check at the page
 * layer protects against any future middleware matcher mistake.
 */
export default async function AdminDashboardLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <AdminProviders>
      <div className="flex min-h-screen bg-neutral-50">
        <AdminSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader />
          <main className="flex-1 p-5 sm:p-8">{children}</main>
        </div>
      </div>
    </AdminProviders>
  );
}
