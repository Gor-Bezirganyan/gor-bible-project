import Link from "next/link";

const navItems = [
  { label: "Start Here", href: "/" },
  { label: "New Episodes", href: "/episodes" },
  { label: "Bible Studies", href: "/studies" },
  { label: "AI Companion", href: "/companion" },
  { label: "Devotionals", href: "/devotionals" },
  { label: "About", href: "/about" },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent">
      <header className="sticky top-0 z-30 border-b border-[#2A2438] bg-[#0B0A0F]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-4 lg:px-8">
          <Link href="/" className="font-serif text-xl tracking-wide text-[#F5F3F7]">
            The Gor Bible Project
          </Link>

          <nav className="flex flex-wrap items-center gap-2 text-sm text-[#A1A1AA]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 transition ${
                  item.label === "Start Here"
                    ? "bg-[#7C3AED] text-white hover:bg-[#A855F7]"
                    : "hover:bg-[#161320] hover:text-[#F5F3F7]"
                }`}
              >
                {item.label}
              </Link>
            ))}
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
