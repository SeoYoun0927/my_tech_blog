import Link from "next/link";

import { GitHubIcon, MailIcon } from "@/components/icons";
import { ProfileAvatar } from "@/components/profile-avatar";
import { SidebarNav } from "@/components/sidebar-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/data/site";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto flex min-h-screen max-w-[1540px] flex-col gap-8 px-4 py-5 sm:px-6 lg:flex-row lg:items-start lg:gap-10 lg:px-8 lg:py-8">
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-[250px] lg:shrink-0 lg:py-4">
          <div className="flex h-full flex-col rounded-[30px] border border-[var(--border)] bg-[var(--card)] px-6 py-6 shadow-[var(--shadow-soft)]">
            <div className="flex items-start justify-between gap-4">
              <ProfileAvatar />
              <ThemeToggle />
            </div>

            <div className="mt-5">
              <h1 className="text-2xl font-semibold tracking-tight">{siteConfig.author.name}</h1>
              <p className="mt-2 text-sm text-[var(--accent-strong)]">{siteConfig.author.role}</p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground)]">{siteConfig.author.intro}</p>
            </div>

            <SidebarNav />

            <div className="mt-8 flex items-center gap-3 text-[var(--muted-foreground)]">
              <a href={siteConfig.links.github} target="_blank" rel="noreferrer" className="icon-link" aria-label="GitHub">
                <GitHubIcon className="h-4 w-4" />
              </a>
              <a href={siteConfig.links.email} className="icon-link" aria-label="Email">
                <MailIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-auto space-y-3 pt-8 text-xs text-[var(--muted-foreground)]">
              <p>{siteConfig.author.location}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {siteConfig.footerLinks.map((item) => (
                  <Link key={item.href} href={item.href} className="hover:text-[var(--accent-strong)]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 lg:py-4">
          <main>{children}</main>
          <footer className="mt-14 border-t border-[var(--border)] px-1 pt-6 text-sm text-[var(--muted-foreground)]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p>{siteConfig.name}</p>
              <p>Next.js · Tailwind CSS · MDX · Vercel</p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
