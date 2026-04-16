"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/data/site";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-8">
      <ul className="space-y-1">
        {siteConfig.nav.map((item) => {
          const active = pathname === item.href;

          return (
            <li key={item.href}>
              <Link href={item.href} className={active ? "sidebar-link sidebar-link-active" : "sidebar-link"}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
