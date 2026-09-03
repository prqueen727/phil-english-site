"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/image-uploader";

export default function AdminSettingsPage() {
  const [logoUrl, setLogoUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((data) => {
        setLogoUrl(data.logoUrl ?? "");
        setLoading(false);
      });
  }, []);

  async function save() {
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ logoUrl }),
    });
    setSaving(false);
  }

  if (loading) return <p className="text-brand-600">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-medium text-brand-900">Site Branding</h1>
      <p className="mt-2 text-sm text-brand-600">
        This logo appears at the top and bottom of every page.
      </p>

      <div className="mt-8 max-w-sm space-y-4 rounded-xl border border-brand-100 bg-ivory-50 p-6">
        <ImageUploader label="Logo" value={logoUrl} onChange={setLogoUrl} />
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
