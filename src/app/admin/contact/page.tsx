"use client";

import { useEffect, useState } from "react";

type ContactInfo = {
  address: string;
  phone: string;
  email: string;
  hoursText: string;
  directionsText: string;
  mapEmbedUrl: string;
  inquiryToEmail: string;
};

export default function AdminContactPage() {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/contact")
      .then((r) => r.json())
      .then(setContact);
  }, []);

  async function save() {
    if (!contact) return;
    setSaving(true);
    await fetch("/api/admin/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    });
    setSaving(false);
  }

  if (!contact) return <p className="text-brand-600">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-medium text-brand-900">Contact Info</h1>

      <div className="mt-8 max-w-lg space-y-4 rounded-xl border border-brand-100 bg-ivory-50 p-6">
        <div>
          <label className="block text-sm font-medium text-brand-800">Address</label>
          <input
            type="text"
            value={contact.address}
            onChange={(e) => setContact({ ...contact, address: e.target.value })}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800">Phone</label>
          <input
            type="text"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800">Display Email</label>
          <input
            type="text"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800">Hours</label>
          <textarea
            value={contact.hoursText}
            onChange={(e) => setContact({ ...contact, hoursText: e.target.value })}
            rows={3}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800">Directions (optional)</label>
          <textarea
            value={contact.directionsText}
            onChange={(e) => setContact({ ...contact, directionsText: e.target.value })}
            rows={4}
            placeholder="e.g. subway lines/exits, navigation app search terms"
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800">Map Embed URL (optional)</label>
          <input
            type="text"
            value={contact.mapEmbedUrl}
            onChange={(e) => setContact({ ...contact, mapEmbedUrl: e.target.value })}
            placeholder="Google Maps embed URL"
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800">Inquiry Form Recipient Email</label>
          <input
            type="email"
            value={contact.inquiryToEmail}
            onChange={(e) => setContact({ ...contact, inquiryToEmail: e.target.value })}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-brand-500">
            Note: this field is for reference. The actual delivery address is set via the CONTACT_TO_EMAIL
            environment variable on the server.
          </p>
        </div>

        <button
          onClick={save}
          disabled={saving}
          className="rounded-full bg-brand-700 px-6 py-2 text-sm font-medium text-ivory-50 hover:bg-brand-800 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
