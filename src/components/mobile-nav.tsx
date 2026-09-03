"use client";

import Link from "next/link";
import { useState } from "react";

type NavItem = { href: string; label: string };
type NavSection = { label: string; items: NavItem[]; viewAllHref?: string };

export default function MobileNav({ sections, simpleLinks }: { sections: NavSection[]; simpleLinks: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-brand-700"
      >
        <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden>
          {open ? (
            <path
              d="M1 1L21 15M21 1L1 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <>
              <path d="M0 1H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M0 8H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M0 15H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-b border-brand-100 bg-ivory-50 shadow-lg">
          <nav className="mx-auto max-w-6xl px-6 py-4">
            {sections.map((section) => (
              <div key={section.label} className="border-b border-brand-100 py-3 last:border-b-0">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-brand-500">
                  {section.label}
                </p>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block text-sm text-brand-700 hover:text-brand-900"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                  {section.viewAllHref && (
                    <li>
                      <Link
                        href={section.viewAllHref}
                        onClick={() => setOpen(false)}
                        className="block text-sm font-medium text-gold-600"
                      >
                        View All →
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            ))}
            <ul className="space-y-3 py-3">
              {simpleLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block text-sm font-medium text-brand-700 hover:text-brand-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
