import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SiteFooter() {
  const [contact, settings] = await Promise.all([
    prisma.contactInfo.findUnique({ where: { id: 1 } }),
    prisma.siteSettings.findUnique({ where: { id: 1 } }),
  ]);

  return (
    <footer className="border-t border-brand-100 bg-brand-900 text-ivory-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          {settings?.logoUrl ? (
            <div className="inline-block rounded-lg bg-ivory-50 px-3 py-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={settings.logoUrl}
                alt="Phil Hospital of Korean Medicine"
                className="h-8 w-auto"
              />
            </div>
          ) : (
            <p className="font-[family-name:var(--font-serif-display)] text-lg text-ivory-50">
              Phil Korean Medicine Hospital
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-brand-200">
            Traditional Korean medicine care rooted in centuries of practice,
            delivered with modern clinical standards.
          </p>
        </div>

        <div className="text-sm text-brand-200">
          <p className="mb-3 font-medium text-ivory-50">Visit Us</p>
          <p>{contact?.address || "Address available upon request"}</p>
          {contact?.phone && <p className="mt-2">{contact.phone}</p>}
          {contact?.email && <p>{contact.email}</p>}
          {contact?.hoursText && (
            <p className="mt-2 whitespace-pre-line">{contact.hoursText}</p>
          )}
        </div>

        <div className="text-sm text-brand-200">
          <p className="mb-3 font-medium text-ivory-50">Explore</p>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-ivory-50">About</Link></li>
            <li><Link href="/about/greeting" className="hover:text-ivory-50">Director&apos;s Greeting</Link></li>
            <li><Link href="/treatments" className="hover:text-ivory-50">Treatments</Link></li>
            <li><Link href="/clinics" className="hover:text-ivory-50">Clinics</Link></li>
            <li><Link href="/doctors" className="hover:text-ivory-50">Doctors</Link></li>
            <li><Link href="/contact" className="hover:text-ivory-50">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-800 py-5 text-center text-xs text-brand-300">
        © {new Date().getFullYear()} Phil Korean Medicine Hospital. All rights reserved.
      </div>
    </footer>
  );
}
