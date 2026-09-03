"use client";

import { useEffect, useState } from "react";
import ImageUploader from "@/components/admin/image-uploader";

type GreetingContent = {
  title: string;
  body: string;
  imageUrl: string;
  directorName: string;
  directorTitle: string;
};

export default function AdminGreetingPage() {
  const [greeting, setGreeting] = useState<GreetingContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/greeting")
      .then((r) => r.json())
      .then(setGreeting);
  }, []);

  async function save() {
    if (!greeting) return;
    setSaving(true);
    await fetch("/api/admin/greeting", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(greeting),
    });
    setSaving(false);
  }

  if (!greeting) return <p className="text-brand-600">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-medium text-brand-900">Director&apos;s Greeting</h1>

      <div className="mt-8 max-w-2xl space-y-6 rounded-xl border border-brand-100 bg-ivory-50 p-6">
        <div>
          <label className="block text-sm font-medium text-brand-800">Title</label>
          <input
            type="text"
            value={greeting.title}
            onChange={(e) => setGreeting({ ...greeting, title: e.target.value })}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800">Greeting Message</label>
          <textarea
            value={greeting.body}
            onChange={(e) => setGreeting({ ...greeting, body: e.target.value })}
            rows={8}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <ImageUploader
          label="Director&apos;s Photo"
          value={greeting.imageUrl}
          onChange={(url) => setGreeting({ ...greeting, imageUrl: url })}
        />
        <div>
          <label className="block text-sm font-medium text-brand-800">Director&apos;s Name</label>
          <input
            type="text"
            value={greeting.directorName}
            onChange={(e) => setGreeting({ ...greeting, directorName: e.target.value })}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-800">Director&apos;s Title</label>
          <input
            type="text"
            value={greeting.directorTitle}
            onChange={(e) => setGreeting({ ...greeting, directorTitle: e.target.value })}
            className="mt-1 w-full rounded-lg border border-brand-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none"
          />
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
