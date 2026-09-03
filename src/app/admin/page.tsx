import Link from "next/link";

const SECTIONS = [
  { href: "/admin/heroes", label: "Page Heroes", desc: "Edit the banner title, subtitle, and images (1–3, rotating) for every page." },
  { href: "/admin/home", label: "Home Page", desc: "Edit the homepage introduction and highlights." },
  { href: "/admin/about", label: "About Page", desc: "Edit the about page story and mission." },
  { href: "/admin/greeting", label: "Director's Greeting", desc: "Edit the medical director's welcome message." },
  { href: "/admin/treatments", label: "Treatments", desc: "Add, edit, or remove treatment detail pages." },
  { href: "/admin/clinics", label: "Clinics", desc: "Add, edit, or remove clinic/center detail pages." },
  { href: "/admin/doctors", label: "Doctors", desc: "Manage your medical team profiles." },
  { href: "/admin/contact", label: "Contact Info", desc: "Edit address, phone, hours, and map." },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-medium text-brand-900">Content Management</h1>
      <p className="mt-2 text-sm text-brand-600">
        Choose a section below to edit text and images shown on the public site.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-xl border border-brand-100 bg-ivory-50 p-5 hover:border-brand-300"
          >
            <h2 className="font-medium text-brand-900">{section.label}</h2>
            <p className="mt-1 text-sm text-brand-600">{section.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
