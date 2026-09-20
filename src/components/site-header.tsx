import Link from "next/link";
import { prisma } from "@/lib/prisma";
import MobileNav, { type NavEntry } from "./mobile-nav";

type DropdownItem = { href: string; label: string };

function NavDropdown({ label, items, viewAllHref }: { label: string; items: DropdownItem[]; viewAllHref?: string }) {
  return (
    <div className="group relative">
      <button className="flex items-center gap-1 text-sm font-medium text-brand-700 transition-colors hover:text-brand-900">
        {label}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded-xl border border-brand-100 bg-ivory-50 py-2 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 text-sm text-brand-700 hover:bg-brand-50 hover:text-brand-900"
            >
              {item.label}
            </Link>
          ))}
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="block border-t border-brand-100 px-4 py-2.5 text-sm font-medium text-gold-600 hover:bg-brand-50"
            >
              View All →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function SiteHeader() {
  const [treatments, clinics, settings] = await Promise.all([
    prisma.treatment.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    prisma.clinic.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
  ]);

  const aboutItems: DropdownItem[] = [
    { href: "/about", label: "Hospital Introduction" },
    { href: "/about/greeting", label: "Director's Greeting" },
  ];
  const treatmentItems: DropdownItem[] = treatments.map((t) => ({
    href: `/treatments/${t.slug}`,
    label: t.name,
  }));
  const clinicItems: DropdownItem[] = clinics.map((c) => ({
    href: `/clinics/${c.slug}`,
    label: c.name,
  }));
  const famTourItems: DropdownItem[] = [
    { href: "/fam-tour/flow", label: "Fam Tour Flow" },
    { href: "/fam-tour/cases", label: "Fam Tour & Outreach Cases" },
    { href: "/fam-tour/wellness-tourism", label: "Daejeon Medical Wellness Tourism" },
  ];
  const treatmentPackageItems: DropdownItem[] = [
    { href: "/treatment-packages", label: "Program" },
    { href: "/treatment-packages/cream", label: "Phil Korean Medicine Cream" },
  ];

  const navEntries: NavEntry[] = [
    { type: "dropdown", label: "About", items: aboutItems },
    { type: "dropdown", label: "Treatments", items: treatmentItems, viewAllHref: "/treatments" },
    { type: "dropdown", label: "Clinics", items: clinicItems, viewAllHref: "/clinics" },
    { type: "dropdown", label: "Treatment Packages", items: treatmentPackageItems },
    { type: "dropdown", label: "Fam Tour", items: famTourItems },
    { type: "link", href: "/doctors", label: "Medical Staff" },
    { type: "link", href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-ivory-50/95 backdrop-blur">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          {settings?.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={settings.logoUrl}
              alt="Phil Hospital of Korean Medicine"
              className="h-9 w-auto sm:h-11"
            />
          ) : (
            <span className="font-[family-name:var(--font-serif-display)] text-lg font-medium tracking-wide text-brand-800">
              Phil Korean Medicine Hospital
            </span>
          )}
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navEntries.map((entry) =>
            entry.type === "dropdown" ? (
              <NavDropdown key={entry.label} label={entry.label} items={entry.items} viewAllHref={entry.viewAllHref} />
            ) : (
              <Link
                key={entry.href}
                href={entry.href}
                className="text-sm font-medium text-brand-700 transition-colors hover:text-brand-900"
              >
                {entry.label}
              </Link>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-full bg-brand-700 px-5 py-2 text-sm font-medium text-ivory-50 transition-colors hover:bg-brand-800 sm:inline-block"
          >
            Contact Us
          </Link>
          <MobileNav entries={navEntries} />
        </div>
      </div>
    </header>
  );
}
