"use client";

import { usePathname } from "next/navigation";

export default function HideOnAdmin({ children }) {
  const pathname = usePathname();

  // Agar URL "/admin" se start ho raha hai, toh Navbar/Footer hide kar do
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Warna normal website par Navbar/Footer dikhao
  return <>{children}</>;
}