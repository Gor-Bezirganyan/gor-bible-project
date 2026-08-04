"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Main Hub", href: "/" },
  { label: "New Episodes", href: "/episodes" },
  { label: "Bible Studies", href: "/studies" },
  { label: "AI Companion", href: "/companion" },
  { label: "Devotionals", href: "/devotionals" },
  { label: "About", href: "/about" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href || pathname?.startsWith(href + "/");
  };

  return (
    <div className="min-h-screen bg-transparent">
      <header className="sticky top-0 z-30 border-b border-[#2A2438] bg-[#0B0A0F]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 lg:px-8">
          <Link href="/" className="font-serif text-xl tracking-wide text-[#F5F3F7]">
            The Gor Bible Project
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#A1A1AA]">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 transition duration-200 ${
                    active
                      ? "bg-[#7C3AED] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
                      : "border border-transparent hover:border-[#7C3AED]/40 hover:bg-[#1B1629] hover:text-[#F5F3F7]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8 lg:py-10">{children}</div>

      <footer className="border-t border-[#2A2438] bg-[#0B0A0F]/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-[#A1A1AA] lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Building a better way to study Scripture in community.</p>
          <p>Video • Reflection • AI Companion</p>
        </div>
      </footer>
    </div>
  );
}
