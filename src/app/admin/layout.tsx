import Link from "next/link";
import LogoutButton from "@/components/admin/logout-button";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Site Branding" },
  { href: "/admin/heroes", label: "Page Heroes" },
  { href: "/admin/home", label: "Home Page" },
  { href: "/admin/about", label: "About Page" },
  { href: "/admin/greeting", label: "Director's Greeting" },
  { href: "/admin/treatments", label: "Treatments" },
  { href: "/admin/clinics", label: "Clinics" },
  { href: "/admin/doctors", label: "Doctors" },
  { href: "/admin/contact", label: "Contact Info" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-7xl gap-8 px-6 py-10">
      <aside className="w-56 shrink-0">
        <p className="mb-6 font-[family-name:var(--font-serif-display)] text-lg text-brand-900">
          Admin
        </p>
        <nav className="space-y-1">
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-brand-700 hover:bg-brand-50 hover:text-brand-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8">
          <LogoutButton />
        </div>
      </aside>
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
